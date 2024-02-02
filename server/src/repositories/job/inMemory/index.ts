import { Job, JobProps } from '../../../entities/job'
import { Filters, JobRepository } from '../interface'

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

	async update(jobId: string, job: Job): Promise<void> {
		const [jobs] = Object.values(this.jobs)
		const [filteredJob] = jobs.filter(job => job.id === jobId)
		const { userId } = filteredJob

		const updatedJob = {
			id: jobId,
			userId,
			company: job.getCompany(),
			role: job.getRole(),
			modality: job.getModality(),
			contract: job.getContract(),
			salary: job.getSalary(),
			status: job.getStatus(),
			job_url: job.getJobUrl()
		}

		this.jobs[userId] = [...this.jobs[userId].filter(job => job.id !== jobId), updatedJob]
	}

	async delete(jobId: string): Promise<void> {
		const [jobs] = Object.values(this.jobs)
		const [filteredJob] = jobs.filter(job => job.id === jobId)
		const { userId } = filteredJob

		this.jobs[userId] = [...this.jobs[userId].filter(job => job.id !== jobId)]
	}
}
