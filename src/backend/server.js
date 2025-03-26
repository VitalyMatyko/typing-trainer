import express from 'express';
import mongoose, { Schema } from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;


const corsOptions = {
	origin: process.env.NODE_ENV === 'production'
		? 'https://typing-trainer-client.onrender.com'  // Продакшн-URL
		: 'http://localhost:5050',  // URL для разработки
	credentials: true,
};
app.use(cors(corsOptions));

if (!process.env.MONGO_URI) {
	console.error("❌ Отсутствует URI базы данных ❌");
	process.exit(1);
}

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ ✔️  Подключено к MongoDB ✔️ "))
	.catch(err => console.error("🔴 Ошибка подключения к MongoDB:", err));

const userSchema = new Schema({
	user_id: { type: String, unique: true, default: () => uuidv4() },
	name: { type: String, unique: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	dateRegistration: { type: Date, default: Date.now },
	profile: {
		typingTextLength: { type: Number, required: true },
		dailyGoal: { type: Number, required: true },
		speedGoal: { type: Number, required: true },
		language: { type: String, required: true },
		openedLetters: {
			en: { type: [String], default: [] },
			ru: { type: [String], default: [] }
		},
		date: { type: Date, default: Date.now }
	},
	statistics: {
		typingDailyStatisticsData: { type: Number, required: true },
		speedStatisticsData: { type: [Number], required: true },
		accuracyStatisticsData: { type: [Number], required: true },
		timeTypingStatisticsData: { type: [Number], required: true },
		correctlyPressedLettersStatistic: { type: [[String]], required: true },
		inCorrectlyPressedLettersStatistic: { type: [[String]], required: true }
	},
});

const User = mongoose.model('User', userSchema);

if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
	console.error("❌ Отсутствует секретный ключ для токенов ❌");
	process.exit(1);
}

// Token verification.
const authMiddleware = (req, res, next) => {
	const token = req.cookies.accessToken;

	if (!token) {
		return res.status(401).json({ message: "Токен не найден" });
	};

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
		if (!decoded || !decoded.userId) {
			return res.status(401).json({ message: `Недействительный токен` })
		};
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.error(`Ошибка при проверке токена: ${error.message}`);
		return res.status(401).json({ message: `Недействительный токен` });
	};
};

// Token update route.
app.post('/refresh', async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.status(401).json({ message: `Требуется авторизация` });

	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

		const user = await User.findOne(decoded.userId);
		if (!user) {
			res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
			return res.status(401).json({ message: 'Пользователь не найден' });
		};

		const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, { expiresIn: '1m' });

		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 1 * 60 * 1000,
		})
			.json({ message: `Токен обновлён` });

	} catch (error) {
		console.error(`Недействительный токен: ${error}`);
		res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });

		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Ошибка аутентификации' });
		};
		if (error.name === 'JsonWebTokenError') {
			return res.status(403).json({ message: 'Неверный токен' });
		};
		return res.status(403).json({ message: 'Ошибка аутентификации' });
	};
});

// User registration
app.post('/SignUp', async (req, res) => {
	try {
		const { userName, userEmail, userPassword } = req.body;

		if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
			console.error(`❌ Отсутствует токен ❌`);
			return res.status(500).json({ message: 'Ошибка сервера' })
		};

		const existingUser = await User.findOne({ email: userEmail });

		if (existingUser) {
			console.log(`❌ Не удалось отправить данные. Статус: ${existingUser.status} ❌`);
			return res.status(400).json({ redirect: '/', message: "Пользователь уже существует" });
		};

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(userPassword, salt);

		const newUser = new User({
			name: userName,
			email: userEmail,
			password: hashedPassword,
			profile: {
				typingTextLength: 10,
				dailyGoal: 10,
				speedGoal: 200,
				language: 'en',
				openedLetters: { en: ['f'], ru: ['а'] },
			},
			statistics: {
				typingDailyStatisticsData: 0,
				speedStatisticsData: [],
				accuracyStatisticsData: [],
				timeTypingStatisticsData: [],
				correctlyPressedLettersStatistic: [],
				inCorrectlyPressedLettersStatistic: [],
			},
		});
		await newUser.save();

		const accessToken = jwt.sign({ userId: newUser.user_id }, process.env.ACCESS_SECRET, { expiresIn: '1m' });
		const refreshToken = jwt.sign({ userId: newUser.user_id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

		res
			.cookie('accessToken', accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 1 * 60 * 1000
			})
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})
			.json({ redirect: '/', accessToken });

	} catch (error) {
		console.error(`❌  Ошибка при регистрации:`, error.message + '❌');
		return res.status(500).json({ message: "Ошибка сервера" });
	};
});

// User avtorization
app.post('/SignIn', async (req, res) => {
	const { userLoginName, userLoginPassword } = req.body;

	const user = await User.findOne({ name: userLoginName });
	if (!user) {
		return res.status(400).json({ message: "Неверный логин или пароль" });
	};

	const isPasswordValid = await bcrypt.compare(userLoginPassword, user.password);
	if (!isPasswordValid) {
		return res.status(400).json({ redirect: '/', message: "Неверный логин или пароль" });
	};

	const accessToken = jwt.sign({ userId: user.user_id }, process.env.ACCESS_SECRET, { expiresIn: "1m" });
	const refreshToken = jwt.sign({ userId: user.user_id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

	res
		.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 1 * 60 * 1000,
		})
		.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		.json({ redirect: '/', accessToken, message: 'Пользователь успешно вошёл' });
});

// User sign out.
app.post('/SignOut', (req, res) => {
	try {
		res
			.clearCookie('accessToken', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
			})
			.clearCookie("refreshToken", {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict'
			});
		return res.status(200).json({ redirect: '/', message: `✔️ Вы успешно вышли из аккаунта ✔️` });
	} catch (error) {
		console.error(`❌ Ошибка при выходе: ${error.message} ❌`);
		res.status(500).json({ message: ' Ошибка сервера при выходе пользователя ' });
	};
});

// We get the user from the database.
app.get('/getUser', authMiddleware, async (req, res) => {
	try {
		const user = await User.findOne({ user_id: req.userId }).select('-password');
		if (!user) return res.status(401).json({ message: `Пользователь не найден` });
		res.json(user);
	} catch (error) {
		console.error(`❌  Ошибка при получении пользователя: ${error} ❌`);
		return res.status(404).json({ message: `Пользователь не найден` });
	};
});

//  We get the  all users from the database.
app.get('/getAllUsers', authMiddleware, async (req, res) => {
	try {
		const users = await User.find().select('-password');
		if (!users) return res.status(401).json({ message: `Пользователь не найден` });
		res.json(users);
	} catch (error) {
		console.error(`❌  Ошибка при получении пользователя: ${error} ❌`);
		return res.status(404).json({ message: `Пользователь не найден` });
	};
});

// Route to update user data 
app.post('/updateUserData', authMiddleware, async (req, res) => {
	const { _id, newHistoryData, newStatisticsData } = req.body;
	try {
		if (!_id || !newHistoryData || !newStatisticsData) {
			return res.status(400).json({ message: '⚠️ Недостаточно данных для обновления ⚠️' });
		};
		if (typeof _id !== 'string' || !_id.trim() || typeof newHistoryData !== 'object' || typeof newStatisticsData !== 'object') {
			return res.status(400).json({ message: 'Некорректные входные данные' });
		};

		const updatedUserHistoryData = await User.findOneAndUpdate(
			{ _id },
			{ $set: { profile: newHistoryData, statistics: newStatisticsData } },
			{ new: true });

		if (!updatedUserHistoryData) return res.status(404).json({ message: `Пользователь не найден` });
		res.status(200).json(updatedUserHistoryData);

	} catch (error) {
		console.error(`Ошибка при обновлении данных пользователя: ${error.message}`);
		res.status(500).json({ message: `Внутренняя ошибка сервера` });
	};
});

app.get('/', (req, res) => {
	try {
		const isServerAvailable = req.url;

		if (!isServerAvailable) {
			res.status(400).json({ message: 'Сервер недоступен, ошибка подключения' })
		};

		res.status(200).json({ message: 'Сервер запущен', host: req.hostname, url: req.url })
	} catch (error) {
		res.status(500).json({ message: `Сервер недоступен`, ошибка: error.message });
	};
});

// 🚀
app.listen(PORT, () => {
	console.log(`✅ ✔️  Сервер запущен на http://localhost:${PORT} ✔️`)
});






