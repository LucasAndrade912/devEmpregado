import { z } from 'zod'

type Props = {
	company: string
	role: string
	modality?: string
	contract?: string
	salary?: number
	status: 'Andamento' | 'Encerrada' | 'Efetivado'
	job_url: string
}

export class Job {
	private _company: string
	private _role: string
	private _modality: string | undefined | null
	private _contract: string | undefined | null
	private _salary: number | undefined | null
	private _status: 'Andamento' | 'Encerrada' | 'Efetivado'
	private _job_url: string

	constructor(props: Props) {
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

		this._company = job.company
		this._role = job.role
		this._modality = job.modality
		this._contract = job.contract
		this._salary = job.salary
		this._status = job.status
		this._job_url = job.job_url
	}
}
