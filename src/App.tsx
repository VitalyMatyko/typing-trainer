
import "./styles/App.scss";
import HomePage from "./components/mainPagecomponent/HomePage";
import SettingsPage from "./components/settingsComponent/SettingsPage";
import useTypingLogic from "./hooks/useTypingLogic";
import settingLodgic from "./hooks/settingLodgic";
import ProfilePage from "./components/profileComponent/ProfilePage";
import SpeedTestPage from "./components/speedTestComponent/SpeedTestPage";
import UserSingUpPage from "./components/userSingUpComponent/UserSingUpPage";
import { Alphabets } from "./components/alphabets/Alphabet";



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
		getDailyGoalTimeValue,
		getAccuracyValue } = useTypingLogic();

	const {
		showSettingMenu,
		choicedLanguage,
		choicedDailyGoalValue,
		choiceTypingTextLengthValue,
		choicedTargetTypingSpeedValue,
		setChoiceLanguage,
		setShowSettingMenu,
		getClickedComponent,
		handleLanguageChoice,
		handleDailyGoalChoice,
		setChoicedDailyGoalValue,
		handleTypingLengthChoice,
		handleTargetTypingSpeedChoice,
		setChoiceTypingTextLengthValue,
		setChoicedTargetTypingSpeedValue } = settingLodgic();

	// Updates interface settings, target data, and current text information.
	const saveSettings = () => {
		setInterfaceData((prev) => ({
			...prev,
			language: choicedLanguage as 'en' | 'ru',
		}));
		setShowSettingMenu('0');
		setGoalData((prev) => ({
			...prev,
			dailyGoal: +choicedDailyGoalValue,
		}));
		setGoalData((prev) => ({
			...prev,
			speedGoal: +choicedTargetTypingSpeedValue,
		}));
		setKeyData((prev) => ({
			...prev,
			typingTextLength: +choiceTypingTextLengthValue,
			typingText: false,
		}))
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
			interfaceData={interfaceData}
			choiceLanguage={choicedLanguage}
			choicedDailyGoalValue={choicedDailyGoalValue}
			choiceTypingTextLengthValue={choiceTypingTextLengthValue}
			choicedTargetTypingSpeedValue={choicedTargetTypingSpeedValue}
			closeWindow={closeWindow}
			saveSettings={saveSettings}
			handleLanguageChoice={handleLanguageChoice}
			handleDailyGoalChange={handleDailyGoalChoice}
			setChoicedDailyGoalValue={setChoicedDailyGoalValue}
			handleTypingLengthChoice={handleTypingLengthChoice}
			handleTargetTypingSpeedChange={handleTargetTypingSpeedChoice}
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




