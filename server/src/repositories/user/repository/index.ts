import { UserModel } from '../model'
import { User } from '../../../entities/user'
import { IUserRepository, UserWithoutMethods } from './interface'

export class UserRepository implements IUserRepository {
	async create(newUser: User): Promise<string> {
		const { _id } = await UserModel.create(newUser)
		return _id.toString()
	}

	async findById(id: string): Promise<UserWithoutMethods | null> {
		const user = await UserModel.findById(id)
		return user
	}

	async findByEmail(email: string): Promise<UserWithoutMethods | null> {
		const user = await UserModel.findOne({ email })

		return user
	}
}
