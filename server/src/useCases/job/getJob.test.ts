import { GetJob } from './getJob'
import { CreateJob } from './createJob'
import { InMemoryJobRepository } from '../../repositories/job/inMemory'

const jobRepository = new InMemoryJobRepository()
const getJobUseCase = new GetJob(jobRepository)
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

	it('should be able to get a specific job', async () => {
		const jobId = '5'
		await expect(getJobUseCase.execute({ userId, jobId })).resolves.not.toThrow()
		await expect(getJobUseCase.execute({ userId, jobId })).resolves.toMatchObject({ id: '5' })
	})

	it('should not be able to get a specific job if job ID not exists', async () => {
		const jobId = '100000'
		await expect(getJobUseCase.execute({ userId, jobId })).rejects.toThrow()
	})

	it('should not be able to get a specific job if it does not belong to the user', async () => {
		const jobId = '1'
		await expect(getJobUseCase.execute({ userId: '1000', jobId })).rejects.toThrow()
	})
})
