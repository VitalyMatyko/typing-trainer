import "./styles/App.scss";
import React from "react";
import settingLogic from "./hooks/settingLogic";
import useTypingLogic from "./hooks/useTypingLogic";
import userSignUpLogic from "./hooks/userSignUpLogic";
import { AddedDeleteCharacters } from "./types/types";
import { Alphabets } from "./components/alphabets/Alphabet";
import HomePage from "./components/mainPagecomponent/HomePage";
import SettingsPage from "./components/settingsComponent/SettingsPage";
import SpeedTestPage from "./components/speedTestComponent/SpeedTestPage";
import StatisticsPage from "./components/statisticsComponent/StatisticsPage";
import UserSingUpPage from "./components/userSingUpComponent/UserSingUpPage";
import { Routes, Route, useNavigate } from 'react-router-dom';

// This App creates a basic React application that manages several pages (or components) such as the home page,
//  profile page, speed test page, settings, and user registration.
function App() {

	const navigate = useNavigate();

	const {
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
		getShowLoginMenu,
		getDailyGoalTimeValue } = useTypingLogic(navigate);

	const {
		isLoading,
		checkboxData,
		addedCharacters,
		deleteCharacters,
		choicedLanguage,
		choicedDailyGoalValue,
		choiceTypingTextLengthValue,
		choicedTargetTypingSpeedValue,
		getCheckboxValue,
		setChoicedLanguage,
		setAddedCharacters,
		setDeleteCharacters,
		setShowSettingMenu,
		getClickedComponent,
		handleLanguageChoice,
		handleDailyGoalChoice,
		setChoicedDailyGoalValue,
		handleTypingLengthChoice,
		handleTargetTypingSpeedChoice,
		setChoiceTypingTextLengthValue,
		addLetterNumberMarksCharacters,
		setChoicedTargetTypingSpeedValue
	} = settingLogic();

	const {
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
		getUserInputRegistrationData,
		handleOnBlurRegistrationForm,
		handleOnFocusRegistrationForm } = userSignUpLogic();

	// Updates interface settings, target data, and current text information.
	const saveSettings = () => {
		setInterfaceData((prev) => {
			let updatedOpenedLetters = { en: [...prev.openedLetters.en], ru: [...prev.openedLetters.ru] };
			if (addedCharacters) {
				updatedOpenedLetters.en = [...updatedOpenedLetters.en, ...addedCharacters.en]
				updatedOpenedLetters.ru = [...updatedOpenedLetters.ru, ...addedCharacters.ru]
			}
			if (deleteCharacters) {
				const deleteEn = updatedOpenedLetters.en.filter((char) => !deleteCharacters.en.includes(char));
				const deleteRu = updatedOpenedLetters.ru.filter((char) => !deleteCharacters.ru.includes(char));
				updatedOpenedLetters.en = deleteEn;
				updatedOpenedLetters.ru = deleteRu;
			}
			return {
				...prev,
				language: choicedLanguage as 'en' | 'ru',
				openedLetters: updatedOpenedLetters,
			}
		});
		setShowSettingMenu('0');
		setAddedCharacters({ en: [], ru: [] });
		setDeleteCharacters({ en: [], ru: [] });
		setGoalData((prev) => ({
			...prev,
			dailyGoal: +choicedDailyGoalValue,
			speedGoal: +choicedTargetTypingSpeedValue,
		}));
		setKeyData((prev) => ({
			...prev,
			typingTextLength: +choiceTypingTextLengthValue,
			typingText: false,
		}));
		window.location.href = '/';
	};

	// The getShowClassName function takes 3 arguments and returns a specific CSS class based on the conditions.
	const getShowClassName = (
		data: { en: string[], ru: string[] },
		letter: string,
		language: 'en' | 'ru',
		checkbox: boolean,
		addedCharacters: AddedDeleteCharacters,
		deleteCharacters: AddedDeleteCharacters,
	) => {
		if (!data?.[language] || !addedCharacters?.[language] || !deleteCharacters?.[language]) return '_unshow';
		if (data[language].includes(letter) && !addedCharacters[language].includes(letter)) return '_show';
		if (addedCharacters[language].includes(letter) && !data[language].includes(letter)) return '_show_border';
		if (deleteCharacters[language].includes(letter) && data[language].includes(letter)) return '_delete_border'
		if (checkbox) return '_unshow_hover';
		return '_unshow';
	};

	// The closeWindow function performs several actions to reset or refresh states,
	//  in which it closes the preferences window and restores the current values ​​that were previously set.

	const closeWindow = () => {
		setShowSettingMenu('0');
		setChoicedLanguage(interfaceData.language);
		setChoicedDailyGoalValue(goalData.dailyGoal);
		setChoicedTargetTypingSpeedValue(goalData.speedGoal);
		setChoiceTypingTextLengthValue(keyData.typingTextLength);
		window.location.href = '/';
	}

	return (
		<div className='App'>
			{(loading) ? (<div>Loading......</div>) : (
				<Routes>
					<Route path="/" element={
						<HomePage
							keyData={keyData}
							goalData={goalData}
							userHistory={userHistory}
							interfaceData={interfaceData}
							showLoginMenu={showLoginMenu}
							validationInputLoginData={validationInputLoginData}
							userInputLoginData={userInputLoginData}
							closeWindow={closeWindow}
							getUserLoginIn={getUserLoginIn}
							getUserInputLoginData={getUserInputLoginData}
							getShowLoginMenu={getShowLoginMenu}
							userSignOut={userSignOut}
							getSpeedValue={getSpeedValue}
							showTypingText={showTypingText}
							getAccuracyValue={getAccuracyValue}
							getClickedComponent={getClickedComponent}
							handleOnBlurLoginForm={handleOnBlurLoginForm}
							handleOnFocusLoginForm={handleOnFocusLoginForm}
							getDailyGoalTimeValue={getDailyGoalTimeValue} />} />

					<Route path="/Statistics" element={<StatisticsPage closeWindow={closeWindow} />} />
					<Route path="/SpeedTest" element={<SpeedTestPage closeWindow={closeWindow} />} />

					<Route path="/Settings" element={
						<SettingsPage
							isLoading={isLoading}
							Alphabets={Alphabets}
							checkboxData={checkboxData}
							interfaceData={interfaceData}
							choicedLanguage={choicedLanguage}
							addedCharacters={addedCharacters}
							deleteCharacters={deleteCharacters}
							choicedDailyGoalValue={choicedDailyGoalValue}
							choiceTypingTextLengthValue={choiceTypingTextLengthValue}
							choicedTargetTypingSpeedValue={choicedTargetTypingSpeedValue}
							closeWindow={closeWindow}
							saveSettings={saveSettings}
							getShowClassName={getShowClassName}
							getCheckboxValue={getCheckboxValue}
							handleLanguageChoice={handleLanguageChoice}
							handleDailyGoalChange={handleDailyGoalChoice}
							setChoicedDailyGoalValue={setChoicedDailyGoalValue}
							handleTypingLengthChoice={handleTypingLengthChoice}
							handleTargetTypingSpeedChange={handleTargetTypingSpeedChoice}
							addLetterNumberMarksCharacters={addLetterNumberMarksCharacters} />} />

					<Route path="/SignUp" element={
						<UserSingUpPage
							userInputRegistrationData={userInputRegistrationData}
							validationInputRegistrationData={validationInputRegistrationData}
							closeWindow={closeWindow}
							getUserSignUp={getUserSignUp}
							handleOnBlurRegistrationForm={handleOnBlurRegistrationForm}
							getUserInputRegistrationData={getUserInputRegistrationData}
							handleOnFocusRegistrationForm={handleOnFocusRegistrationForm} />} />
					<Route path="*" element={<h1>Страница не найдена</h1>} />
				</Routes>
			)}
		</div>
	);
};
export default App;




