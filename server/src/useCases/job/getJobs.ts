import { z } from 'zod'

import { JobProps } from '../../entities/job'
import { JobRepository } from '../../repositories/job/interface'

type Input = {
	userId: string
	company?: string
	role?: string
	modality?: string
	contract?: string
}

export class GetJobs {
	constructor(private jobRepository: JobRepository<JobProps>) {}

	async execute(input: Input): Promise<JobProps[]> {
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
