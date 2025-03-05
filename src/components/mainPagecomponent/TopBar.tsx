import React from "react";
import { TopBarProps } from '../../types/types.js';

// This component displays a top panel (or bar) with various information about the user's statistics related to their typing goals.
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
						{interfaceData.language === "en"
							? (interfaceData.openedLetters.en.map((e) => (<li className='characters' key={e}>{e}</li>)))
							: (interfaceData.openedLetters.ru.map((e) => (<li className='characters' key={e}>{e}</li>)))}
					</ul>
				</div>
				<div className="type_speed">
					<p className="text_speed">Speed:</p>
					<div className="speed_process">
						<div className={'progress-indicator'}>
							<div className="process" style={getSpeedValue()}></div>
						</div>
					</div>
					<div className="speed_value_block">
						<p className="value_speed">{goalData.typingSpeed} /</p>
						<p className="value_speed_goal">{goalData.speedGoal} l / м</p>
					</div>
				</div>
				<div className="accuracy">
					<p className="text_accuracy">Accuracy:</p>
					<div className="accuracy_progress">
						<div className={'progress-indicator'}>
							<div className="process" style={getAccuracyValue()}></div>
						</div>
					</div>
					<div className="accuracy_goal_value_block">
						<p className="value_accuracy">{goalData.accuracy} /</p>
						<p className="value_goal_accuracy">100%</p>
					</div>
				</div>
				<div className="daily_goal">
					<p className="text_goal">Daily goal:</p>
					<div className="daily_progress">
						<div className='progress-indicator'>
							<div className="process" style={getDailyGoalTimeValue()}></div>
						</div>
					</div>
					<p className="value_progress">{goalData.dailyGoal} minutes</p>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
