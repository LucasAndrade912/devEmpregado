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
	await api.delete(`/jobs/${jobId}`)
}

export async function getJob(jobId: string) {
	const { data } = await api.get<Response>(`/jobs/${jobId}`)

	return data
}
