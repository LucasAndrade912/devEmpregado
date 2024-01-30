import { CreateJob } from './createJob'
import { InMemoryJobRepository } from '../../repositories/job/inMemory'

const jobRepository = new InMemoryJobRepository()
const createJobUseCase = new CreateJob(jobRepository)

describe('CreateJob Use Case', () => {
	it('should be able to create a new job', async () => {
		const job = {
			userId: '1',
			company: 'Google',
			role: 'Desenvolvedor FullStack',
			modality: 'Remoto',
			contract: 'CLT',
			salary: 13000,
			status: 'Andamento',
			job_url: 'http://github.com/LucasAndrade912'
		}

		await expect(createJobUseCase.execute(job)).resolves.not.toThrow()
	})

	it('should be able to create a new job without optional props', async () => {
		const job = {
			userId: '1',
			company: 'Google',
			role: 'Desenvolvedor FullStack',
			status: 'Andamento',
			job_url: 'http://github.com/LucasAndrade912'
		}

		await expect(createJobUseCase.execute(job)).resolves.not.toThrow()
	})

	it('should not be able to create a new job without user ID', async () => {
		const job = {
			userId: '',
			company: 'Google',
			role: 'Desenvolvedor FullStack',
			status: 'Andamento',
			job_url: 'http://github.com/LucasAndrade912'
		}

		await expect(createJobUseCase.execute(job)).rejects.toThrow()
	})

	it('should not be able to create a new job without company', async () => {
		const job = {
			userId: '1',
			company: '',
			role: 'Desenvolvedor FullStack',
			status: 'Andamento',
			job_url: 'http://github.com/LucasAndrade912'
		}

		await expect(createJobUseCase.execute(job)).rejects.toThrow()
	})

	it('should not be able to create a new job without role', async () => {
		const job = {
			userId: '1',
			company: 'Google',
			role: '',
			status: 'Andamento',
			job_url: 'http://github.com/LucasAndrade912'
		}

		await expect(createJobUseCase.execute(job)).rejects.toThrow()
	})

	it('should not be able to create a new job without status', async () => {
		const job = {
			userId: '1',
			company: 'Google',
			role: 'Desenvolvedor FullStack',
			status: '',
			job_url: 'http://github.com/LucasAndrade912'
		}

		await expect(createJobUseCase.execute(job)).rejects.toThrow()
	})

	it('should not be able to create a new job with invalid job URL', async () => {
		const job = {
			userId: '1',
			company: 'Google',
			role: 'Desenvolvedor FullStack',
			status: 'Andamento',
			job_url: 'wroooong'
		}

		await expect(createJobUseCase.execute(job)).rejects.toThrow()
	})
})
