import { UserSingUpPageProps } from "../../types/types";


const UserSingUpPage: React.FC<UserSingUpPageProps> = ({ closeWindow }) => {
	return (
		<div className="user_sing_up_page">
			<h1>User Sing Up</h1>
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
		</div>
	)
};

export default UserSingUpPage;