
import React, { useState } from "react";


const settingLodgic = () => {
	const [showSettingMenu, setShowSettingMenu] = useState('0');
	const [choicedLanguage, setChoiceLanguage] = useState('en');
	const [choicedDailyGoalValue, setChoicedDailyGoalValue] = useState(30);
	const [choiceTypingTextLengthValue, setChoiceTypingTextLengthValue] = useState(5);
	const [choicedTargetTypingSpeedValue, setChoicedTargetTypingSpeedValue] = useState(200)

	// The handleLanguageChoice function handles the language selection when an element is clicked.
	const handleLanguageChoice = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		const targetLanguage = event.target as HTMLElement;
		if (!targetLanguage.id) return;
		if (targetLanguage.id === '0') setChoiceLanguage('en');
		if (targetLanguage.id === '1') setChoiceLanguage('ru');
	}

	// This function handles the change of value in and changes the Daily goal.
	const handleDailyGoalChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const targetDailyGoal = event.target.value;
		if (!targetDailyGoal) return;
		setChoicedDailyGoalValue(+targetDailyGoal);
	}

	// This function handles the change of value in and changes the typing text length.
	const handleTypingLengthChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const typingTextLength = event.target.value;
		if (!typingTextLength) return;
		setChoiceTypingTextLengthValue(+typingTextLength);
	}

	// This function handles the change of value in and changes the target typing speed.
	const handleTargetTypingSpeedChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const targetTypingSpeed = event.target.value;
		if (!targetTypingSpeed) return;
		setChoicedTargetTypingSpeedValue(+targetTypingSpeed);
	}

	//This function opens the menu of settings.
	const getClickedComponent = () => {
		const clickedElement = event?.target as HTMLElement;
		setShowSettingMenu(clickedElement.id);
	}

	return {
		choicedLanguage,
		showSettingMenu,
		choicedDailyGoalValue,
		choicedTargetTypingSpeedValue,
		choiceTypingTextLengthValue,
		setChoiceLanguage,
		setShowSettingMenu,
		getClickedComponent,
		handleLanguageChoice,
		handleDailyGoalChoice,
		setChoicedDailyGoalValue,
		handleTypingLengthChoice,
		handleTargetTypingSpeedChoice,
		setChoiceTypingTextLengthValue,
		setChoicedTargetTypingSpeedValue,
	}
};

export default settingLodgic;
