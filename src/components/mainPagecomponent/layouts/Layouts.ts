import { LayoutsKeyProps } from "../../../types/types";



export const layouts: Record<LayoutsKeyProps, string[]> = {
	en: [
		"~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", ":", "\"", "|", "{", "}",
		"`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
		"tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
		"capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
		"shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift",
		"ctrl", "alt", " ", "alt", "ctrl",
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	],
	ru: [
		"!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+",
		"ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
		"tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
		"capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
		"shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shift",
		"ctrl", "alt", " ", "alt", "ctrl",
		'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М',
		'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ',
		'Ы', 'Ь', 'Э', 'Ю', 'Я'
	],

};
export const layoutOrder = ["en", "ru"];



