import { LoginUser } from './loginUser'
import { RegisterUser } from './registerUser'
import { InMemoryUserRepository } from '../../repositories/user/inMemory'

const userRepository = new InMemoryUserRepository()
const loginUserUseCase = new LoginUser(userRepository)
const registerUserUseCase = new RegisterUser(userRepository)

describe('LoginUser Use Case', () => {
	beforeAll(() => {
		return registerUserUseCase.execute({
			name: 'Gabriel Barbosa',
			email: 'gabi.gol@gmail.com',
			password: 'gabigol123'
		})
	})

	it('should be able to login successfully', async () => {
		const user = { email: 'gabi.gol@gmail.com', password: 'gabigol123' }
		const token = await loginUserUseCase.execute(user)
		expect(token).not.toHaveLength(0)
	})

	it('should not be able to login successfully when user not exists', async () => {
		const user = { email: 'gab@gmail.com', password: 'gabigol123' }
		await expect(loginUserUseCase.execute(user)).rejects.toThrow()
	})

	it('should not be able to login successfully when password is wrong', async () => {
		const user = { email: 'gabi.gol@gmail.com', password: 'senhaerrada' }
		await expect(loginUserUseCase.execute(user)).rejects.toThrow()
	})

	it('should not be able to login successfully when email is not valid', async () => {
		const user = { email: 'gabi.gol', password: 'gabigol123' }
		await expect(loginUserUseCase.execute(user)).rejects.toThrow()
	})

	it('should not be able to login successfully when password is less than 8 characters', async () => {
		const user = { email: 'gabi.gol@gmail.com', password: '123' }
		await expect(loginUserUseCase.execute(user)).rejects.toThrow()
	})
})
