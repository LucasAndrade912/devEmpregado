import { Request, Response } from 'express'

import { RegisterUser } from '../useCases/user/registerUser'
import { MongoDBUserRepository } from '../repositories/user/mongodb'

export class RegisterUserController {
	static async handle(req: Request, res: Response) {
		const userRepository = new MongoDBUserRepository()
		const registerUserUseCase = new RegisterUser(userRepository)

		try {
			const { accessToken, refreshToken } = await registerUserUseCase.execute(req.body)

			return res.status(201).json({
				message: 'User created successfully',
				accessToken,
				refreshToken
			})
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
