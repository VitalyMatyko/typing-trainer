import { KeyMappingsProps } from "../../../../types/types";

export const keyMappings: KeyMappingsProps[][] = [
	// Верхний ряд (числа + символы)
	[
		{ key: "`", shiftKey: "~", color: "green", wide: true },
		{ key: "1", shiftKey: "!", color: "green" },
		{ key: "2", shiftKey: "@", color: "cornflowerblue" },
		{ key: "3", shiftKey: "#", color: "blueviolet" },
		{ key: "4", shiftKey: "$", color: "chocolate" },
		{ key: "5", shiftKey: "%", color: "chocolate" },
		{ key: "6", shiftKey: "^", color: "cadetblue" },
		{ key: "7", shiftKey: "&", color: "cadetblue" },
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
		{ key: "Q", color: "green" },
		{ key: "W", color: "cornflowerblue" },
		{ key: "E", color: "blueviolet" },
		{ key: "R", color: "chocolate" },
		{ key: "T", color: "chocolate" },
		{ key: "Y", color: "cadetblue" },
		{ key: "U", color: "cadetblue" },
		{ key: "I", color: "blueviolet" },
		{ key: "O", color: "cornflowerblue" },
		{ key: "P", color: "green" },
		{ key: "[", shiftKey: "{", color: "green" },
		{ key: "]", shiftKey: "}", color: "green" },
		{ key: "\\", shiftKey: "|", color: "green", wide: true, tab: "tab" },
	],

	// Нижний ряд
	[
		{ key: "Caps Lock", color: "green", wide: true, capsLock: "capslock" },
		{ key: "A", color: "green" },
		{ key: "S", color: "cornflowerblue" },
		{ key: "D", color: "blueviolet" },
		{ key: "F", touchFinger: "_", color: "chocolate" },
		{ key: "G", color: "chocolate" },
		{ key: "H", color: "cadetblue" },
		{ key: "J", touchFinger: "_", color: "cadetblue" },
		{ key: "K", color: "blueviolet" },
		{ key: "L", color: "cornflowerblue" },
		{ key: ";", shiftKey: ":", color: "green" },
		{ key: "'", shiftKey: "\"", color: "green" },
		{ key: "Enter", color: "green", wide: true, enter: "enter" },
	],

	// Нижний функциональный ряд
	[
		{ key: "Shift", leftShift: true, color: "green", wide: true, shift: true, },
		{ key: "Z", color: "green" },
		{ key: "X", color: "cornflowerblue" },
		{ key: "C", color: "blueviolet" },
		{ key: "V", color: "chocolate" },
		{ key: "B", color: "chocolate" },
		{ key: "N", color: "cadetblue" },
		{ key: "M", color: "cadetblue" },
		{ key: ",", shiftKey: "<", color: "blueviolet" },
		{ key: ".", shiftKey: ">", color: "cornflowerblue" },
		{ key: "/", shiftKey: "?", color: "green" },
		{ key: "Shift", rightShift: true, color: "green", wide: true, shift: true, },
	],

	// ПробелA
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