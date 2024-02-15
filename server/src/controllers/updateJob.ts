import { Request, Response } from 'express'

import { UpdateJob } from '@useCases/job/updateJob'
import { MongoDBJobRepository } from '@repositories/job/mongodb'

export class UpdateJobController {
	static async handle(req: Request, res: Response) {
		const jobRepository = new MongoDBJobRepository()
		const updateJobUseCase = new UpdateJob(jobRepository)

		try {
			const userId = req.user as string
			const { jobId } = req.params
			await updateJobUseCase.execute({ userId, jobId, ...req.body })

			return res.status(204).send()
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
