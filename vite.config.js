import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import * as process from 'process';


// const PORT = process.env.PORT || 4173;
// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	base: '/TypingTrainer',
	server: {
		host: '0.0.0.0',
		// port: PORT,
		proxy: {
			// '/api': 'http://localhost:${PORT}'
			'/api': 'https://your-production-backend-url.com',
		}
	},
	preview: {
		allowedHosts: ['typing-trainer-b950.onrender.com']
	},
});
