import React from "react";


// Describes the structure of an object containing language and alphabet settings
export interface InterfaceDataProps {
	openedLetters: { en: string[], ru: string[] },
	letterIndex: number;
	language: "en" | "ru",
	showLanguagesChoiceMenu: boolean,
	selectedAlphabet: string[],
}

// The interface stores information about the typing process.
export interface KeyDataProps {
	keyData: KeyDataProps;
	pressedKey: string;
	typingText: boolean;
	currentIndex: number;
	spaceLocation: string;
	activeKeyIndex: number;
	typingTextLength: number;
	letterStyleChange: string;
	correctlyPressedLetters: string[];
	inCorrectlyPressedLetters: string[];
	newText: { letter: string; style: string; }[];
	shiftLocation: { left: boolean, right: boolean };
};

// Defines the structure of an object containing data about typing goals and statistics.
export interface GoalDataProps {
	accuracy: number;
	speedGoal: number;
	dailyGoal: number;
	timeTyping: number;
	typingSpeed: number;
	typedWordsToday: number;
}

// Defines the props structure for the component that manages page settings
export interface SettingPageProps {
	choiceLanguage: 'en' | 'ru';
	addedCharacters: { en: string[], ru: string[] };
	deleteCharacters: { en: string[], ru: string[] };
	choicedDailyGoalValue: number;
	interfaceData: InterfaceDataProps;
	choiceTypingTextLengthValue: number;
	choicedTargetTypingSpeedValue: number;
	Alphabets: { en: string[], ru: string[], EN: string[], RU: string[], numbers: string[], marksEN: string[], marksRU: string[] };
	saveSettings: () => void;
	closeWindow: () => void;
	getCheckboxValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setChoicedDailyGoalValue: (event: number) => void;
	handleDailyGoalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTypingLengthChoice: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTargetTypingSpeedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLanguageChoice: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	checkboxData: { bigCheckbox: boolean; smallCheckbox: boolean; marksCheckbox: boolean; numberCheckbox: boolean; };
	addLetterNumberMarksCharacters: (event: React.MouseEvent<HTMLDivElement>, data: { en: string[], ru: string[] }, language: 'en' | 'ru') => void;
	getShowClassName: (data: { en: string[], ru: string[] }, letter: string, language: 'en' | 'ru', checkbox: boolean, addedCharacters: AddedDeleteCharacters, deleteCharacters: AddedDeleteCharacters) => string
};

// AddedDeleteCharacters is an object containing arrays of added and deleted characters for English (en) and Russian (ru) languages.
export interface AddedDeleteCharacters {
	en: string[];
	ru: string[];
}

// Defines the props structure for the top bar component
export interface TopBarProps {
	language: string;
	goalData: GoalDataProps;
	showLanguagesChoiceMenu: boolean;
	interfaceData: InterfaceDataProps;
	getSpeedValue: () => React.CSSProperties;
	getAccuracyValue: () => React.CSSProperties;
	getDailyGoalTimeValue: () => React.CSSProperties;
};

// Defines the props structure for the component responsible for language selection
export interface ChoiceLanguagesProps {
	interfaceData: InterfaceDataProps;
}

// Defines the props structure for the keyboard component (keys)
export interface KeyboardProps {
	key?: string;
	tab?: string;
	enter?: string;
	space?: string;
	color?: string;
	wide?: boolean;
	shift?: boolean;
	capsLock?: string;
	shiftKey?: string;
	back_caps?: string;
	backspace?: string;
	pressedKey?: string;
	touchFinger?: string;
	keyData: KeyDataProps;
	activeKeyIndex?: number | null;
	leftShift?: boolean;
	rightShift?: boolean;
	spaceLocation?: string;
	letterStyleChange?: string;
	shiftLocation?: { left: boolean, right: boolean };
}

// Defines the props structure for the array of objects keyboard.
export interface KeyMappingsProps {
	key?: string;
	tab?: string;
	enter?: string;
	space?: string;
	color?: string;
	wide?: boolean;
	shift?: boolean;
	capsLock?: string;
	shiftKey?: string;
	back_caps?: string;
	backspace?: string;
	pressedKey?: string;
	touchFinger?: string;
	activeKeyIndex?: number | null;
	leftShift?: boolean;
	rightShift?: boolean;
	spaceLocation?: string;
	letterStyleChange?: string;
	shiftLocation?: { left: boolean, right: boolean };
}

// Describes the structure of props for the component responsible for displaying text.
export interface TextToTypeProps {
	keyData: KeyDataProps;
	goalData: GoalDataProps;
	showTypingText: () => void;
	interfaceData: InterfaceDataProps;
}

// Describes the structure of props for the Header component.
export interface HeaderProps {
	getClickedComponent: (id: string) => void;
}

// Describes the structure of props for the HomePage component.
export interface HomePageProps {
	keyData: KeyDataProps;
	goalData: GoalDataProps;
	interfaceData: InterfaceDataProps;
	showTypingText: () => void;
	getClickedComponent: (id: string) => void;
	getSpeedValue: () => React.CSSProperties;
	getAccuracyValue: () => React.CSSProperties;
	getDailyGoalTimeValue: () => React.CSSProperties;
}

// Describes the props structure for a component representing an SVG icon.
export interface SVGIconProps {
	id: string;
	pathData: string;
	circleData?: { cx: string; cy: string; r: string } | undefined;
}

// Describes the props structure for the ProfilePage component.
export interface ProfilePageProps {
	closeWindow: () => void;
}

// Describes the props structure for the SpeedTestPage component.
export interface SpeedTestPageProps {
	closeWindow: () => void;
}

// Describes the props structure for the UserSingUpPage component.
export interface UserSingUpPageProps {
	closeWindow: () => void;
}

// Describes the structure of data associated with the settings logic in the application.
export interface SettingLodgic {
	showSettingMenu: string;
	choicedLanguage: 'en' | 'ru';
	choicedDailyGoalValue: number;
}

// Types for keyboard layouts
export type LayoutsKeyProps = 'en' | 'ru';

// Describes the structure of an object that groups symbols into three categories:
export type OpenLettersType = {
	letters: string[];
	bigLetters: string[];
	numbers: string[];
	marks: string[];
};











