import { z } from 'zod'
import bcrypt from 'bcrypt'

import { GenerateTokens } from '@utils/generateTokens'
import { UserRepository } from '@repositories/user/interface'

type Input = {
	email: string
	password: string
}

export class LoginUser {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: Input) {
		const userSchema = z.object({
			email: z.string().email(),
			password: z.string().min(8).max(64)
		})

		userSchema.parse({ email, password })

		const user = await this.userRepository.findByEmail(email)

		if (!user) throw new Error('Email or Password was incorrect')

		const encryptedPassword = user.password
		const result = await bcrypt.compare(password, encryptedPassword)

		if (!result) throw new Error('Email or Password was incorrect')

		const { accessToken, refreshToken } = GenerateTokens.generate(
			{ name: user.name },
			user.id
		)

		return { accessToken, refreshToken }
	}
}
