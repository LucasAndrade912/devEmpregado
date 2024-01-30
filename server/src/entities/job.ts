import { z } from 'zod'

export type JobProps = {
	company: string
	role: string
	modality?: string
	contract?: string
	salary?: number
	status: 'Andamento' | 'Encerrada' | 'Efetivado'
	job_url: string
}

export class Job {
	private company: string
	private role: string
	private modality: string | undefined
	private contract: string | undefined
	private salary: number | undefined
	private status: 'Andamento' | 'Encerrada' | 'Efetivado'
	private job_url: string

	constructor(props: JobProps) {
		const jobSchema = z.object({
			company: z.string(),
			role: z.string(),
			modality: z.string().optional(),
			contract: z.string().optional(),
			salary: z.number().min(1).optional(),
			status: z.enum(['Andamento', 'Encerrada', 'Efetivado']),
			job_url: z.string().url(),
		})

		const job = jobSchema.parse(props)

		this.company = job.company
		this.role = job.role
		this.modality = job.modality
		this.contract = job.contract
		this.salary = job.salary
		this.status = job.status
		this.job_url = job.job_url
	}

	getCompany(): string {
		return this.company
	}

	getRole(): string {
		return this.role
	}

	getModality(): string | undefined {
		return this.modality
	}

	getContract(): string | undefined {
		return this.contract
	}

	getSalary(): number | undefined {
		return this.salary
	}

	getStatus(): 'Andamento' | 'Encerrada' | 'Efetivado' {
		return this.status
	}

	getJobUrl(): string {
		return this.job_url
	}
}
