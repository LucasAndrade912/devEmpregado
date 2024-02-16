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
	const token = localStorage.getItem('token') || ''

	await api.patch(`/jobs/${jobId}`, { status: 'Andamento', ...job }, {
		headers: { Authorization: `Bearer ${token}` }
	})
}
