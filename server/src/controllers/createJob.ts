import { Request, Response } from 'express'

import { CreateJob } from '../useCases/job/createJob'
import { MongoDBJobRepository } from '../repositories/job/mongodb'

export class CreateJobController {
	static async handle(req: Request, res: Response) {
		const jobRepository = new MongoDBJobRepository()
		const createJobUseCase = new CreateJob(jobRepository)

		try {
			const userId = req.user as string
			await createJobUseCase.execute({ userId, ...req.body })

			return res.status(201).json({ message: 'Job created successfully' })
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
