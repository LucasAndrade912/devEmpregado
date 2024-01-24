import { User } from '../../../entities/user'

export type UserWithoutMethods = Omit<User, 'encryptPassword'>

export interface IUserRepository {
	create: (newUser: User) => Promise<string>
	findById: (id: string) => Promise<UserWithoutMethods | null>
	findByEmail: (email: string) => Promise<UserWithoutMethods | null>
}
