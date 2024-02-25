import { createContext, useState } from 'react'

import { api } from '@lib/api'

type Props = {
	children: React.ReactNode
}

type Response = {
	message: string
	accessToken: string
	refreshToken: string
}

type AuthData = {
	token: string
	signUp: (user: { name: string; email: string; password: string }) => Promise<void>
	signIn: (user: { email: string; password: string }) => Promise<void>
}

export const AuthContext = createContext<AuthData>({} as AuthData)

export function AuthProvider({ children }: Props) {
	const [token, setToken] = useState(localStorage.getItem('access_token') || '')

	async function signUp(user: {
		name: string
		email: string
		password: string
	}): Promise<void> {
		const { data } = await api.post<Response>('/register', user)
		const { accessToken, refreshToken } = data

		localStorage.setItem('access_token', accessToken)
		localStorage.setItem('refresh_token', refreshToken)

		setToken(accessToken)
	}

	async function signIn(user: { email: string; password: string }): Promise<void> {
		const { data } = await api.post<Response>('/login', user)
		const { accessToken, refreshToken } = data

		localStorage.setItem('access_token', accessToken)
		localStorage.setItem('refresh_token', refreshToken)

		setToken(accessToken)
	}

	return (
		<AuthContext.Provider value={{ token, signUp, signIn }}>
			{children}
		</AuthContext.Provider>
	)
}
