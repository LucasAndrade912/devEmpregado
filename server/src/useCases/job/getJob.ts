import { z } from 'zod'

import { JobRepository } from '../../repositories/job/interface'

type Input = {
	jobId: string
}

export class GetJob<T = unknown> {
	constructor(private jobRepository: JobRepository<T>) {}

	async execute(input: Input): Promise<T> {
		const getJobSchema = z.object({ jobId: z.string().min(1) })

		const { jobId } = getJobSchema.parse(input)
		const job = await this.jobRepository.findById(jobId)

		return job
	}
}
