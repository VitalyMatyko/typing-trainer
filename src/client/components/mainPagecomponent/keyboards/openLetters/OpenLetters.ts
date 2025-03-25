import { OpenLettersType } from "../../../../types/types";

const OpenLetters: { en: OpenLettersType; ru: OpenLettersType } = {
	en: {
		letters: [...`fjghdkslarutyeiwoqpvmbncxz`],
		bigLetters: [...'FJGHDKSLARUTEYIWOQPVMBNCXZ'],
		numbers: [...'0123456789'],
		marks: [';', "'", ':', '"', '[', ']', '{', '}', '\\', '|', ',', '.', '<', '>', '/', '?', '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '_', '+'],
	},
	ru: {
		letters: [...`аовлыдфжэкгенушцщйхъмьитсбчюя`],
		bigLetters: [...'АОВЛЫДФЖЭКГЕНУШЦЩЙХЪМЬИТСБЧЮЯ'],
		numbers: [...'0123456789'],
		marks: ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '-', '=', '_', '+', '\\', '/', '.', ','],
	},
};

export default OpenLetters;



