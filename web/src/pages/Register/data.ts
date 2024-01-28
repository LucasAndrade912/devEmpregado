import { api } from '../../lib/api'

type User = {
	name: string
	email: string
	password: string
}

type Response = {
	token: string
	message: string
}

export async function createUser(user: User): Promise<Response> {
	const { data } = await api.post<Response>('/register', user)
	return data
}
