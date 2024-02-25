import { z } from 'zod'

import { User } from '@entities/user'
import { GenerateTokens } from '@utils/generateTokens'
import { UserRepository } from '@repositories/user/interface'

type Input = {
	name: string
	email: string
	password: string
}

export class RegisterUser {
	constructor(private userRepository: UserRepository) {}

	async execute({ name, email, password }: Input) {
		const userSchema = z.object({
			name: z.string().min(2),
			email: z.string().email(),
			password: z.string().min(8).max(64)
		})

		userSchema.parse({ name, email, password })

		const user = await this.userRepository.findByEmail(email)

		if (user) throw new Error('User already exists')

		const newUser = await User.build(name, email, password)
		const id = await this.userRepository.create(newUser)

		const { accessToken, refreshToken } = GenerateTokens.generate(
			{ name },
			id
		)

		return { accessToken, refreshToken }
	}
}
