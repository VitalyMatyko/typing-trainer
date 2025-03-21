import React from "react";
import { UserSingInLoginProps } from "../../types/types";


const LoginForm: React.FC<UserSingInLoginProps> = ({
	userInputLoginData,
	validationInputLoginData,
	closeWindow,
	getUserLoginIn,
	getUserInputLoginData,
	handleOnBlurLoginForm,
	handleOnFocusLoginForm,
}) => {
	return (
		<>
			<div className="login-form">

				<div onClick={closeWindow} className="login_close_window">
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
				</div>

				<div className="top_stripe_background"></div>
				<form onSubmit={getUserLoginIn} method="POST" className="login-form_container">
					<div className="login_form_text">
						<div className="login_form_userSvg">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								shapeRendering="geometricPrecision"
								textRendering="geometricPrecision"
								imageRendering="optimizeQuality"
								fillRule="evenodd"
								clipRule="evenodd"
								viewBox="0 0 494 511.5">
								<path fill="#f4f4f4" fillRule="nonzero" d="M246.999 0c139.846 0 247 118.492 247 255.749 0 
								137.286-107.146 255.751-247 255.751C107.136 511.5 0 393.041 0 255.749 0 119.253 106.347 0 246.999 0z" />
								<path
									fill="#194794"
									fillRule="nonzero" d="M443.262 410.755c-44.365 60.337-114.245 
				100.375-195.179 100.731a485.973 485.973 0 01-10.864-.202c-77.469-3.082-144.112-42.601-186.864-101.048 
				14.588-29.09 45.279-46.423 76.205-50.56 31.076-4.154 56.937-8.371 67.876-45.937 2.831 2.48 5.803
				 4.983 8.835 7.677 28.308 25.167 60.205 26.261 87.478-.041 2.24-2.168 4.433-4.208 6.53-6.193 
				 13.959 31.067 46.917 36.552 74.708 41.926 28.807 5.565 57.181 26.462 71.275 53.647z" />
								<path fill="#D2A75F" fillRule="nonzero" d="M297.279 315.189c7.303 16.248 19.804 25.504 34.034 
				 31.396-48.137 35.317-114.594 33.276-164.102 3.093 14.996-8.076 22.505-19.772 27.209-35.947 2.83 
				 2.479 5.812 4.982 8.849 7.685 28.31 25.169 60.208 26.261 87.481-.04 2.24-2.168 4.432-4.209 6.529-6.187z" />
								<path fill="#DBB26F" fillRule="nonzero" d="M249.676 372.686c-28.788.127-57.743-7.941-82.465-23.008 
				 14.94-8.044 22.641-19.923 27.217-35.947 2.838 2.479 5.804 4.982 8.841 7.685 14.869 13.218 30.742 
				 19.795 46.407 19.253v32.017z" />
								<path fill="#E9BE79" d="M149.695 229.121c3.736-10.692 12.422-7.254 24.8-2.737-4.944-22.418.89-39.929 
				 18.442-52.069 37.446-25.908 54.37-3.733 94.957-36.414 23.316 11.743 44.177 31.595 33.547 93.617 
				 11.252-8.527 27.477-7.732 22.374 11.156l-6.972 19.747c-1.667 
				 4.726-2.782 6.44-8.754 6.119-2.64-.14-5.293-1.156-7.94-2.906 2.445 29.138-11.701 38.645-29.404 55.732-27.267 
				 26.312-59.166 25.226-87.468.048-16.578-14.745-31.301-23.7-32.035-54.014-4.3 1.317-8.362 
				 1.557-11.912-.461-7.072-4.025-9.648-15.739-10.035-23.243-.154-3.015-.026-11.503.4-14.575z" />
								<path fill="#F2CD8C" d="M149.696 229.121c3.739-10.693 12.419-7.251 24.799-2.737l-.111-.534.111.061c6.452-67.735 
				 40.082-57.55 75.178-66.2v180.957c-15.661.548-31.528-6.024-46.398-19.254-16.577-14.745-31.301-23.697-32.031-54.012-4.297 
				 1.314-8.364 1.555-11.911-.463-10.301-5.863-11.132-27.064-9.637-37.818z" />
								<path fill="#462917" d="M128.296 133.328c54.61-67.481 117.552-104.183 164.815-44.153 57.919 3.041 
				 78.011 97.546 29.434 134.416 3.891-51.331-11.304-74.352-34.8-85.921-44.719 48.763-104.421-4.43-113.25 
				 88.238l-21.432-11.162c-2.128-26.578 4.097-72.688-24.767-81.418z" />
							</svg>
						</div>
						<h1>SIGN IN</h1>
					</div>

					<div className="login_input">
						<div className="login_name">
							<input
								className={`login_name_input ${validationInputLoginData.userLoginNameOk
									? 'check_border'
									: validationInputLoginData.userLoginNameError
										? 'error_border'
										: ''}`}
								onChange={(event) => getUserInputLoginData(event)}
								onBlur={handleOnBlurLoginForm}
								onFocus={handleOnFocusLoginForm}
								type="text"
								name="userLoginName"
								id="userLoginName"
								value={userInputLoginData.userLoginName}
								placeholder="Enter your name..." />
							<div className="validataion_svg_ok">
								{validationInputLoginData.userLoginNameOk
									? (<svg
										className="check"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.707,8.707-7,7a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L10,14.586l6.293-6.293a1,1,0,0,1,1.414,1.414Z" />
									</svg>)
									: validationInputLoginData.userLoginNameError
										? (<svg
											className="error"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1ZM15.535,8.464a1,1,0,0,1,0,1.414L13.414,12l2.121,2.121a1,1,0,0,1-1.414,1.414L12,13.414l-2.121,2.121a1,1,0,0,1-1.414-1.414L10.586,12,8.464,9.879a1,1,0,0,1,1.414-1.414L12,10.586l2.121-2.121A1,1,0,0,1,15.535,8.464Z" />
										</svg>)
										: ("")}
							</div>
						</div>

						<div className="login_password">
							<input
								className={`login_password_input ${validationInputLoginData.userLoginPasswordOk
									? 'check_border'
									: validationInputLoginData.userLoginPasswordError
										? 'error_border'
										: ''}`}
								onChange={(event) => getUserInputLoginData(event)}
								onBlur={handleOnBlurLoginForm}
								onFocus={handleOnFocusLoginForm}
								type="text"
								name="userLoginPassword"
								id="userLoginPassword"
								value={userInputLoginData.userLoginPassword}
								placeholder="Enter your password..." />
							<div className="validataion_svg_ok">
								{validationInputLoginData.userLoginPasswordOk
									? (<svg
										className="check"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.707,8.707-7,7a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L10,14.586l6.293-6.293a1,1,0,0,1,1.414,1.414Z" />
									</svg>)
									: validationInputLoginData.userLoginPasswordError
										? (<svg
											className="error"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1ZM15.535,8.464a1,1,0,0,1,0,1.414L13.414,12l2.121,2.121a1,1,0,0,1-1.414,1.414L12,13.414l-2.121,2.121a1,1,0,0,1-1.414-1.414L10.586,12,8.464,9.879a1,1,0,0,1,1.414-1.414L12,10.586l2.121-2.121A1,1,0,0,1,15.535,8.464Z" />
										</svg>)
										: ("")}
							</div>
						</div>

						<div className="login_form_button">
							<button type="submit">SIGN IN</button>
						</div>
					</div>

				</form>
			</div>
		</>
	)
};

export default LoginForm;