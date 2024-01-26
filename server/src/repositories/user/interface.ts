import { User } from '../../entities/user'

type UserWithoutGetEmail = Omit<User, 'getEmail'>
export type UserWithoutMethods = Omit<UserWithoutGetEmail, 'encryptPassword'>

export interface UserRepository {
	create: (newUser: User) => Promise<string>
	findById: (id: string) => Promise<UserWithoutMethods | null>
	findByEmail: (email: string) => Promise<UserWithoutMethods | null>
}
