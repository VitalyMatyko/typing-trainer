
import React, { useState, useEffect } from "react";
import { AddedDeleteCharacters } from "../types/types";
import { apiFetch } from "../components/utils/api";


const settingLodgic = () => {


	const [showSettingMenu, setShowSettingMenu] = useState('0');

	const [choicedLanguage, setChoicedLanguage] = useState('en');
	const [choicedDailyGoalValue, setChoicedDailyGoalValue] = useState(10);
	const [choiceTypingTextLengthValue, setChoiceTypingTextLengthValue] = useState(10);
	const [choicedTargetTypingSpeedValue, setChoicedTargetTypingSpeedValue] = useState(200);

	const [checkboxData, setCheckboxData] = useState({ smallCheckbox: false, bigCheckbox: false, numberCheckbox: false, marksCheckbox: false, });
	const [addedCharacters, setAddedCharacters] = useState<AddedDeleteCharacters>({ en: [], ru: [] });
	const [deleteCharacters, setDeleteCharacters] = useState<AddedDeleteCharacters>({ en: [], ru: [] });


	const [userProfile, setUserProfile] = useState();
	const [isLoading, setIsLoading] = useState(false);


	const API_URL = import.meta.env.NODE_ENV === 'production'
		? import.meta.env.VITE_BACKEND_URL
		: import.meta.env.VITE_API_URL;


	useEffect(() => {
		const fetchUserData = async () => {
			setIsLoading(true);
			try {
				const response = await apiFetch(`${API_URL}/getUser`, {});
				if (!response.ok) throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
				const data = await response.json();
				setUserProfile((prev) => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));

				if (data?.profile) {
					setChoicedLanguage(() => {
						const availableLanguages = ['en', 'ru'];
						return availableLanguages.includes(data.profile.language) ? data.profile.language : 'en';
					});
					setChoicedDailyGoalValue(() => {
						return data.profile.dailyGoal;
					});
					setChoiceTypingTextLengthValue(() => {
						return data.profile.typingTextLength;
					});
					setChoicedTargetTypingSpeedValue(() => {
						return data.profile.speedGoal;
					});
				};
			} catch (error) {
				console.error(`Ошибка запроса: ${error}`);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserData();
	}, []);



	// This function changes the state of the checkbox.
	const getCheckboxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.currentTarget;
		setCheckboxData((prev) => ({
			...prev,
			[id]: checked,
		}))
	};

	// The handleLanguageChoice function handles the language selection when an element is clicked.
	const handleLanguageChoice = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		const targetLanguage = event.target as HTMLElement;
		if (!targetLanguage.id) return;
		if (targetLanguage.id === '0') setChoicedLanguage('en');
		if (targetLanguage.id === '1') setChoicedLanguage('ru');
	}

	// This function handles a click on a span containing a character, which is then added or removed from the setDeleteCharacters list
	const addLetterNumberMarksCharacters = (event: React.MouseEvent<HTMLDivElement>, data: { en: string[], ru: string[] }, language: 'en' | 'ru') => {
		event.stopPropagation();
		const character = (event.target as HTMLElement).closest('span') as HTMLSpanElement;
		const characterText = character?.textContent ?? '';
		if (!characterText) return;
		if (data[language].includes(characterText)) {
			setDeleteCharacters((prev) => {
				const alreadyExistsDelete = prev[language].includes(characterText);
				return {
					...prev,
					[language]: alreadyExistsDelete
						? prev[language].filter((char) => char !== characterText)
						: [...prev[language], characterText]
				};
			});
		};
		const parentDiv = character.closest('.letters_choice_characters');
		if (parentDiv?.previousElementSibling?.previousElementSibling?.querySelector('input')?.checked) {
			setAddedCharacters((prev) => {
				const alreadyExists = prev[language].includes(characterText);
				return {
					...prev,
					[language]: alreadyExists
						? prev[language].filter((char) => char !== characterText)
						: [...prev[language], characterText]
				}
			});
		};
	};

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

	// This function opens the menu of settings.
	const getClickedComponent = (id: string) => setShowSettingMenu(id);

	return {
		isLoading,
		checkboxData,
		addedCharacters,
		deleteCharacters,
		choicedLanguage,
		showSettingMenu,
		choicedDailyGoalValue,
		choicedTargetTypingSpeedValue,
		choiceTypingTextLengthValue,
		getCheckboxValue,
		setChoicedLanguage,
		setShowSettingMenu,
		setAddedCharacters,
		setDeleteCharacters,
		getClickedComponent,
		handleLanguageChoice,
		handleDailyGoalChoice,
		setChoicedDailyGoalValue,
		handleTypingLengthChoice,
		handleTargetTypingSpeedChoice,
		setChoiceTypingTextLengthValue,
		addLetterNumberMarksCharacters,
		setChoicedTargetTypingSpeedValue,
	};
};

export default settingLodgic;
