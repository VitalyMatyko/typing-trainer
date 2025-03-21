import React from "react";
import TopBar from "../../components/mainPagecomponent/TopBar";
import Header from "../../components/mainPagecomponent/Header";
import TextToType from "../../components/mainPagecomponent/TextToType";
import { HomePageProps } from "../../types/types";
import EnglishKeyboard from './keyboards/EnglishKeyboard';
import RussianKeyboard from './keyboards/RussianKeyboard';

// This component is a main page that contains several subcomponents,
const HomePage: React.FC<HomePageProps> = ({
	keyData,
	goalData,
	userHistory,
	interfaceData,
	showLoginMenu,
	userInputLoginData,
	validationInputLoginData,
	closeWindow,
	userSignOut,
	getSpeedValue,
	showTypingText,
	getUserLoginIn,
	getShowLoginMenu,
	getAccuracyValue,
	getClickedComponent,
	getUserInputLoginData,
	handleOnBlurLoginForm,
	getDailyGoalTimeValue,
	handleOnFocusLoginForm }) => {

	return (
		<div className="home_page">
			<Header
				userHistory={userHistory}
				showLoginMenu={showLoginMenu}
				userInputLoginData={userInputLoginData}
				validationInputLoginData={validationInputLoginData}
				userSignOut={userSignOut}
				closeWindow={closeWindow}
				getUserLoginIn={getUserLoginIn}
				getShowLoginMenu={getShowLoginMenu}
				getClickedComponent={getClickedComponent}
				getUserInputLoginData={getUserInputLoginData}
				handleOnBlurLoginForm={handleOnBlurLoginForm}
				handleOnFocusLoginForm={handleOnFocusLoginForm} />
			<TopBar
				goalData={goalData}
				interfaceData={interfaceData}
				language={interfaceData.language}
				showLanguagesChoiceMenu={interfaceData.showLanguagesChoiceMenu}
				getSpeedValue={getSpeedValue}
				getAccuracyValue={getAccuracyValue}
				getDailyGoalTimeValue={getDailyGoalTimeValue}
			/>
			<TextToType
				keyData={keyData}
				goalData={goalData}
				interfaceData={interfaceData}
				showTypingText={showTypingText} />
			{interfaceData.language === 'en' ? <EnglishKeyboard {...keyData} /> : <RussianKeyboard {...keyData} />}
		</div>
	);
}


export default HomePage;