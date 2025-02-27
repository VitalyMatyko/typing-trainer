
import React from "react";
import { TopBarProps } from '../../types/types.js';


const TopBar: React.FC<TopBarProps> = ({
	goalData,
	interfaceData,
	getSpeedValue,
	getAccuracyValue,
	getDailyGoalTimeValue,
}) => {
	return (
		<div className="top-bar">
			<div className="user-stats">
				<div className="open_letters">
					<p className="text_letter">Letters: </p>
					<ul className="letters">
						{interfaceData.language === "EN"
							? (interfaceData.openedLetters.EN.map((e) => (<li className={`characters ${interfaceData.openedLetters.EN.includes(e)
								? 'show' : 'hidden'}`} key={e}>{e}</li>)))
							: (interfaceData.openedLetters.RU.map((e) => (<li className={`characters ${interfaceData.openedLetters.RU.includes(e)
								? 'show' : 'hidden'}`} key={e}>{e}</li>)))}
					</ul>
				</div>
				<div className="type_speed">
					<p className="text_speed">Speed:</p>
					<div className={interfaceData.language === 'EN' ? 'progress-indicator_en' : 'progress-indicator_ru'}>
						<div className="process" style={getSpeedValue()}></div>
					</div>
					<p className="value_speed">{goalData.typingSpeed}</p>
					<span>/</span>
					<p className="value_speed">{goalData.speedGoal} l / м</p>
				</div>
				<div className="accyracy">
					<p className="text_accyracy">Accuracy:</p>
					<div className={interfaceData.language === 'EN' ? 'progress-indicator_en' : 'progress-indicator_ru'}>
						<div className="process" style={getAccuracyValue()}></div>
					</div>
					<p className="value_accyracy">{goalData.accuracy}</p>
					<span> / </span>
					<p className="value_goal_accyracy">100 %</p>
				</div>
				<div className="dayly_goal">
					<p className="text_goal">Daily goal:</p>
					<div className={interfaceData.language === 'EN' ? 'progress-indicator_en' : 'progress-indicator_ru'}>
						<div className="process" style={getDailyGoalTimeValue()}></div>
					</div>
					<p className="value_progress">{goalData.dailyGoal} minutes</p>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
