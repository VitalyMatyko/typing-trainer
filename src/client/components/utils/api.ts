
import { NavigateFunction } from "react-router-dom";



const API_URL = import.meta.env.MODE === 'production'
	? import.meta.env.VITE_BACKEND_URL
	: import.meta.env.VITE_API_URL;


console.log(`API_URL: ${API_URL}`);
console.log(`NODE_ENV: ${import.meta.env.MODE}`);

export const refreshAccessToken = async () => {
	try {
		const res = await fetch(`${API_URL}/refresh`, {
			method: 'POST',
			credentials: 'include',
		});

		console.log('Ответ при обновлении токена:', res);

		if (!res.ok) throw new Error(`Ошибка обновления токена`);
		return true;
	} catch (error) {
		console.error(`Ошибка обновления токена: ${error}`);
		return false;
	};
};

// apiFetch function that automatically refreshes the token.
export const apiFetch = async (url: string,
	options: RequestInit = {},
	navigate?: NavigateFunction): Promise<Response> => {
	const { method = 'GET', body } = options;
	const response = await fetch(url, {
		...options,
		credentials: 'include',
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
		},
		body: body && method !== "GET" ? body : undefined,
	});

	if (response.status === 401) {
		const succes = await refreshAccessToken();
		if (succes) {
			return apiFetch(url, options, navigate);
		} else {
			navigate && navigate("/");
		};
	};
	return response;
};





