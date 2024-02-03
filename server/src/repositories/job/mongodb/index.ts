import { JobModel } from './model'
import { Job, JobProps } from '../../../entities/job'
import { UserModel } from '../../user/mongodb/model'
import { JobRepository, Filters } from '../interface'

type JobContent = JobProps & { user: string }

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
		const { userId, ...rest } = filters
		const filterList = { user: userId, ...rest }
		const jobs = await JobModel.find(
			{ ...filterList },
			{ user: false, __v: false }
		) satisfies JobContent[]

		return jobs
	}

	async findById(userId: string, jobId: string): Promise<JobContent> {
		const job = await JobModel.findOne(
			{ $and: [{ user: userId }, { _id: jobId }] },
			{ user: false, __v: false }
		) satisfies JobContent | null

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
