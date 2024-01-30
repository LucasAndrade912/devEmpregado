import { Job, JobProps } from '../../../entities/job'
import { JobRepository } from '../interface'

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

	async find(userId: string): Promise<JobContent[]> {
		return this.jobs[userId]
	}

	async findById(jobId: string): Promise<JobContent> {
		const [jobs] = Object.values(this.jobs)
		const [job] = jobs.filter(job => job.id === jobId)
		return job
	}

	async update(jobId: string, job: Job): Promise<void> {
		const { userId } = await this.findById(jobId)

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
		const { userId } = await this.findById(jobId)
		this.jobs[userId] = [...this.jobs[userId].filter(job => job.id !== jobId)]
	}
}
