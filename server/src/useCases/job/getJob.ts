import { z } from 'zod'

import { JobRepository } from '../../repositories/job/interface'

type Input = {
	userId: string
	jobId: string
}

export class GetJob<T = unknown> {
	constructor(private jobRepository: JobRepository<T>) {}

	async execute(input: Input): Promise<T> {
		const getJobSchema = z.object({
			userId: z.string().min(1),
			jobId: z.string().min(1)
		})

		const { userId, jobId } = getJobSchema.parse(input)
		const job = await this.jobRepository.findById(userId, jobId)

		return job
	}
}
