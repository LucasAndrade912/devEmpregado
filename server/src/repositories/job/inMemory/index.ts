import { Job, JobProps } from '@entities/job'
import { Filters, JobRepository, UpdateOptions } from '../interface'

type JobContent = JobProps & { id: string, userId: string }
type Jobs = Record<string, Array<JobContent>>

export class InMemoryJobRepository implements JobRepository<JobContent> {
	private static INCREMENT_ID = 0

	private jobs: Jobs = {}

	async create(userId: string, newJob: Job): Promise<void> {
		const id = String(InMemoryJobRepository.INCREMENT_ID + 1)
		InMemoryJobRepository.INCREMENT_ID += 1

		const job = {
			id,
			userId,
			company: newJob.getCompany(),
			role: newJob.getRole(),
			modality: newJob.getModality(),
			contract: newJob.getContract(),
			salary: newJob.getSalary(),
			status: newJob.getStatus(),
			job_url: newJob.getJobUrl()
		}

		if (!this.jobs[userId]) this.jobs[userId] = []
		this.jobs[userId] = [...this.jobs[userId], job]
	}

	async find(filters: Filters): Promise<JobContent[]> {
		let jobs = this.jobs[filters.userId]
		if (filters.company) jobs = jobs.filter(job => job.company === filters.company)
		if (filters.role) jobs = jobs.filter(job => job.role === filters.role)
		if (filters.modality) jobs = jobs.filter(job => job.modality === filters.modality)
		if (filters.contract) jobs = jobs.filter(job => job.contract === filters.contract)

		return jobs
	}

	async findById(userId: string, jobId: string): Promise<JobContent> {
		const jobs = this.jobs[userId]
		const [job] = jobs.filter(job => job.id === jobId)

		if (!job) throw new Error('Job not found')

		return job
	}

	async update(userId: string, jobId: string, options: UpdateOptions): Promise<void> {
		let jobs = this.jobs[userId]
		if (!jobs) throw new Error('User not found')

		let updatedJob = jobs.find(job => job.id === jobId)
		if (!updatedJob) throw new Error('Job not found')

		updatedJob = {
			...updatedJob,
			company: options.company ?? updatedJob.company,
			job_url: options.job_url ?? updatedJob.job_url,
			role: options.role ?? updatedJob.role,
			status: options.status ?? updatedJob.status,
			contract: options.contract ?? updatedJob.contract,
			modality: options.modality ?? updatedJob.modality,
			salary: options.salary ?? updatedJob.salary
		}

		jobs = jobs.filter(job => job.id !== jobId)
		jobs.push(updatedJob)
		this.jobs[userId] = jobs
	}

	async delete(userId: string, jobId: string): Promise<void> {
		const jobs = this.jobs[userId]
		if (!jobs) throw new Error('User not found')

		const deletedJob = jobs.find(job => job.id === jobId)
		if (!deletedJob) throw new Error('Job not found')

		this.jobs[userId] = jobs.filter(job => job.id !== jobId)
	}
}
