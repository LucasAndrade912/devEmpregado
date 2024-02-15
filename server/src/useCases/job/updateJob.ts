import { z } from 'zod'

import { JobRepository, UpdateOptions } from '@repositories/job/interface'

type Input = {
	userId: string
	jobId: string
	company?: string
	role?: string
	modality?: string
	contract?: string
	salary?: number
	status?: string
	job_url?: string
}

export class UpdateJob {
	constructor(private jobRepository: JobRepository) {}

	async execute(input: Input): Promise<void> {
		const updateJobSchema = z.object({
			userId: z.string().min(1),
			jobId: z.string().min(1),
			company: z.string().min(2).optional(),
			role: z.string().min(2).optional(),
			modality: z.string().optional(),
			contract: z.string().optional(),
			salary: z.coerce.number().min(0).optional(),
			status: z.string().optional(),
			job_url: z.string().url().optional()
		})

		const { userId, jobId, ...job } = updateJobSchema.parse(input)

		if (job.status &&
			job.status !== 'Andamento' &&
			job.status !== 'Encerrada' &&
			job.status !== 'Efetivado'
		) throw new Error('Job status must be "Andamento" or "Encerrada" or "Efetivado"')

		await this.jobRepository.update(userId, jobId, job as UpdateOptions)
	}
}
