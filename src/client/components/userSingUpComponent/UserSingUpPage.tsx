import React from "react";
import { UserSingUpPageProps } from "../../types/types";
import CreateAccountForm from "./CreateAccountForm"



const UserSingUpPage: React.FC<UserSingUpPageProps> = ({
	userInputRegistrationData,
	validationInputRegistrationData,
	closeWindow,
	getUserSignUp,
	getUserInputRegistrationData,
	handleOnBlurRegistrationForm,
	handleOnFocusRegistrationForm }) => {

	return (
		<CreateAccountForm
			userInputRegistrationData={userInputRegistrationData}
			validationInputRegistrationData={validationInputRegistrationData}
			closeWindow={closeWindow}
			getUserSignUp={getUserSignUp}
			getUserInputRegistrationData={getUserInputRegistrationData}
			handleOnBlurRegistrationForm={handleOnBlurRegistrationForm}
			handleOnFocusRegistrationForm={handleOnFocusRegistrationForm}
		/>
	)
};

export default UserSingUpPage;