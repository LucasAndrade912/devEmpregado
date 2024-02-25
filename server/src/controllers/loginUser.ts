import { Request, Response } from 'express'

import { LoginUser } from '@useCases/user/loginUser'
import { MongoDBUserRepository } from '@repositories/user/mongodb'

export class LoginUserController {
	static async handle(req: Request, res: Response) {
		const userRepository = new MongoDBUserRepository()
		const loginUserUseCase = new LoginUser(userRepository)

		try {
			const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body)

			return res.status(200).json({ message: 'Login successfully', accessToken, refreshToken })
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
