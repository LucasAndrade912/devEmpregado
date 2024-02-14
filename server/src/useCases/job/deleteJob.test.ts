import { DeleteJob } from './deleteJob'
import { CreateJob } from './createJob'
import { InMemoryJobRepository } from '@repositories/job/inMemory'

const jobRepository = new InMemoryJobRepository()
const deleteJobUseCase = new DeleteJob(jobRepository)
const createJobUseCase = new CreateJob(jobRepository)

describe('DeleteJob Use Case', () => {
	beforeAll(async () => {
		await createJobUseCase.execute({ userId: '1', company: 'Google', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'CLT' })

		await createJobUseCase.execute({ userId: '1', company: 'Google', role: 'Desenvolvedor Backend', job_url: 'http://github.com', status: 'Andamento', contract: 'CLT', salary: 8000 })

		await createJobUseCase.execute({ userId: '2', company: 'Microsoft', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'PJ', salary: 9000, modality: 'Remoto' })

		await createJobUseCase.execute({ userId: '2', company: 'VSoft', role: 'Desenvolvedor Full Stack', job_url: 'http://github.com', status: 'Andamento', contract: 'PJ', salary: 6000, modality: 'Remoto' })

		await createJobUseCase.execute({ userId: '3', company: 'Rocketseat', role: 'Desenvolvedor Mobile', job_url: 'http://github.com', status: 'Andamento', modality: 'Presencial' })
	})

	it('should be able to delete a job', async () => {
		const jobId = '1'
		const userId = '1'
		const result = deleteJobUseCase.execute({ userId, jobId })
		await expect(result).resolves.not.toThrow()
	})

	it('should not be able to delete a job if it not exists', async () => {
		const jobId = '10000'
		const userId = '1'
		const result = deleteJobUseCase.execute({ userId, jobId })
		await expect(result).rejects.toThrow()
	})

	it('should not be able to delete a job if user not exists', async () => {
		const jobId = '1'
		const userId = '10000000000'
		const result = deleteJobUseCase.execute({ userId, jobId })
		await expect(result).rejects.toThrow()
	})

	it('should not be able to delete a job if user does not have jobs', async () => {
		const userId = '3'
		const jobId = '5'

		let result = deleteJobUseCase.execute({ userId, jobId })
		await expect(result).resolves.not.toThrow()

		result = deleteJobUseCase.execute({ userId, jobId })
		await expect(result).rejects.toThrow()
	})
})
