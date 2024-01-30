import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { env } from '../env'

export class AuthMiddleware {
	static async handle(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res.status(400).json({ error: 'Send token to authenticate' })
		}

		try {
			const decodedToken = jwt.verify(token, env.JWT_SECRET)
			req.user = decodedToken.sub?.toString()
			next()
		} catch (error) {
			return res.status(400).json({ error })
		}
	}
}
