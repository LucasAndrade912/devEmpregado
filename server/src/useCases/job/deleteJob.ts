import { z } from 'zod'

import { JobRepository } from '@repositories/job/interface'

type Input = {
	userId: string
	jobId: string
}

export class DeleteJob {
	constructor (private jobRepository: JobRepository) {}

	async execute(input: Input) {
		const deleteJobSchema = z.object({
			userId: z.string().min(1),
			jobId: z.string().min(1)
		})

		const { userId, jobId } = deleteJobSchema.parse(input)

		await this.jobRepository.delete(userId, jobId)
	}
}
