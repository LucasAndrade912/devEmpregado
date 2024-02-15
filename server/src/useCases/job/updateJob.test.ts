import { CreateJob } from './createJob'
import { UpdateJob } from './updateJob'
import { InMemoryJobRepository } from '@repositories/job/inMemory'

const jobRepository = new InMemoryJobRepository()
const updateJobUseCase = new UpdateJob(jobRepository)
const createJobUseCase = new CreateJob(jobRepository)

describe('UpdateJob Use Case', () => {
	beforeAll(async () => {
		await createJobUseCase.execute({ userId: '1', company: 'Google', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'CLT' })

		await createJobUseCase.execute({ userId: '1', company: 'Google', role: 'Desenvolvedor Backend', job_url: 'http://github.com', status: 'Andamento', contract: 'CLT', salary: 8000 })

		await createJobUseCase.execute({ userId: '2', company: 'Microsoft', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'PJ', salary: 9000, modality: 'Remoto' })

		await createJobUseCase.execute({ userId: '2', company: 'VSoft', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'PJ', salary: 6000, modality: 'Remoto' })

		await createJobUseCase.execute({ userId: '3', company: 'Rocketseat', role: 'Desenvolvedor Mobile', job_url: 'http://github.com', status: 'Andamento', modality: 'Presencial' })
	})

	it('should be able to update a job', async () => {
		const jobId = '1'
		const userId = '1'
		const job = { salary: 5000, job_url: 'https://google.com' }

		const result = updateJobUseCase.execute({ jobId, userId, ...job })

		await expect(result).resolves.not.toThrow()
	})

	it('should not be able to update a job if it not exists', async () => {
		const jobId = '1000000'
		const userId = '1'
		const job = { salary: 5000, job_url: 'https://google.com' }

		const result = updateJobUseCase.execute({ jobId, userId, ...job })

		await expect(result).rejects.toThrow()
	})

	it('should not be able to delete a job if user not exists', async () => {
		const jobId = '1'
		const userId = '100000000'
		const job = { salary: 5000, job_url: 'https://google.com' }

		const result = updateJobUseCase.execute({ jobId, userId, ...job })

		await expect(result).rejects.toThrow()
	})
})
