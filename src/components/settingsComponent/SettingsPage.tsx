
import { SettingPageProps } from "../../types/types";


const SettingsPage: React.FC<SettingPageProps> = ({
	choiceLanguage,
	choicedDailyGoalValue,
	choicedTargetTypingSpeedValue,
	choiceTypingTextLengthValue,
	closeWindow,
	saveSettings,
	handleLanguageChange,
	handleDailyGoalChange,
	handleTypingLengthChoice,
	handleTargetTypingSpeedChange }) => {

	const flagLanguages = [
		{
			flag: 'EN', id: '0', className: 'english_svg', svg: (<svg id="0" className="EN" width="60" height="40" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" >
				<rect id="0" className="EN" width="30" height="2" y="0" fill="#B22234" />
				<rect id="0" className="EN" width="30" height="2" y="4" fill="#B22234" />
				<rect id="0" className="EN" width="30" height="2" y="8" fill="#B22234" />
				<rect id="0" className="EN" width="30" height="2" y="12" fill="#B22234" />
				<rect id="0" className="EN" width="30" height="2" y="16" fill="#B22234" />

				<rect id="0" className="EN" width="30" height="2" y="2" fill="white" />
				<rect id="0" className="EN" width="30" height="2" y="6" fill="white" />
				<rect id="0" className="EN" width="30" height="2" y="10" fill="white" />
				<rect id="0" className="EN" width="30" height="2" y="14" fill="white" />
				<rect id="0" className="EN" width="30" height="2" y="18" fill="white" />

				<rect id="0" className="EN" width="12" height="10" fill="#0033A0" />

				<circle id="0" className="EN" cx="2" cy="1" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="2.6" cy="1.6" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="3.2" cy="2.2" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="2" cy="2.8" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="2.6" cy="3.4" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="3.2" cy="4" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="2" cy="4.6" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="2.6" cy="5.2" r="0.3" fill="white" />
				<circle id="0" className="EN" cx="3.2" cy="5.8" r="0.3" fill="white" />
			</svg>)
		},
		{
			flag: 'RU', id: '1', className: 'russian_svg', svg: (<svg id="1" className="RU" width="60" height="40" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
				<rect id="1" width="30" height="6" fill="white" />
				<rect id="1" width="30" height="6" y="6" fill="#0000FF" />
				<rect id="1" width="30" height="6" y="12" fill="#D52B1E" />
			</svg>)
		},
		{
			flag: 'GE', id: '2', className: 'german_svg', svg: (<svg id="2" className="GE" width="60" height="40" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
				<rect id="2" width="30" height="6" fill="#FFCE00" />
				<rect id="2" width="30" height="6" y='6' fill="#DD0000" />
				<rect id="2" width="30" height="6" y='12' fill="#000" />
			</svg>)
		}
	];

	return (
		<div className="settings_page">
			<span onClick={closeWindow} className="close_window">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<line x1="18" y1="5" x2="5" y2="18" />
					<line x1="5" y1="5" x2="18" y2="18" />
				</svg>
			</span>
			<div className="choice_menu">
				<div className="text_choice">
					<ul>
						<li>Language choice:</li>
						<li>Daily goal choice:</li>
						<li>Typing text length choice:</li>
						<li>Target typing speed choice:</li>
					</ul>
				</div>
				<div className="input_choice">
					<ul>
						<li>{flagLanguages.map((object: any) =>
							<div
								onClick={handleLanguageChange}
								key={object.flag}
								data-flag={object.flag}
								className={`${choiceLanguage === object.flag ? 'active_flag_svg' : ''}`}>
								{object.svg}
							</div>)}
						</li>
						<li><input min='0' max='100' type="range" name="daily_goal" id="daily_goal_volume" value={choicedDailyGoalValue} step='1'
							onChange={handleDailyGoalChange}
						/></li>
						<li><input min='0' max='100' type="range" name="typing_text_length" id="daily_goal_volume" value={choiceTypingTextLengthValue} step='1'
							onChange={handleTypingLengthChoice}
						/></li>
						<li><input min='0' max='1000' type="range" name="daily_goal" id="daily_goal_volume" value={choicedTargetTypingSpeedValue} step='1'
							onChange={handleTargetTypingSpeedChange}
						/></li>
					</ul>
				</div>
				<div className="value_choice">
					<ul>
						<li><span>{choicedDailyGoalValue} minuts.</span></li>
						<li><span>{choiceTypingTextLengthValue} letters.</span></li>
						<li><span className="target_typing_speed_span">{choicedTargetTypingSpeedValue} letters / minutes.</span></li>
					</ul>
				</div>
			</div>
			<div className="setting_manage">
				<span className="delete">delete</span>
				<span onClick={saveSettings} className="save">save</span>
			</div>
		</div>
	)
}

export default SettingsPage;

