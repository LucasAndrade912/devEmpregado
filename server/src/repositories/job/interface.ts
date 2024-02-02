import { Job } from '../../entities/job'

export type Filters = {
	userId: string
	company?: string
	role?: string
	modality?: string
	contract?: string
}

export interface JobRepository<T = unknown> {
	create(userId: string, newJob: Job): Promise<void>
	find(filters: Filters): Promise<T[]>
	findById(jobId: string): Promise<T>
	update(jobId: string, job: Job): Promise<void>
	delete(jobId: string): Promise<void>
}
