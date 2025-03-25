import React from 'react';
import { keyMappings } from './keyMappings/KeyMapping.EN';
import { KeyboardProps, } from "../../../types/types";

// The EnglishKeyboard component, which displays a virtual keyboard based on the passed data.
const EnglishKeyboard: React.FC<KeyboardProps> = ({ ...keyData }) => {
	return (
		<div className="keyboard">
			<div className="keyboard_border">
				{keyMappings.map((row, index) => (
					<div key={index} className="key-row">
						{row.map(({ key, leftShift, rightShift, shiftKey, color, wide, shift, back_caps, tab, enter, backspace, capsLock, space, touchFinger, },
							keyIndex) => (
							<div
								style={{ backgroundColor: color }}
								key={`${key}-${keyIndex}`}
								className={`key 
									${wide ? "wide" : ''} 
									${shift ? "shift" : ''} 
									${back_caps ? "back_caps" : ''} 
									${tab ? "tab" : ''} 
									${enter ? "enter" : ''}
									${backspace ? "backspace" : ''} 
									${capsLock ? "capslock" : ''} 
									${space ? "space" : ''}
									${keyData.pressedKey?.toUpperCase() === key ? 'active_keys' : ''}
								  ${keyData.pressedKey === key ? 'active_keys' : ''}
									${rightShift && keyData.shiftLocation?.right || keyData.pressedKey === key ? 'active_keys' : ''}
									${leftShift && keyData.shiftLocation?.left || keyData.pressedKey === key ? 'active_keys' : ''}`}>
								{shiftKey && <span className="shift-key">{shiftKey}</span>}
								{touchFinger && (
									<span className="touch-finger">{touchFinger}</span>)}
								<span className={`main-key`}>{key}</span>
							</div>))}
					</div>))}
			</div>
		</div >
	);
};

export default EnglishKeyboard;
