import { Request, Response } from 'express'

import { GetJobs } from '../useCases/job/getJobs'
import { MongoDBJobRepository } from '../repositories/job/mongodb'

export class GetJobsController {
	static async handle(req: Request, res: Response) {
		const jobRepository = new MongoDBJobRepository()
		const getJobsUseCase = new GetJobs(jobRepository)

		try {
			const userId = req.user as string
			const jobs = await getJobsUseCase.execute({ userId, ...req.query })

			const allJobs = await getJobsUseCase.execute({ userId })
			let companies = allJobs.reduce<string[]>((acc, job) => [...acc, job.company], [])
			let roles = allJobs.reduce<string[]>((acc, job) => [...acc, job.role], [])

			companies = Array.from(new Set(companies))
			roles = Array.from(new Set(roles))

			return res.status(200).json({ jobs, companies, roles })
		} catch (error) {
			res.status(400)

			if (error instanceof Error) return res.json({ error: error.message })
			return res.json({ error })
		}
	}
}
