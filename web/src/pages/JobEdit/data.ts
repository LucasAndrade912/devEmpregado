import { api } from '@lib/api'

type Job = {
	jobId: string
	company?: string
	role?: string
	modality?: string
	contract?: string
	salary?: number
	job_url?: string
}

export async function updateJob({ jobId, ...job }: Job) {

	await api.patch(`/jobs/${jobId}`, { status: 'Andamento', ...job })
}
