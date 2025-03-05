import { SettingPageProps } from "../../types/types";

// SettingsPage component for the settings page in the application.
const SettingsPage: React.FC<SettingPageProps> = ({
	Alphabets,
	checkboxData,
	interfaceData,
	choiceLanguage,
	addedCharacters,
	deleteCharacters,
	choicedDailyGoalValue,
	choicedTargetTypingSpeedValue,
	choiceTypingTextLengthValue,
	closeWindow,
	saveSettings,
	getCheckboxValue,
	getShowClassName,
	handleLanguageChoice,
	handleDailyGoalChange,
	handleTypingLengthChoice,
	handleTargetTypingSpeedChange,
	addLetterNumberMarksCharacters }) => {

	const flagLanguages = [
		{
			flag: 'en', id: '0', className: 'english_svg', svg: (<svg id="0" className="en" width="60" height="40" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" >
				<rect id="0" className="en" width="30" height="2" y="0" fill="#B22234" />
				<rect id="0" className="en" width="30" height="2" y="4" fill="#B22234" />
				<rect id="0" className="en" width="30" height="2" y="8" fill="#B22234" />
				<rect id="0" className="en" width="30" height="2" y="12" fill="#B22234" />
				<rect id="0" className="en" width="30" height="2" y="16" fill="#B22234" />

				<rect id="0" className="en" width="30" height="2" y="2" fill="white" />
				<rect id="0" className="en" width="30" height="2" y="6" fill="white" />
				<rect id="0" className="en" width="30" height="2" y="10" fill="white" />
				<rect id="0" className="en" width="30" height="2" y="14" fill="white" />
				<rect id="0" className="en" width="30" height="2" y="18" fill="white" />

				<rect id="0" className="en" width="12" height="10" fill="#0033A0" />

				<circle id="0" className="en" cx="2" cy="1" r="0.3" fill="white" />
				<circle id="0" className="en" cx="2.6" cy="1.6" r="0.3" fill="white" />
				<circle id="0" className="en" cx="3.2" cy="2.2" r="0.3" fill="white" />
				<circle id="0" className="en" cx="2" cy="2.8" r="0.3" fill="white" />
				<circle id="0" className="en" cx="2.6" cy="3.4" r="0.3" fill="white" />
				<circle id="0" className="en" cx="3.2" cy="4" r="0.3" fill="white" />
				<circle id="0" className="en" cx="2" cy="4.6" r="0.3" fill="white" />
				<circle id="0" className="en" cx="2.6" cy="5.2" r="0.3" fill="white" />
				<circle id="0" className="en" cx="3.2" cy="5.8" r="0.3" fill="white" />
			</svg>)
		},
		{
			flag: 'ru', id: '1', className: 'russian_svg', svg: (<svg id="1" className="ru" width="60" height="40" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
				<rect id="1" className="ru" width="30" height="6" fill="white" />
				<rect id="1" className="ru" width="30" height="6" y="6" fill="#0000FF" />
				<rect id="1" className="ru" width="30" height="6" y="12" fill="#D52B1E" />
			</svg>)
		},

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

			<div onClick={(e) => addLetterNumberMarksCharacters(e, interfaceData.openedLetters, interfaceData.language)} className="settings_page_choice_menu">
				<div className="language_choice">
					<div className="language_choice_text">Language:</div>
					<div className="language_choice_input">
						{flagLanguages.map((object) =>
							<div
								onClick={handleLanguageChoice}
								key={object.flag}
								data-flag={object.flag}
								className={`language_choice_svg ${choiceLanguage === object.flag ? 'active_flag_svg' : ''}`}>
								{object.svg}
							</div>)}
					</div>
				</div>

				<div className="letters_choice">
					<div className="checkbox_container">
						<input onChange={getCheckboxValue} className="styled_checkbox" type="checkbox" id="smallCheckbox" />
						<label htmlFor="smallCheckbox"></label>
					</div>
					<div className="letters_choice_text">Add small letter:</div>
					<div className="letters_choice_characters">
						{interfaceData.language === 'en'
							? (Alphabets.en.map((letter: string) =>
							(<span key={letter} className={getShowClassName(
								interfaceData.openedLetters,
								letter,
								interfaceData.language,
								checkboxData.smallCheckbox,
								addedCharacters,
								deleteCharacters,
							)}>{letter}</span>)))
							: (Alphabets.ru.map((letter: string) =>
							(<span key={letter} className={getShowClassName(
								interfaceData.openedLetters,
								letter,
								interfaceData.language,
								checkboxData.smallCheckbox,
								addedCharacters,
								deleteCharacters)}>{letter}</span>)))}
					</div>
				</div>

				<div className="letters_choice">
					<div className="checkbox_container">
						<input onChange={getCheckboxValue} className="styled_checkbox" type="checkbox" id="bigCheckbox" />
						<label htmlFor="bigCheckbox"></label>
					</div>
					<div className="letters_choice_text">Add Big letter:</div>
					<div className="letters_choice_characters">
						{interfaceData.language === 'en'
							? (Alphabets.EN.map((letter: string) =>
							(<span key={letter} className={getShowClassName(
								interfaceData.openedLetters,
								letter,
								interfaceData.language,
								checkboxData.bigCheckbox,
								addedCharacters,
								deleteCharacters)}>{letter}</span>)))
							: (Alphabets.RU.map((letter: string) =>
							(<span key={letter} className={getShowClassName(
								interfaceData.openedLetters,
								letter,
								interfaceData.language,
								checkboxData.bigCheckbox,
								addedCharacters,
								deleteCharacters)}>{letter}</span>)))}
					</div>
				</div>

				<div className="numbers_choice">
					<div className="checkbox_container">
						<input onChange={getCheckboxValue} className="styled_checkbox" type="checkbox" id="numberCheckbox" />
						<label htmlFor="numberCheckbox"></label>
					</div>
					<div className="numbers_choice_text">Add number:</div>
					<div className="letters_choice_characters">
						{Alphabets.numbers.map((number: string) =>
						(<span key={number} className={getShowClassName(
							interfaceData.openedLetters,
							number,
							interfaceData.language,
							checkboxData.numberCheckbox,
							addedCharacters,
							deleteCharacters)}>{number}</span>))}
					</div>
				</div>

				<div className="punctuation_marks_choice">
					<div className="checkbox_container">
						<input onChange={getCheckboxValue} className="styled_checkbox" type="checkbox" id="marksCheckbox" />
						<label htmlFor="marksCheckbox"></label>
					</div>
					<div className="punctuation_marks_choice_text">Add Marks:</div>
					<div className="letters_choice_characters">
						{interfaceData.language === 'en'
							? (Alphabets.marksEN.map((marksEN: string) =>
							(<span key={marksEN} className={getShowClassName(
								interfaceData.openedLetters,
								marksEN,
								interfaceData.language,
								checkboxData.marksCheckbox,
								addedCharacters,
								deleteCharacters)}>{marksEN}</span>)))
							: (Alphabets.marksRU.map((marksRU: string) =>
							(<span key={marksRU} className={getShowClassName(
								interfaceData.openedLetters,
								marksRU,
								interfaceData.language,
								checkboxData.marksCheckbox,
								addedCharacters,
								deleteCharacters)}>{marksRU}</span>)))}
					</div>
				</div>

				<div className="daily_goal_choice">
					<div className="daily_goal_choice_text">Daily goal:</div>
					<div className="daily_goal_choice_value"><input min='0' max='100' type="range" name="daily_goal" id="daily_goal_volume" value={choicedDailyGoalValue} step='1'
						onChange={handleDailyGoalChange}
					/></div>
					<div className="daily_goal_choice_minutes"><span>{choicedDailyGoalValue} minuts.</span></div>
				</div>

				<div className="typing_text_length_choice">
					<div className="typing_text_length_choice_text">Text length:</div>
					<div className="typing_text_length_choice_value"><input min='0' max='100' type="range" name="typing_text_length" id="daily_goal_volume" value={choiceTypingTextLengthValue} step='1'
						onChange={handleTypingLengthChoice}
					/></div>
					<div className="typing_text_length_choice_letters"><span>{choiceTypingTextLengthValue} letters.</span></div>
				</div>

				<div className="target_typing_speed_choice">
					<div className="target_typing_speed_choice_text">Target speed:</div>
					<div className="target_typing_speed_choice_value"><input min='0' max='1000' type="range" name="daily_goal" id="daily_goal_volume" value={choicedTargetTypingSpeedValue} step='1'
						onChange={handleTargetTypingSpeedChange}
					/></div>
					<div className="target_typing_speed_choice_l-m"><span className="target_typing_speed_span">{choicedTargetTypingSpeedValue} l / minutes.</span></div>
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

