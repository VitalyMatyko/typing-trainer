
import TopBar from "../../components/mainPagecomponent/TopBar";
import Header from "../../components/mainPagecomponent/Header";
import TextToType from "../../components/mainPagecomponent/TextToType";
import { Alphabet } from "../../components/mainPagecomponent/alphabets/Alphabet";
import EnglishKeyboard from "../../components/mainPagecomponent/keyboards/EnglishKeyboard";
import RussianKeyboard from "../../components/mainPagecomponent/keyboards/RussianKeyboard";
import { HomePageProps } from "../../types/types";


const HomePage: React.FC<HomePageProps> = ({
	keyData,
	goalData,
	interfaceData,
	getSpeedValue,
	showTypingText,
	getAccuracyValue,
	getClickedComponent,
	getDailyGoalTimeValue }) => {

	return (
		<div className="home_page">
			<Header
				getClickedComponent={getClickedComponent} />
			<TopBar
				Alphabet={Alphabet}
				goalData={goalData}
				interfaceData={interfaceData}
				language={interfaceData.language}
				showLanguagesChoiceMenu={interfaceData.showLanguagesChoiceMenu}
				getSpeedValue={getSpeedValue}
				getAccuracyValue={getAccuracyValue}
				getDailyGoalTimeValue={getDailyGoalTimeValue}
			/>
			<TextToType
				keyData={keyData}
				goalData={goalData}
				interfaceData={interfaceData}
				showTypingText={showTypingText}
			/>
			{interfaceData.language === 'EN'
				? (<EnglishKeyboard keyData={keyData} activeKeyIndex={keyData.activeKeyIndex} />)
				: (<RussianKeyboard keyData={keyData} activeKeyIndex={keyData.activeKeyIndex} />)}
		</div>
	);
}


export default HomePage;