import { KeyMappingsProps } from '../../../../types/types';


export const keyMappings: KeyMappingsProps[][] = [
	// Верхний ряд (числа + символы)
	[
		{ key: "Ё", color: "green", wide: true },
		{ key: "1", shiftKey: "!", color: "green" },
		{ key: "2", shiftKey: '"', color: "cornflowerblue" },
		{ key: "3", shiftKey: "№", color: "blueviolet" },
		{ key: "4", shiftKey: ";", color: "chocolate" },
		{ key: "5", shiftKey: "%", color: "chocolate" },
		{ key: "6", shiftKey: ":", color: "cadetblue" },
		{ key: "7", shiftKey: "?", color: "cadetblue" },
		{ key: "8", shiftKey: "*", color: "blueviolet" },
		{ key: "9", shiftKey: "(", color: "cornflowerblue" },
		{ key: "0", shiftKey: ")", color: "green" },
		{ key: "-", shiftKey: "-", color: "green" },
		{ key: "=", shiftKey: "+", color: "green" },
		{ key: "Backspace", color: "green", wide: true, backspace: "backspace" },
	],

	// Средний ряд
	[
		{ key: "Tab", color: "green", wide: true, tab: "tab" },
		{ key: "Й", color: "green" },
		{ key: "Ц", color: "cornflowerblue" },
		{ key: "У", color: "blueviolet" },
		{ key: "К", color: "chocolate" },
		{ key: "Е", color: "chocolate" },
		{ key: "Н", color: "cadetblue" },
		{ key: "Г", color: "cadetblue" },
		{ key: "Ш", color: "blueviolet" },
		{ key: "Щ", color: "cornflowerblue" },
		{ key: "З", color: "green" },
		{ key: "Х", color: "green" },
		{ key: "Ъ", color: "green" },
		{ key: "\\", shiftKey: "/", color: "green", wide: true, tab: "tab" },
	],

	// Нижний ряд
	[
		{ key: "Caps Lock", color: "green", wide: true, capsLock: "capslock" },
		{ key: "Ф", color: "green" },
		{ key: "Ы", color: "cornflowerblue" },
		{ key: "В", color: "blueviolet" },
		{ key: "А", touchFinger: "_", color: "chocolate" },
		{ key: "П", color: "chocolate" },
		{ key: "Р", color: "cadetblue" },
		{ key: "О", touchFinger: "_", color: "cadetblue" },
		{ key: "Л", color: "blueviolet" },
		{ key: "Д", color: "cornflowerblue" },
		{ key: "Ж", color: "green" },
		{ key: "Э", color: "green" },
		{ key: "Enter", color: "green", wide: true, enter: "enter" },
	],

	// Нижний функциональный ряд
	[
		{ key: "Shift", leftShift: true, color: "green", wide: true, shift: true },
		{ key: "Я", color: "green" },
		{ key: "Ч", color: "cornflowerblue" },
		{ key: "С", color: "blueviolet" },
		{ key: "М", color: "chocolate" },
		{ key: "И", color: "chocolate" },
		{ key: "Т", color: "cadetblue" },
		{ key: "Ь", color: "cadetblue" },
		{ key: "Б", color: "blueviolet" },
		{ key: "Ю", color: "cornflowerblue" },
		{ key: ".", shiftKey: ",", color: "green" },
		{ key: "Shift", rightShift: true, color: "green", wide: true, shift: true },
	],

	// Пробел
	[
		{ key: "Ctrl", color: "green", tab: "tab" },
		{ key: "Win", color: "green" },
		{ key: "Alt", color: "green", tab: "tab" },
		{ key: " ", color: "darkgoldenrod", space: "space" },
		{ key: "Alt", color: "green", tab: "tab" },
		{ key: "Win", color: "green" },
		{ key: "Ctrl", color: "green", tab: "tab" },
	],
];