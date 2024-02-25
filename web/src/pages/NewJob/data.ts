import { api } from '../../lib/api'

type Job = {
	company: string
	role: string
	modality?: string
	contract?: string
	salary?: number
	job_url: string
}

export async function createJob(job: Job) {
	await api.post('/jobs', { status: 'Andamento', ...job })
}
