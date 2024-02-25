import axios, { AxiosError } from 'axios'

const baseURL = import.meta.env.DEV
	? 'http://localhost:3000'
	: 'https://devempregado.onrender.com'

export const api = axios.create({ baseURL })

type Response = {
	message: string
	accessToken: string
	refreshToken: string
}

api.interceptors.request.use(
	async (config) => {
		const accessToken = localStorage.getItem('access_token')

		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}

		return config
	},

	(error) => Promise.reject(error)
)

api.interceptors.response.use(
	(response) => response,

	async (error) => {
		const axiosError = error as AxiosError

		if (axiosError.response?.status === 401) {
			const refreshToken = localStorage.getItem('refresh_token')

			const { data } = await axios.get<Response>(`${baseURL}/refresh-token`, {
				headers: { Authorization: `Bearer ${refreshToken}` },
			})

			localStorage.setItem('access_token', data.accessToken)
			localStorage.setItem('refresh_token', data.refreshToken)

			api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
		}

		return Promise.reject(error)
	}
)
