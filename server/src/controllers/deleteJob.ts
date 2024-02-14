import { Request, Response } from 'express'

import { DeleteJob } from '@useCases/job/deleteJob'
import { MongoDBJobRepository } from '@repositories/job/mongodb'

export class DeleteJobController {
	static async handle(req: Request, res: Response) {
		const jobRepository = new MongoDBJobRepository()
		const deleteJobUseCase = new DeleteJob(jobRepository)

		try {
			const userId = req.user as string
			const { jobId } = req.params
			await deleteJobUseCase.execute({ userId, jobId })

			return res.status(204)
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
