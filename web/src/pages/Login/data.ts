import { api } from '../../lib/api';

type User = {
	email: string
	password: string
}

type Response = {
	token: string
	message: string
}

export async function login(user: User): Promise<Response> {
	const { data } = await api.post<Response>('/login', user)
	return data
}
