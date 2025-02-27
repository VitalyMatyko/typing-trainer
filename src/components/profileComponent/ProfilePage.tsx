import React from "react";
import { ProfilePageProps } from "../../types/types";


const ProfilePage: React.FC<ProfilePageProps> = ({ closeWindow }) => {
	return (
		<div className="profile_page">
			<h1>Profile Statistic</h1>
			<div onClick={closeWindow} className="profile_manage">
				<span className="close_window">
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
		</div>
	)
};

export default ProfilePage;