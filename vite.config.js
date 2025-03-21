import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	base: '/TypingTrainer',
	server: {
		// host: '0.0.0.0',
		// port: 4173,
		port: 5000,
		host: true,
		proxy: {
			'/api': 'http://localhost:5000'
		}
	},
	preview: {
		allowedHosts: ['typing-trainer-b950.onrender.com']
	},
});
