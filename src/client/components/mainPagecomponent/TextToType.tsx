import React from "react";
import { TextToTypeProps } from "../../types/types";


// Text component for printing
const TextToType: React.FC<TextToTypeProps> = ({ keyData, showTypingText, interfaceData }) => {
	return (
		<div className="text_to_type">
			<div className="text">
				<div className="text_border_line">
					{keyData.typingText
						? (keyData.newText.map((item, index) => (
							<span key={index} style={{ color: item.style }}>
								<span className={interfaceData.language === 'en' ? 'text_en' : 'text_ru'}>{item.letter}</span>
							</span>)))
						: (<span onClick={() => showTypingText()} className="start_typing">Let's Start</span>)}
				</div>
			</div>
		</div >
	);
};

export default TextToType;
