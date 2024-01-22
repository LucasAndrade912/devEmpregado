import { UserModel } from './model'
import { User } from '../../entities/user'

type UserWithoutMethods = Omit<User, 'encryptPassword'>

export class UserRepository {
	async create(newUser: User): Promise<void> {
		await UserModel.create(newUser)
	}

	async findById(id: string): Promise<UserWithoutMethods> {
		const user = await UserModel.findById(id)

		if (!user) throw new Error('User not found')

		return user
	}

	async findByEmail(email: string): Promise<UserWithoutMethods> {
		const user = await UserModel.findOne({ email })

		if (!user) throw new Error('User not found')

		return user
	}
}
