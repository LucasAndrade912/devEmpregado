import { Request, Response } from 'express'

import { GetJob } from '../useCases/job/getJob'
import { MongoDBJobRepository } from '../repositories/job/mongodb'

export class GetJobController {
	static async handle(req: Request, res: Response) {
		const jobRepository = new MongoDBJobRepository()
		const getJobUseCase = new GetJob(jobRepository)

		try {
			const userId = req.user as string
			const { jobId } = req.params
			const job = await getJobUseCase.execute({ userId, jobId })

			return res.status(200).json({ job })
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
