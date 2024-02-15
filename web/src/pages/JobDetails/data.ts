import { api } from '@lib/api'

type Response = {
	job: {
		_id: string,
		company: string,
		role: string,
		modality: string,
		contract: string,
		salary: number,
		status: string,
		job_url: string
	}
}

export async function deleteJob(jobId: string) {
	const token = localStorage.getItem('token') || ''

	await api.delete(`/jobs/${jobId}`, {
		headers: { Authorization: `Bearer ${token}` }
	})
}

export async function getJob(jobId: string) {
	const token = localStorage.getItem('token') || ''

	const { data } = await api.get<Response>(`/jobs/${jobId}`, {
		headers: { Authorization: `Bearer ${token}` }
	})

	return data
}
