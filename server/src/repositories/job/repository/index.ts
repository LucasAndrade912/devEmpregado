import { JobModel } from '../model'
import { UserModel } from '../../user/mongodb/model'
import { Job } from '../../../entities/job'
import { IJobRepository } from './interface'

type JobList = Array<Job & { user: string }>

export class JobRepository implements IJobRepository {
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

	async find(userId: string): Promise<JobList> {
		const jobs = await JobModel.find({ user: userId }) satisfies JobList

		return jobs
	}

	async findById<Job>(jobId: string): Promise<Job> {
		const job = await JobModel.findById(jobId) satisfies Job | null

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
