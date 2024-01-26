import { User, UserProps } from '../../../entities/user'
import { UserRepository } from '../interface'

export class InMemoryUserRepository implements UserRepository {
	private static INCREMENT_ID = 0

	private users: Record<string, UserProps> = {}

	async create(newUser: User): Promise<string> {
		const id = String(InMemoryUserRepository.INCREMENT_ID + 1)
		InMemoryUserRepository.INCREMENT_ID += 1

		this.users = {
			...this.users,
			[id]: {
				id,
				name: newUser.getName(),
				email: newUser.getEmail(),
				password: newUser.getPassword()
			}
		}

		return id
	}

	async findById(id: string): Promise<UserProps | null> {
		const user = this.users[id]
		return user
	}

	async findByEmail(email: string): Promise<UserProps | null> {
		const users = Object.values(this.users)
		const [user] = users.filter(user => user.email === email)
		return user
	}
}
