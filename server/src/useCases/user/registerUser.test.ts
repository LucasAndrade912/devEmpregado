import { RegisterUser } from './registerUser'
import { InMemoryUserRepository } from '../../repositories/user/inMemory'

const userRepository = new InMemoryUserRepository()
const registerUserUseCase = new RegisterUser(userRepository)

describe('RegisterUser Use Case', () => {
	it('should be able to register a user', async () => {
		const user = { name: 'John Doe', email: 'john.doe@gmail.com', password: 'password1234' }
		const { accessToken, refreshToken } = await registerUserUseCase.execute(user)
		expect(accessToken).not.toHaveLength(0)
		expect(refreshToken).not.toHaveLength(0)
	})

	it('should not be able to register user that already exists', async () => {
		const user = { name: 'John Doe', email: 'john.doe@gmail.com', password: 'password1234' }
		await expect(registerUserUseCase.execute(user)).rejects.toThrow()
	})

	it('should not be able to register user that email is not valid', async () => {
		const user = { name: 'John Doe', email: 'doe.john', password: 'password1234' }
		await expect(registerUserUseCase.execute(user)).rejects.toThrow()
	})

	it('should not be able to register user that password is less than 8 characters', async () => {
		const user = { name: 'John Doe', email: 'doe.john@gmail.com', password: '123' }
		await expect(registerUserUseCase.execute(user)).rejects.toThrow()
	})

	it('should not be able to register user that name is less than 2 characters', async () => {
		const user = { name: 'o', email: 'doe.john123@gmail.com', password: 'password1234' }
		await expect(registerUserUseCase.execute(user)).rejects.toThrow()
	})
})
