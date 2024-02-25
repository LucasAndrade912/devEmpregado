import { z } from 'zod'
import jwt from 'jsonwebtoken'

import { env } from '@env'
import { GenerateTokens } from '@utils/generateTokens'
import { UserRepository } from '@repositories/user/interface'

type Input = {
	token: string
}

export class RefreshToken {
	constructor(private userRepository: UserRepository) {}

	async execute({ token }: Input) {
		const refreshTokenSchema = z.object({
			refreshToken: z.string()
		})

		refreshTokenSchema.parse({ refreshToken: token })

		const decoded = jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET)
		const { sub } = decoded

		const user = await this.userRepository.findById(sub as string)

		if (!user) throw new Error('User not exists')

		const { accessToken, refreshToken } = GenerateTokens.generate(
			{ name: user.name },
			user.id
		)

		return { accessToken, refreshToken }
	}
}
