import { OpenLettersType } from "../../../../types/types";

const OpenLetters: { en: OpenLettersType; ru: OpenLettersType } = {
	en: {
		letters: [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'],
		marks: [...`;<:{'\\"[\`}|,]>./?`],
		numbers: [...'0123456789'],
	},
	ru: {
		letters: [...'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАОВЛЫДФЖЭКГЕНУШЦЩЙХЪМЬИТСБЧЮЯ'],
		marks: [..."\\'\"/."],
		numbers: [...'0123456789'],
	},

};


export default OpenLetters;


// bigLetters: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
// bigLetters: [...'АОВЛЫДФЖЭКГЕНУШЦЩЙХЪМЬИТСБЧЮЯ'],