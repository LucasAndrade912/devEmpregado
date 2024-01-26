import { UserModel } from './model'
import { UserRepository } from '../interface'
import { User, UserProps } from '../../../entities/user'

export class MongoDBUserRepository implements UserRepository {
	async create(newUser: User): Promise<string> {
		const { _id } = await UserModel.create(newUser)
		return _id.toString()
	}

	async findById(id: string): Promise<UserProps | null> {
		const user = await UserModel.findById(id)
		if (!user) return null
		return {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			password: user.password
		}
	}

	async findByEmail(email: string): Promise<UserProps | null> {
		const user = await UserModel.findOne({ email })
		if (!user) return null
		return {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			password: user.password
		}
	}
}
