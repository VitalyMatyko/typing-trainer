import "./styles/App.scss";
import HomePage from "./components/mainPagecomponent/HomePage";
import SettingsPage from "./components/settingsComponent/SettingsPage";
import useTypingLogic from "./hooks/useTypingLogic";
import settingLodgic from "./hooks/settingLodgic";
import ProfilePage from "./components/profileComponent/ProfilePage";
import SpeedTestPage from "./components/speedTestComponent/SpeedTestPage";
import UserSingUpPage from "./components/userSingUpComponent/UserSingUpPage";
import { Alphabets } from "./components/alphabets/Alphabet";
import { AddedDeleteCharacters } from "./types/types";


// This App creates a basic React application that manages several pages (or components) such as the home page,
//  profile page, speed test page, settings, and user registration.
function App() {
	const {
		keyData,
		goalData,
		interfaceData,
		setKeyData,
		setGoalData,
		getSpeedValue,
		showTypingText,
		setInterfaceData,
		getAccuracyValue,
		getDailyGoalTimeValue } = useTypingLogic();

	const {
		checkboxData,
		addedCharacters,
		deleteCharacters,
		showSettingMenu,
		choicedLanguage,
		choicedDailyGoalValue,
		choiceTypingTextLengthValue,
		choicedTargetTypingSpeedValue,
		getCheckboxValue,
		setChoiceLanguage,
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
		setChoicedTargetTypingSpeedValue } = settingLodgic();

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
		}))
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
		if (data[language].includes(letter) && !addedCharacters[language].includes(letter)) return '_show';
		if (addedCharacters[language].includes(letter) && !data[language].includes(letter)) return '_show_border';
		if (deleteCharacters[language].includes(letter) && data[language].includes(letter)) return '_delete_border'
		if (checkbox) return '_unshow_hover';
		return '_unshow';
	}

	// The closeWindow function performs several actions to reset or refresh states,
	//  in which it closes the preferences window and restores the current values ​​that were previously set.
	const closeWindow = () => {
		setShowSettingMenu('0');
		setChoiceLanguage(interfaceData.language);
		setChoicedDailyGoalValue(goalData.dailyGoal);
		setChoicedTargetTypingSpeedValue(goalData.speedGoal);
		setChoiceTypingTextLengthValue(keyData.typingTextLength);
	}
	let pageToRender;
	switch (showSettingMenu) {
		case '0': pageToRender = (<HomePage
			keyData={keyData}
			goalData={goalData}
			interfaceData={interfaceData}
			getSpeedValue={getSpeedValue}
			showTypingText={showTypingText}
			getAccuracyValue={getAccuracyValue}
			getClickedComponent={getClickedComponent}
			getDailyGoalTimeValue={getDailyGoalTimeValue}
		/>); break;
		case '1': pageToRender = <ProfilePage closeWindow={closeWindow} />; break;
		case '2': pageToRender = <SpeedTestPage closeWindow={closeWindow} />; break;
		case '3': pageToRender = <SettingsPage
			Alphabets={Alphabets}
			checkboxData={checkboxData}
			interfaceData={interfaceData}
			choiceLanguage={choicedLanguage}
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
			addLetterNumberMarksCharacters={addLetterNumberMarksCharacters}
		/>; break;
		case '4': pageToRender = <UserSingUpPage closeWindow={closeWindow} />; break;
		default: pageToRender = null;
	}
	return (
		<div className="App">
			{pageToRender}
		</div>
	)
}
export default App;




