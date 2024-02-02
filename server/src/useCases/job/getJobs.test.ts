import { GetJobs } from './getJobs'
import { CreateJob } from './createJob'
import { InMemoryJobRepository } from '../../repositories/job/inMemory'

const jobRepository = new InMemoryJobRepository()
const getJobsUseCase = new GetJobs(jobRepository)
const createJobUseCase = new CreateJob(jobRepository)
const userId = '1'

describe('GetJobs Use Case', () => {
	beforeAll(async () => {
		await createJobUseCase.execute({ userId, company: 'Google', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'CLT' })

		await createJobUseCase.execute({ userId, company: 'Google', role: 'Desenvolvedor Backend', job_url: 'http://github.com', status: 'Andamento', contract: 'CLT', salary: 8000 })

		await createJobUseCase.execute({ userId, company: 'Microsoft', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'PJ', salary: 9000, modality: 'Remoto' })

		await createJobUseCase.execute({ userId, company: 'VSoft', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'PJ', salary: 6000, modality: 'Remoto' })

		await createJobUseCase.execute({ userId, company: 'Rocketseat', role: 'Desenvolvedor Mobile', job_url: 'http://github.com', status: 'Andamento', modality: 'Presencial' })
	})

	it('should be able get all jobs', async () => {
		const jobs = await getJobsUseCase.execute({ userId })
		expect(jobs).toHaveLength(5)
	})

	it('should be able get all jobs when company is equal to "Google"', async () => {
		const jobs = await getJobsUseCase.execute({ userId, company: 'Google' })
		expect(jobs).toHaveLength(2)
	})

	it('should be able get all jobs when role is equal to "Desenvolvedor Mobile"', async () => {
		const jobs = await getJobsUseCase.execute({ userId, role: 'Desenvolvedor Mobile' })
		expect(jobs).toHaveLength(1)
	})

	it('should be able get all jobs when modality is equal to "Presencial"', async () => {
		const jobs = await getJobsUseCase.execute({ userId, modality: 'Presencial' })
		expect(jobs).toHaveLength(1)
	})

	it('should be able get all jobs when contract is equal to "PJ"', async () => {
		const jobs = await getJobsUseCase.execute({ userId, contract: 'PJ' })
		expect(jobs).toHaveLength(2)
	})

	it('should be able get all jobs when role is equal to "Desenvolvedor Full Stack" and contract is "CLT"', async () => {
		const jobs = await getJobsUseCase.execute({ userId, role: 'Desenvolvedor Full Stack', contract: 'CLT' })
		expect(jobs).toHaveLength(1)
	})

	it('should not be able get all jobs without user ID', async () => {
		await expect(getJobsUseCase.execute({ userId: '' })).rejects.toThrow()
	})
})
