import { Job } from '../../entities/job'

export interface JobRepository<T = unknown> {
	create(userId: string, newJob: Job): Promise<void>
	find(userId: string): Promise<T[]>
	findById(jobId: string): Promise<T>
	update(jobId: string, job: Job): Promise<void>
	delete(jobId: string): Promise<void>
}