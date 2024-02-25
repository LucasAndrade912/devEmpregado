import jwt from 'jsonwebtoken'

import { env } from '@env'

export class GenerateTokens {
	static generate(payload: object, subject: string) {
		const accessToken = jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: '1h',
			subject
		})

		const refreshToken = jwt.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: '30d',
			subject
		})

		return { accessToken, refreshToken }
	}
}
