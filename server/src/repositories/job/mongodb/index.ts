import { JobModel } from './model'
import { Job } from '../../../entities/job'
import { UserModel } from '../../user/mongodb/model'
import { JobRepository, Filters } from '../interface'

type JobContent = Job & { user: string }

export class MongoDBJobRepository implements JobRepository<JobContent> {
	async create(userId: string, newJob: Job): Promise<void> {
		const { _id, company, role, status } = await JobModel.create({
			...newJob,
			user: userId
		})

		await UserModel.updateOne(
			{ _id: userId },
			{ $push: { jobs: { _id, company, role, status } } }
		)
	}

	async find(filters: Filters): Promise<JobContent[]> {
		const filterList = { user: filters.userId, ...filters }
		const jobs = await JobModel.find({ ...filterList }) satisfies JobContent[]
		return jobs
	}

	async findById(jobId: string): Promise<JobContent> {
		const job = await JobModel.findById(jobId) satisfies JobContent | null

		if (!job) throw new Error('Job not found')

		return job
	}

	async update(jobId: string, job: Job): Promise<void> {
		await JobModel.updateOne(
			{ _id: jobId },
			{ ...job }
		)
	}

	async delete(jobId: string): Promise<void> {
		await JobModel.deleteOne({ _id: jobId })
	}
}
