
import { InterfaceDataProps, OpenLettersType, UserHistory } from '../types/types';
import { layouts } from '../components/mainPagecomponent/layouts/Layouts';
import React, { useState, useEffect, useCallback } from 'react';
import OpenLetters from '../components/mainPagecomponent/keyboards/openLetters/OpenLetters';
import { apiFetch } from '../components/utils/api';
import { NavigateFunction } from "react-router-dom";



const useTypingLogic = (navigate: NavigateFunction) => {
	const [keyData, setKeyData] = useState({
		pressedKey: '',                  // This variable stores information about which key was currently pressed.
		currentIndex: 0,                 // This is the index of the current letter or symbol in the text that the user must type.      
		spaceLocation: '',               // This variable stores information about the location of the space in the text.
		activeKeyIndex: -1,              // This variable stores the index of the active key on the screen or keyboard.
		startTyping: false,              // This variable stores a value that indicates whether the user has started typing.
		typingText: false,               // This variable indicates whether you are in the process of typing.
		typingTextLength: 10,            // This variable stores the length of the text to be printed.
		letterStyleChange: 'gray',       // This variable stores the style for the current letter.
		correctlyPressedLetters: [] as string[],                           // This is an array of strings that stores the correct letters to press.
		inCorrectlyPressedLetters: [] as string[],                         // This is an array of strings that stores the letters that are pressed incorrectly.
		shiftLocation: { left: false, right: false },                      // This is an object that stores information about which Shift key (left or right) is currently active.
		newText: Array.from('').map(letter => ({ letter, style: '' })),    // This is an array of objects, where each object represents a letter of text with its style.
		textLength: 0,                  //  This variable stores the total length of the text to be printed.
		isTextFinished: false,          // This variable stores a value that indicates whether typing is complete.
		correctlyPressedLettersStatisticArray: [] as string[][],
		inCorrectlyPressedLettersStatisticArray: [] as string[][],
	});

	const [goalData, setGoalData] = useState({
		accuracy: 0,                   // Typing accuracy (in percent)
		speedGoal: 200,                // Target Typing Speed ​​(WPM)
		dailyGoal: 10,                 // Daily word goal
		typingDaily: 0,
		timeTyping: 0,                 // Typing time
		typingSpeed: 0,                // Current typing speed (words per minute)
		typedWordsToday: 0,            // Number of words typed today
		startTime: 0,                  // start typing time
		endTime: 0,                    // start typing time
		accuracyStatisticsArray: [] as number[],
		speedStatisticsArray: [] as number[],
		timeTypingDailyStatisticsArray: [] as number[],
	});

	const [interfaceData, setInterfaceData] = useState<InterfaceDataProps>({
		language: 'en',                     // This variable stores the currently selected interface language.
		showLanguagesChoiceMenu: false,     // This variable stores a value that determines whether the language selection menu is displayed.
		selectedAlphabet: [] as string[],   // This variable is an array that stores the selected letters for the alphabet.
		openedLetters: { en: [OpenLetters.en.letters[0]], ru: [OpenLetters.ru.letters[0]] },   // This variable is an object that stores the open letters for each language.
		letterIndex: 0,                     // This variable stores the index of the current letter.
	});

	const [userHistory, setUserHistory] = useState<UserHistory | null>(null);
	const [loading, setLoading] = useState(false);
	const [showLoginMenu, setShowLoginMenu] = useState(false);

	const API_URL = import.meta.env.MODE === 'production'
		? import.meta.env.VITE_BACKEND_URL
		: import.meta.env.VITE_API_URL;

	// Function for receiving data from the server.
	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				const response = await apiFetch(`${API_URL}/getUser`, {}, navigate);

				if (!response.ok) {
					const text = await response.text();
					throw new Error(`Ошибка: ${response.status} - ${response.statusText} | Ответ: ${text}`);
				};

				const data = await response.json();
				setUserHistory((prev) => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));

				if (data && data.profile && data.statistics) {
					setInterfaceData((prev) => ({
						...prev,
						language: data.profile.language ?? prev.language,
						openedLetters: data.profile.openedLetters,
					}));
					setKeyData((prev) => ({
						...prev,
						typingTextLength: data.profile.typingTextLength ?? prev.typingTextLength,
						correctlyPressedLettersStatisticArray: data.statistics.correctlyPressedLettersStatistic ?? prev.correctlyPressedLettersStatisticArray,
						inCorrectlyPressedLettersStatisticArray: data.statistics.inCorrectlyPressedLettersStatistic ?? prev.inCorrectlyPressedLettersStatisticArray,
					}));
					setGoalData((prev) => ({
						...prev,
						dailyGoal: data.profile.dailyGoal ?? prev.dailyGoal,
						speedGoal: data.profile.speedGoal ?? prev.speedGoal,
						speedStatisticsArray: data.statistics.speedStatisticsData ?? prev.speedStatisticsArray,
						typingDaily: data.statistics.typingDailyStatisticsData ?? prev.typingDaily,
						timeTypingDailyStatisticsArray: data.statistics.timeTypingStatisticsData ?? prev.timeTypingDailyStatisticsArray,
						accuracyStatisticsArray: data.statistics.accuracyStatisticsData ?? prev.accuracyStatisticsArray,
					}));
				};
			} catch (error) {
				console.error(`Ошибка запроса: ${error}`);
			} finally {
				setLoading(false);
			};
		};
		fetchUserData();
	}, []);

	// Function to send updated data to the server
	useEffect(() => {
		if (userHistory) {
			const updateUserData = async () => {
				const newHistoryData = {
					typingTextLength: keyData.typingTextLength,
					dailyGoal: goalData.dailyGoal,
					speedGoal: goalData.speedGoal,
					language: interfaceData.language,
					openedLetters: interfaceData.openedLetters,
				};
				const newStatisticsData = {
					speedStatisticsData: goalData.speedStatisticsArray,
					typingDailyStatisticsData: goalData.typingDaily,
					timeTypingStatisticsData: goalData.timeTypingDailyStatisticsArray,
					accuracyStatisticsData: goalData.accuracyStatisticsArray,
					correctlyPressedLettersStatistic: keyData.correctlyPressedLettersStatisticArray,
					inCorrectlyPressedLettersStatistic: keyData.inCorrectlyPressedLettersStatisticArray
				};

				try {
					const response = await apiFetch(`${API_URL}/updateUserData`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ _id: userHistory?._id, newHistoryData, newStatisticsData }),
					}, navigate);

					if (!response.ok) throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
					const updatedUser = await response.json();

					if (!updatedUser || !updatedUser.profile) {
						throw new Error('Неверный формат данных от сервера');
					};
					setUserHistory(updatedUser);
				} catch (error) {
					console.error("Ошибка при отправке данных на сервер:", error);
				};
			};
			updateUserData();
		};
	}, [
		keyData,
		goalData,
		interfaceData]);

	// The calculateStats ​​function calculates typing speed ,the printing accuracy, the typing time.
	const calculateStats = () => {
		if (!goalData.startTime || !goalData.endTime || keyData.newText.length === 0) return { speed: 0, accuracy: 0, time: 0 };
		const elapsedTime = (goalData.endTime - goalData.startTime) / 60000;

		if (elapsedTime <= 0) return { speed: 0, accuracy: 0, time: 0 };
		const correctLetters = keyData.correctlyPressedLetters.length;
		const accuracy = Math.min(100, Math.round((correctLetters / keyData.newText.length) * 100));
		const speed = correctLetters > 0 ? Math.round(correctLetters / elapsedTime) : 0;
		const time = parseFloat(elapsedTime.toFixed(3));
		return { speed, accuracy, time };
	};

	// This is a function for calculating the values ​​of daily goal, accuracy, speed.
	const getGoalValue = (value: number, goal: number) => {
		if (!value) return { width: '0%', height: '100%' };
		const percentValue = Math.round((value / goal) * 100);
		return {
			width: `${Math.min(100, percentValue)}%`,
			height: '100%'
		};
	};

	// The getDailyGoalTimeValue function is used to calculate and return the value that will be used to display the progress towards the daily goal.
	const getDailyGoalTimeValue = () => getGoalValue(goalData.typingDaily, goalData.dailyGoal);

	// The getAccuracyValue function is used to calculate styles (width and height) depending on the accuracy value.
	const getAccuracyValue = () => getGoalValue(goalData.accuracy, 100);

	// The getSpeedValue function is used to calculate and display the progress in typing speed (word typing speed).
	const getSpeedValue = () => getGoalValue(goalData.typingSpeed, goalData.speedGoal);

	// The addPairLetters function adds a pair of characters (letters, punctuation marks, or numbers) to the current set of open characters, depending on the current typing speed and other parameters.
	const addPairLetters = (speed: number, language: 'en' | 'ru', letterIndex: number, key: "letters" | 'bigLetters' | "numbers" | "marks") => {
		if (speed >= goalData.speedGoal) {
			setInterfaceData((prev) => {
				const charArray = OpenLetters[language][key];
				if (!charArray) return prev;

				const openedSet = new Set(prev.openedLetters[language]);
				let currentIndex = 0;

				while (currentIndex < charArray.length) {
					if (!openedSet.has(charArray[currentIndex])) {
						const nextPairLetters = charArray[currentIndex];
						return {
							...prev,
							letterIndex: currentIndex + 1,
							openedLetters: {
								...prev.openedLetters,
								[language]: [...prev.openedLetters[language], nextPairLetters]
							},
						};
					};
					currentIndex++;
				};
				return prev;
			});
		};
	};

	// This code uses the useEffect hook to call the addPairLetters function every time the typing speed, which is stored in goalData.typingSpeed, changes.
	useEffect(() => {
		if (goalData.typingSpeed >= goalData.speedGoal) {
			let lang = interfaceData.language;
			let keys = Object.keys(OpenLetters[lang]) as (keyof OpenLettersType)[];
			let currentKeyIndex = keys.findIndex((key) => {
				let openedLettersSet = new Set(interfaceData.openedLetters[lang]);
				return OpenLetters[lang][key].some((char) => !openedLettersSet.has(char));
			});

			if (currentKeyIndex === -1) return;

			let key = keys[currentKeyIndex];
			let nextLetter = OpenLetters[lang][key].find(
				(char) => !interfaceData.openedLetters[lang].includes(char));
			if (nextLetter) {
				addPairLetters(goalData.typingSpeed, lang, interfaceData.letterIndex, key);
			};
		};
	}, [goalData.typingSpeed]);

	// This useEffect watches for changes in two values ​​from the state: keyData.pressedKey and keyData.startTyping.
	useEffect(() => {
		if (keyData.pressedKey && !keyData.startTyping) {
			setKeyData((prev) => ({
				...prev,
				startTyping: true,
			}));
		};
	}, [keyData.pressedKey, keyData.startTyping]);

	// This useEffect monitors the state of two values: keyData.startTyping and goalData.startTime, so that when typing starts, it sets the startTime in goalData.
	useEffect(() => {
		if (keyData.startTyping && !goalData.startTime) {
			setGoalData((prev) => ({
				...prev,
				startTime: Date.now()
			}));
		};
	}, [keyData.startTyping, goalData.startTime]);

	// This useEffect controls the updating of the typing speed, precision, and time data, and resets them if the text is complete or if the text state changes.
	useEffect(() => {
		if (keyData.isTextFinished) {
			const { speed, accuracy, time } = calculateStats();
			setGoalData((prev) => ({
				...prev,
				typingSpeed: speed,
				accuracy: accuracy,
				timeTyping: prev.timeTyping + time,
				typingDaily: prev.typingDaily + time,
				speedStatisticsArray: [...prev.speedStatisticsArray, speed],
				accuracyStatisticsArray: [...prev.accuracyStatisticsArray, accuracy],
				timeTypingDailyStatisticsArray: [...prev.timeTypingDailyStatisticsArray, time],
			}));
			setKeyData((prev) => ({
				...prev,
				correctlyPressedLettersStatisticArray: [
					...prev.correctlyPressedLettersStatisticArray, [...prev.correctlyPressedLetters]],
				inCorrectlyPressedLettersStatisticArray: [
					...prev.inCorrectlyPressedLettersStatisticArray, [...prev.inCorrectlyPressedLetters]],
			}));
		} else {
			setGoalData((prev) => ({
				...prev,
				startTime: 0,
				endTime: 0,
				typingSpeed: 0,
				timeTyping: 0,
			}));
			setKeyData((prev) => ({
				...prev,
				pressedKey: '',
				activeKeyIndex: -1,
			}));
		};
	}, [keyData.isTextFinished]);

	// Function getGenerateTypingText generates random text for a set of words that will be used to train typing speed and accuracy.
	const getGenerateTypingText = useCallback(() => {
		const letters = interfaceData.language === "en"
			? interfaceData.openedLetters.en
			: interfaceData.openedLetters.ru;

		if (!letters || letters.length === 0) return;

		let words = [];
		let text = '';
		let wordLength = 0;
		while (words.length < (keyData.typingTextLength)) {
			let word = ''
			for (let i = 0; i <= wordLength; i++) {
				word += letters[Math.floor(Math.random() * letters.length)];
			};
			words.push(word);
			text = words.join(' ');
			if (wordLength < 4) wordLength++;
		};
		setKeyData((prev) => ({
			...prev,
			newText: text.split('').map(letter => ({ letter, style: prev.letterStyleChange }))
		}));
	}, [interfaceData.language, keyData.typingTextLength, interfaceData.openedLetters]);

	// The startTypingText function changes the state of userData, after calling it, the text typing process begins in the application.
	const showTypingText = () => {
		setKeyData((prev) => ({
			...prev,
			typingText: true,
			pressedKey: '',
			activeKeyIndex: -1,
			correctlyPressedLetters: [],
			inCorrectlyPressedLetters: [],
			newText: Array.from('').map(letter => ({ letter, style: '' })),
		}));
		setGoalData((prev) => ({
			...prev,
			typingSpeed: 0,
			accuracy: 0,
		}));
		getGenerateTypingText();
	};

	const getShowLoginMenu = () => {
		setShowLoginMenu(true);
	};

	// This key handler (handleKeyDown) works with keydown events.
	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (!keyData.typingText) return;
		const keys = event.key;
		if (!['en', 'ru'].includes(interfaceData.language)) return;
		const language = interfaceData.language as keyof typeof layouts;
		if (keys === ' ' || keys === 'Enter') {
			setKeyData((prev) => ({
				...prev,
				pressedKey: keys,
			}));
		};
		if (keys === 'Shift') {
			setKeyData((prev) => ({
				...prev,
				pressedKey: event.location === 1 ? 'leftShift' : 'rightShift',
				shiftLocation: {
					left: event.location === 1,
					right: event.location === 2,
				}
			}));
		};
		const index = layouts[language].indexOf(keys);
		if (index !== -1) {
			setKeyData((prev) => {
				const currentLetter = prev.newText[prev.currentIndex];
				if (!currentLetter) return prev;
				const isCorrect = keys === prev.newText[prev.currentIndex].letter;
				let updatedText = [...prev.newText];
				let goodLetter = '';
				let errorLetter = '';
				if (updatedText[prev.currentIndex].style !== 'red') {
					updatedText[prev.currentIndex] = {
						letter: prev.newText[prev.currentIndex].letter,
						style: isCorrect ? 'green' : 'red',
					};
					if (isCorrect) {
						goodLetter = prev.newText[prev.currentIndex].letter;
					} else {
						errorLetter = prev.newText[prev.currentIndex].letter
					};
				};
				const isEndOfText = prev.currentIndex === prev.newText.length - 1;
				if (isEndOfText) {
					setGoalData((prev) => ({
						...prev,
						endTime: Date.now(),
					}));
					setKeyData((prev) => ({
						...prev,
						isTextFinished: true,
						letterStyleChange: 'gray',
						currentIndex: 0,
						typingText: false
					}));
				};
				return {
					...prev,
					isTextFinished: false,
					pressedKey: keys,
					activeKeyIndex: index,
					newText: updatedText,
					letterStyleChange: isCorrect ? 'green' : 'red',
					currentIndex: isCorrect ? prev.currentIndex + 1 : prev.currentIndex,
					correctlyPressedLetters: goodLetter ? [...prev.correctlyPressedLetters, goodLetter] : prev.correctlyPressedLetters,
					inCorrectlyPressedLetters: errorLetter ? [...prev.inCorrectlyPressedLetters, errorLetter] : prev.inCorrectlyPressedLetters,
				};
			});
		};
	}, [interfaceData.language, layouts, keyData.typingText]);

	// This is a keyup event handler, it updates the keyData state according to keypress and keyrelease events. 
	const handleKeyUp = useCallback((event: KeyboardEvent) => {
		setKeyData((prev) => ({
			...prev,
			pressedKey: '',
			activeKeyIndex: -1,
		}));
		const key = event.key;
		if (key === 'Shift') {
			setKeyData((prev) => ({
				...prev,
				shiftLocation: { left: false, right: false, }
			}));
		};
	}, []);

	// This useEffect adds event handlers for key presses and releases on the window, and removes them when the component is unmounted or dependencies change.
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return {
		keyData,
		goalData,
		loading,
		userHistory,
		interfaceData,
		showLoginMenu,
		setKeyData,
		setGoalData,
		getSpeedValue,
		showTypingText,
		setInterfaceData,
		getAccuracyValue,
		getDailyGoalTimeValue,
		getShowLoginMenu,
	};
};

export default useTypingLogic;