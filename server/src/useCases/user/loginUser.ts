import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '../../env'
import { UserRepository } from '../../repositories/user/interface'

type Input = {
	email: string
	password: string
}

export class LoginUser {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: Input): Promise<string> {
		const userSchema = z.object({
			email: z.string().email(),
			password: z.string().min(8).max(64)
		})

		userSchema.parse({ email, password })

		const user = await this.userRepository.findByEmail(email)

		if (!user) throw new Error('User not exists')

		const encryptedPassword = user.password
		const result = await bcrypt.compare(password, encryptedPassword)

		if (!result) throw new Error('Email or password was incorrect')

		const token = jwt.sign({ name: user.name }, env.JWT_SECRET, {
			expiresIn: '7 days',
			subject: user.id
		})

		return token
	}
}
