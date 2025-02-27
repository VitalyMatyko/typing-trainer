
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";




const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
} else {
	console.error(`Element with id 'root' is not find`);
};