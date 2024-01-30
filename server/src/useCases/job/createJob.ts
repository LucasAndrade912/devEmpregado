import { z } from 'zod'

import { JobRepository } from '../../repositories/job/interface'
import { Job } from '../../entities/job'

type Input = {
	userId: string
	company: string
	role: string
	modality?: string
	contract?: string
	salary?: number
	status: string
	job_url: string
}

export class CreateJob {
	constructor(private jobRepository: JobRepository) {}

	async execute(input: Input): Promise<void> {
		const createJobSchema = z.object({
			userId: z.string().min(1),
			company: z.string().min(2),
			role: z.string().min(2),
			modality: z.string().optional(),
			contract: z.string().optional(),
			salary: z.coerce.number().min(0).optional(),
			status: z.enum(['Andamento', 'Encerrada', 'Efetivado']),
			job_url: z.string().url()
		})

		const { userId, ...job } = createJobSchema.parse(input)
		const newJob = new Job(job)

		await this.jobRepository.create(userId, newJob)
	}
}
