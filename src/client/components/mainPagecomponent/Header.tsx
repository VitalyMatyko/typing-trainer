import React from "react";
import { HeaderProps } from "../../types/types";
import SVGIcon from "../settingsComponent/SVGIcon";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";


// A Header component that displays a set of SVG icons and handles clicks on them.
const Header: React.FC<HeaderProps> = ({
	userHistory,
	showLoginMenu,
	userInputLoginData,
	validationInputLoginData,
	getUserLoginIn,
	userSignOut,
	closeWindow,
	getShowLoginMenu,
	handleOnBlurLoginForm,
	handleOnFocusLoginForm,
	getUserInputLoginData }) => {
	const svgData = [
		{ id: "0", path: '/', pathData: "M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z" },
		{ id: "1", path: '/Statistics', pathData: "M17.45,15.18L22,7.31V19L22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L16.74,12.5L10.23,8.75L4.31,19H6.57L10.96,11.44L17.45,15.18Z" },
		{ id: "2", path: '/SpeedTest', pathData: "M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z" },
		{ id: "3", path: '/Settings', cirсleData: { cx: "12", cy: "12", r: "3.5" }, pathData: "M19.43 12.97C19.47 12.65 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.66 15.5 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.5 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.5 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.5 18.67 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z" },
		{ id: "4", path: '/SignUp', pathData: "M12 0c-6.625 0-12 5.375-12 12s5.375 12 12 12 12-5.375 12-12-5.375-12-12-12z M19.96 14.82c-1.090 3.74-4.27 6.455-8.040 6.455-3.775 0-6.96-2.725-8.045-6.475-1.19-0.1-2.125-1.18-2.125-2.51 0-1.27 0.855-2.315 1.965-2.495v-0.005c2.090-1.465 3.805-3.49 4.095-5.050l0.005 0.005v-0.015c1.355 2.625 6.3 5.19 11.825 5.060 0.1-0.015 0.195-0.035 0.295-0.035 1.275 0 2.31 1.135 2.31 2.535 0.005 1.39-1.020 2.52-2.285 2.53z M9.5 12.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z M16.5 12.5c0 0.552-0.448 1-1 1s-1-0.448-1-1c0-0.552 0.448-1 1-1s1 0.448 1 1z M14.695 17.105c-0.745 0.575-1.7 0.895-2.695 0.895s-1.95-0.32-2.695-0.895c-0.215-0.17-0.53-0.13-0.7 0.090s-0.13 0.53 0.090 0.7c0.915 0.71 2.090 1.105 3.305 1.105s2.39-0.395 3.305-1.105c0.22-0.17 0.26-0.485 0.090-0.7-0.17-0.22-0.485-0.26-0.7-0.090z", zIndex: 5 }
	];
	return (
		<div className="top_element">
			<div className="header">
				{svgData.map((data) => (
					<Link to={data.path} key={data.id} className={`${data.id} nav_item`}>
						<SVGIcon
							id={data.id}
							pathData={data.pathData}
							circleData={data.cirсleData}
						/>
					</Link>
				))}
			</div>
			<div className="show_userName_and_signText_menu">
				{userHistory?.name
					? (<><div className="userNickName">{userHistory?.name}</div>
						<div onClick={userSignOut} className="sign">Sign out</div></>)
					: (<><div className="userNickName">User</div>
						<div onClick={getShowLoginMenu} className="sign">Sign in</div></>)}
			</div>
			{showLoginMenu &&
				<LoginForm
					userInputLoginData={userInputLoginData}
					validationInputLoginData={validationInputLoginData}
					closeWindow={closeWindow}
					getUserLoginIn={getUserLoginIn}
					handleOnBlurLoginForm={handleOnBlurLoginForm}
					handleOnFocusLoginForm={handleOnFocusLoginForm}
					getUserInputLoginData={getUserInputLoginData} />}
		</div>
	);
};

export default Header;
