import { Request, Response } from 'express'

import { RefreshToken } from '@useCases/user/refreshToken'
import { MongoDBUserRepository } from '@repositories/user/mongodb'

export class RefreshTokenController {
	static async handle(req: Request, res: Response) {
		const userRepository = new MongoDBUserRepository()
		const refreshTokenUseCase = new RefreshToken(userRepository)

		try {
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				return res.status(401).json({ error: 'Token is missing' })
			}

			const { accessToken, refreshToken } = await refreshTokenUseCase.execute({ token })

			return res.status(200).json({ accessToken, refreshToken })
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
