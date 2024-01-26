import { User } from '../../../entities/user'
import { UserRepository, UserWithoutMethods } from '../interface'

export class InMemoryUserRepository implements UserRepository {
	private static INCREMENT_ID = 0

	private users: Record<string, User> = {}

	async create(newUser: User): Promise<string> {
		const id = String(InMemoryUserRepository.INCREMENT_ID + 1)
		InMemoryUserRepository.INCREMENT_ID += 1

		this.users = {
			...this.users,
			[id]: newUser
		}

		return id
	}

	async findById(id: string): Promise<UserWithoutMethods | null> {
		const user = this.users[id]
		return user
	}

	async findByEmail(email: string): Promise<UserWithoutMethods | null> {
		const users = Object.values(this.users)
		const [user] = users.filter(user => user.getEmail() === email)
		return user
	}
}
