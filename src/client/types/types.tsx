// import exp from "constants";
import React, { ReactNode } from "react";


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
	correctlyPressedLettersStatisticArray: string[][];
	inCorrectlyPressedLettersStatisticArray: string[][];
};

// Defines the structure of an object containing data about typing goals and statistics.
export interface GoalDataProps {
	accuracy: number;
	speedGoal: number;
	dailyGoal: number;
	timeTyping: number;
	typingSpeed: number;
	typedWordsToday: number;
	speedStatisticsArray: number[];
	accuracyStatisticsArray: number[];
	timeTypingDailyStatisticsArray: number[];
}

// Defines the props structure for the component that manages page settings
export interface SettingPageProps {
	isLoading: boolean,
	choicedLanguage: string;
	choicedDailyGoalValue: number;
	interfaceData: InterfaceDataProps;
	choiceTypingTextLengthValue: number;
	choicedTargetTypingSpeedValue: number;
	addedCharacters: { en: string[], ru: string[] };
	deleteCharacters: { en: string[], ru: string[] };
	Alphabets: { en: string[], ru: string[], EN: string[], RU: string[], numbers: string[], marksEN: string[], marksRU: string[] };
	checkboxData: { bigCheckbox: boolean; smallCheckbox: boolean; marksCheckbox: boolean; numberCheckbox: boolean; };
	saveSettings: () => void;
	closeWindow: () => void;
	setChoicedDailyGoalValue: (event: number) => void;
	getCheckboxValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDailyGoalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTypingLengthChoice: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTargetTypingSpeedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLanguageChoice: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
	showLoginMenu: boolean;
	userHistory: UserHistory | null;
	userInputLoginData: UserInputLoginDataProps;
	validationInputLoginData: ValidationInputLoginDataProps;
	closeWindow: () => void;
	userSignOut: () => void;
	getShowLoginMenu: () => void;
	handleOnBlurLoginForm: () => void;
	handleOnFocusLoginForm: () => void;
	getClickedComponent: (id: string) => void;
	getUserLoginIn: (event: React.FormEvent<HTMLFormElement>) => void;
	getUserInputLoginData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Describes the structure of props for the HomePage component.
export interface HomePageProps {
	keyData: KeyDataProps;
	showLoginMenu: boolean;
	goalData: GoalDataProps;
	userHistory: UserHistory | null;
	interfaceData: InterfaceDataProps;
	userInputLoginData: UserInputLoginDataProps;
	validationInputLoginData: ValidationInputLoginDataProps;
	userSignOut: () => void;
	closeWindow: () => void;
	showTypingText: () => void;
	getShowLoginMenu: () => void;
	handleOnBlurLoginForm: () => void;
	handleOnFocusLoginForm: () => void;
	getSpeedValue: () => React.CSSProperties;
	getClickedComponent: (id: string) => void;
	getAccuracyValue: () => React.CSSProperties;
	getDailyGoalTimeValue: () => React.CSSProperties;
	getUserLoginIn: (event: React.FormEvent<HTMLFormElement>) => void;
	getUserInputLoginData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Describes the props structure for a component representing an SVG icon.
export interface SVGIconProps {
	id: string;
	pathData: string;
	circleData?: { cx: string; cy: string; r: string } | undefined;
}

// Describes the props structure for the ProfilePage component.
export interface StatisticsPageProps {
	closeWindow: () => void;
}

// Describes the props structure for the SpeedTestPage component.
export interface SpeedTestPageProps {
	closeWindow: () => void;
}

// Describes the props structure for the UserSingUpPage component.
export interface UserSingUpPageProps {
	userInputRegistrationData: {
		userName: string,
		userEmail: string,
		userPassword: string
	};
	validationInputRegistrationData: {
		userNameOk: boolean,
		userNameError: boolean,
		userEmailOk?: boolean,
		userEmailError?: boolean,
		userPasswordOk: boolean,
		userPasswordError: boolean,
	}
	closeWindow: () => void;
	handleOnBlurRegistrationForm: () => void;
	handleOnFocusRegistrationForm: () => void;
	getUserSignUp: (event: React.FormEvent<HTMLFormElement>) => void;
	getUserInputRegistrationData: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


export interface UserSingInLoginProps {
	userInputLoginData: {
		userLoginName: string,
		userLoginPassword: string
	};
	validationInputLoginData: {
		userLoginNameOk: boolean,
		userLoginNameError: boolean,
		userLoginPasswordOk: boolean,
		userLoginPasswordError: boolean,
	};
	closeWindow: () => void;
	handleOnBlurLoginForm: () => void;
	handleOnFocusLoginForm: () => void;
	getUserLoginIn: (event: React.FormEvent<HTMLFormElement>) => void;
	getUserInputLoginData: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

// User input data
export interface UserInputRegistrationDataProps {
	userName: string;
	userEmail: string;
	userPassword: string;

};

export interface ValidationInputRegistrationDataProps {
	userNameOk: boolean;
	userNameError: boolean;
	userEmailOk: boolean;
	userEmailError: boolean;
	userPasswordOk: boolean;
	userPasswordError: boolean;
}

export interface ValidationInputLoginDataProps {
	userLoginNameOk: boolean,
	userLoginNameError: boolean,
	userLoginPasswordOk: boolean,
	userLoginPasswordError: boolean,
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

export interface AuthProviderProps {
	children: ReactNode;
}

export interface AuthContextType {
	token: string;
	userData: string | null;
	logout: () => void;
	login: (email: string, password: string, isRegistering: boolean) => void;
}

export interface UserHistory {
	_id: string;
	name: string;
	email: string;
	user_id: string;
	dateRegistration: string;
	__v: number;
	profile: {
		_id: string;
		typingTextLength: number;
		correctlyPressedLetters: string[];
		inCorrectlyPressedLetters: string[];
		accuracy: number;
		dailyGoal: number;
		speedGoal: number;
		typingSpeed: number;
		language: string;
		openedLetters: {
			en: string[];
			ru: string[];
		};
		date: string;
	},
	statistics: {
		speedStatisticsData: string[],
		dailyStatisticsData: string[],
		typingDailyStatisticsData: string[],
		timeTypingStatisticsData: string[],
		accuracyStatisticsData: string[],
		correctlyPressedLettersStatistic: [...string[], string[]],
		inCorrectlyPressedLettersStatistic: [...string[], string[]],
	};
};


export interface UserInputDataProps {
	userName: string;
	userPassword: string;
};

export interface UserInputLoginDataProps {
	userLoginName: string;
	userLoginPassword: string;
};




