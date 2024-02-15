import { Job } from '@entities/job'

export type Filters = {
	userId: string
	company?: string
	role?: string
	modality?: string
	contract?: string
}

export type UpdateOptions = {
	company?: string
	role?: string
	modality?: string
	contract?: string
	salary?: number
	status?: 'Andamento' | 'Encerrada' | 'Efetivado'
	job_url?: string
}

export interface JobRepository<T = unknown> {
	create(userId: string, newJob: Job): Promise<void>
	find(filters: Filters): Promise<T[]>
	findById(userId: string, jobId: string): Promise<T>
	update(userId: string, jobId: string, options: UpdateOptions): Promise<void>
	delete(userId: string, jobId: string): Promise<void>
}
