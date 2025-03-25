
import React from "react";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../client/App";
import { BrowserRouter } from 'react-router-dom';




const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		// <StrictMode>
		<BrowserRouter basename="/TypingTrainer" future={{ v7_relativeSplatPath: true }}>
			<App />
		</BrowserRouter>
		// </StrictMode>
	);
} else {
	console.error(`Element with id 'root' is not find`);
};