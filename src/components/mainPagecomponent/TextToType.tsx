
import { TextToTypeProps } from "../../types/types";;



// Компонент текста для печати
const TextToType: React.FC<TextToTypeProps> = ({ keyData, showTypingText, interfaceData }) => {
	return (
		<div className="text_to_type">
			<div className="text">
				{keyData.typingText
					? (keyData.newText.map((item, index) => (
						<span key={index} style={{ color: item.style }}><span className={interfaceData.language === 'en' ? 'text_en' : 'text_ru'}>{item.letter}</span></span>)))
					: (<span onClick={() => showTypingText()} className="start_typing">Let's Start</span>)
				}
			</div>
		</div >
	);
};

export default TextToType;
