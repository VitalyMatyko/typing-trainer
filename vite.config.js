import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import * as process from 'process';




// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	base: '/TypingTrainer',
	server: {
		host: '0.0.0.0',
		port: process.env.PORT || 5050,
		proxy: {
			'/api': 'http://localhost:5000'
		},
	},
	preview: {
		port: process.env.PORT || 5050,
		// allowedHosts: ['typing-trainer-b950.onrender.com']
	},
});
