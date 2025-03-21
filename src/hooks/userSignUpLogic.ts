import React, { useCallback, useEffect, useState } from "react";
import _ from 'lodash'
import { apiFetch } from "../components/utils/api";
import {
	UserInputLoginDataProps,
	ValidationInputLoginDataProps,
	UserInputRegistrationDataProps,
	ValidationInputRegistrationDataProps
} from "../types/types";

const userSignUpLogic = () => {
	const [userInputRegistrationData, setInputRegistrationData] = useState<UserInputRegistrationDataProps>({
		userName: '',
		userEmail: '',
		userPassword: '',
	});
	const [validationInputRegistrationData, setValidationInputRegistrationData] = useState<ValidationInputRegistrationDataProps>({
		userNameOk: false,
		userNameError: false,
		userEmailOk: false,
		userEmailError: false,
		userPasswordOk: false,
		userPasswordError: false,
	});

	const [userInputLoginData, setUserInputLoginData] = useState<UserInputLoginDataProps>({
		userLoginName: '',
		userLoginPassword: '',
	});
	const [validationInputLoginData, setValidationInputLoginData] = useState<ValidationInputLoginDataProps>({
		userLoginNameOk: false,
		userLoginNameError: false,
		userLoginPasswordOk: false,
		userLoginPasswordError: false,
	});

	// Get user input registration data.
	const getUserInputRegistrationData = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputRegistrationData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	// Get user input login data.
	const getUserInputLoginData = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserInputLoginData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	// user registration 
	const getUserSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!userInputRegistrationData.userName ||
			!userInputRegistrationData.userEmail ||
			!userInputRegistrationData.userPassword) return;

		if (!validationInputRegistrationData.userNameOk ||
			!validationInputRegistrationData.userEmailOk ||
			!validationInputRegistrationData.userPasswordOk) return;

		try {
			const response = await apiFetch("http://localhost:4173/SignUp", {
				method: 'POST',
				body: JSON.stringify(userInputRegistrationData),
			});
			if (!response.ok) {
				console.log(`❌ Не удалось отправить данные для регистрации, Пользователь уже существует`);
			};
			const data = await response.json();
			if (data.redirect === '/') {
				window.location.href = data.redirect;
			};
		} catch (error) {
			console.error(`❌ Произошла ошибка при отправке данных для регистрации: ${error}`);
		};
	};

	// user avtorization
	const getUserLoginIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!userInputLoginData.userLoginName || !userInputLoginData.userLoginPassword) return;
		if (!validationInputLoginData.userLoginNameOk || !validationInputLoginData.userLoginPasswordOk) return;
		try {
			const responseLogin = await apiFetch("http://localhost:4173/SignIn", {
				method: 'POST',
				credentials: "include",
				body: JSON.stringify(userInputLoginData)
			});
			if (!responseLogin.ok) {
				throw new Error(`Не удалось отправить данные для авторизации, Статус: ${responseLogin.status}`);
			};
			const loginData = await responseLogin.json();
			if (loginData.redirect === '/') {
				window.location.href = loginData.redirect;
			};
		} catch (error) {
			console.error(`Произошла ошибка при отправке данных для авторизации, ${error}`)
		};
	};

	// user sign out
	const userSignOut = async () => {
		try {
			const responseSignOut = await apiFetch("http://localhost:4173/SignOut", { method: 'POST', credentials: "include" });
			if (!responseSignOut) throw new Error(`Ошибка при выходе пользователя, нет ответа с сервера.`)
			const dataSignOut = await responseSignOut.json();

			if (dataSignOut.redirect === '/') {
				console.log(`Вы успешно вышли из аккаунта`);
				window.location.href = dataSignOut.redirect;
			};

		} catch (error) {
			console.error(`Ошибка при выходе пользователя: ${error}`);
		};
	};

	// check user's input data of registration form onBlur
	const handleOnBlurRegistrationForm = () => {
		if (!userInputRegistrationData.userName ||
			!userInputRegistrationData.userEmail ||
			!userInputRegistrationData.userPassword) {
			setValidationInputLoginData((prev) => ({
				...prev,
				userNameOk: false,
				userNameError: false,
				userEmailOk: false,
				userEmailError: false,
				userPasswordOk: false,
				userPasswordError: false,
			}));
		};
	};
	// check user's input data of registration form onFocus
	const handleOnFocusRegistrationForm = () => {
		checkValidationInputRegistrationData();
	};
	// check user's input data of login form onBlur
	const handleOnBlurLoginForm = () => {
		if (!userInputLoginData.userLoginName || !userInputLoginData.userLoginPassword) {
			setValidationInputLoginData((prev) => ({
				...prev,
				userLoginNameOk: false,
				userLoginNameError: false,
				userLoginPasswordOk: false,
				userLoginPasswordError: false,
			}));
		};
	};
	// check user's input data of login form onFocus
	const handleOnFocusLoginForm = () => {
		checkValidationInputLoginData();
	};
	// check validation input data of registration form
	const checkValidationInputRegistrationData = useCallback(() => {
		if (userInputRegistrationData.userName) {
			const checkUserNameInputData = /^[a-zA-Z0-9_\.]{3,10}$/.test(userInputRegistrationData.userName);
			setValidationInputRegistrationData((prev) => ({
				...prev,
				userNameOk: checkUserNameInputData,
				userNameError: !checkUserNameInputData,
			}));
		};

		if (userInputRegistrationData.userEmail) {
			const checkUserEmailInputData = /[a-zA-Z0-9_.%-+]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(userInputRegistrationData.userEmail);
			setValidationInputRegistrationData((prev) => ({
				...prev,
				userEmailOk: checkUserEmailInputData,
				userEmailError: !checkUserEmailInputData,
			}));
		};

		if (userInputRegistrationData.userPassword) {
			const checkUserPasswordInputData = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,20}$/.test(userInputRegistrationData.userPassword);
			setValidationInputRegistrationData((prev) => ({
				...prev,
				userPasswordOk: checkUserPasswordInputData,
				userPasswordError: !checkUserPasswordInputData,
			}));
		};
	}, [userInputRegistrationData]);

	useEffect(() => {
		if (userInputRegistrationData) {
			checkValidationInputRegistrationData();
		} else {
			handleOnBlurRegistrationForm();
		};
	}, [userInputRegistrationData]);

	// check validation input data of login form
	const checkValidationInputLoginData = useCallback(() => {
		if (userInputLoginData.userLoginName) {
			const checkUserNameInputData = /^[a-zA-Z0-9_\.]{3,10}$/.test(userInputLoginData.userLoginName);
			setValidationInputLoginData((prev) => ({
				...prev,
				userLoginNameOk: checkUserNameInputData,
				userLoginNameError: !checkUserNameInputData,
			}));
		};
		if (userInputLoginData.userLoginPassword) {
			const checkUserPasswordInputData = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,20}$/.test(userInputLoginData.userLoginPassword);
			setValidationInputLoginData((prev) => ({
				...prev,
				userLoginPasswordOk: checkUserPasswordInputData,
				userLoginPasswordError: !checkUserPasswordInputData,
			}));
		};
	}, [userInputLoginData]);

	useEffect(() => {
		checkValidationInputLoginData()
	}, [userInputLoginData]);

	return {
		userInputLoginData,
		validationInputLoginData,
		userInputRegistrationData,
		validationInputRegistrationData,
		userSignOut,
		getUserSignUp,
		getUserLoginIn,
		getUserInputLoginData,
		handleOnBlurLoginForm,
		handleOnFocusLoginForm,
		handleOnBlurRegistrationForm,
		getUserInputRegistrationData,
		handleOnFocusRegistrationForm,
	};
};

export default userSignUpLogic;

