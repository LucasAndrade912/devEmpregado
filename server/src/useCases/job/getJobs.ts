import { z } from 'zod'

import { JobRepository } from '../../repositories/job/interface'

type Input = {
	userId: string
	company?: string
	role?: string
	modality?: string
	contract?: string
}

export class GetJobs<T = unknown> {
	constructor(private jobRepository: JobRepository<T>) {}

	async execute(input: Input): Promise<T[]> {
		const getJobsSchema = z.object({
			userId: z.string().min(1),
			company: z.string().min(2).optional(),
			role: z.string().min(2).optional(),
			modality: z.string().optional(),
			contract: z.string().optional(),
		})

		const filters = getJobsSchema.parse(input)
		const jobs = await this.jobRepository.find(filters)

		return jobs
	}
}
