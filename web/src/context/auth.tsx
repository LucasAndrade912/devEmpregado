import { createContext, useState } from 'react'

import { api } from '../lib/api'

type Props = {
	children: React.ReactNode
}

type Response = {
	token: string
	message: string
}

type AuthData = {
	token: string
	signUp: (user: { name: string; email: string; password: string }) => Promise<void>
	signIn: (user: { email: string; password: string }) => Promise<void>
}

export const AuthContext = createContext<AuthData>({} as AuthData)

export function AuthProvider({ children }: Props) {
	const [token, setToken] = useState(localStorage.getItem('token') || '')

	async function signUp(user: {
		name: string
		email: string
		password: string
	}): Promise<void> {
		const { data } = await api.post<Response>('/register', user)
		localStorage.setItem('token', data.token)
		setToken(data.token)
	}

	async function signIn(user: { email: string; password: string }): Promise<void> {
		const { data } = await api.post<Response>('/login', user)
		localStorage.setItem('token', data.token)
		setToken(data.token)
	}

	return (
		<AuthContext.Provider value={{ token, signUp, signIn }}>
			{children}
		</AuthContext.Provider>
	)
}
