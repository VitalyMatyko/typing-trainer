import { OpenLettersType } from "../../../../types/types";

const OpenLetters: { EN: OpenLettersType; RU: OpenLettersType } = {
	EN: {
		letters: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
		punctuationMarks: [...`;<:{'\\"[\`}|,]>./?`],
		numbers: [...'0123456789'],
	},
	RU: {
		letters: [...'АОВЛЫДФЖЭКГЕНУШЦЩЙХЪМЬИТСБЧЮЯ'],
		punctuationMarks: [..."\\'\"/."],
		numbers: [...'0123456789'],
	}
};


export default OpenLetters;