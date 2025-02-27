

import { TextToTypeProps } from "../../types/types";;



// Компонент текста для печати

const TextToType: React.FC<TextToTypeProps> = ({ keyData, showTypingText, interfaceData }) => {


	return (
		<div className="text_to_type">
			<div className="text">

				{/* {keyData.newText.map((item, index) => (
					<span key={index} style={{ color: item.style }}><span className={interfaceData.language === 'EN' ? 'text_en' : 'text_ru'}>{item.letter}</span></span>))} */}

				{keyData.typingText
					? (keyData.newText.map((item, index) => (
						<span key={index} style={{ color: item.style }}><span className={interfaceData.language === 'EN' ? 'text_en' : 'text_ru'}>{item.letter}</span></span>)))
					: (<span onClick={() => showTypingText()} className="start_typing">Let's Start</span>)
				}

			</div>
		</div >
	);
};

export default TextToType;


{/* {(userData.newText.map((item, index) => (
					<span key={index} style={{ color: item.style }}><span className="text_letter">{item.letter}</span></span>)))} */}