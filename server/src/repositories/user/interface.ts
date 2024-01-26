import { User, UserProps } from '../../entities/user'

export interface UserRepository {
	create: (newUser: User) => Promise<string>
	findById: (id: string) => Promise<UserProps | null>
	findByEmail: (email: string) => Promise<UserProps | null>
}
