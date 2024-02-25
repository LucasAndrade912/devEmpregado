import { api } from '@lib/api'

import { FilterJobsFields } from './components/Filters'

type Job = {
	_id: string,
	company: string,
	role: string,
	modality: string,
	contract: string,
	salary: number,
	status: string,
	job_url: string
}

type Response = {
	jobs: Job[]
	companies: string[]
	roles: string[]
}

export async function getJobs(filters: FilterJobsFields): Promise<Response> {
	if (filters.company || filters.contract || filters.modality || filters.role) {
		const { company, role, modality, contract } = filters
		const options = Object.assign({},
			company && {company},
			role && {role},
			contract && {contract},
			modality && {modality}
		)

		const queryString = '?' + new URLSearchParams(options).toString()
		const { data } = await api.get<Response>(`/jobs${queryString}`)
		return data
	}

	const { data } = await api.get<Response>('/jobs')
	return data
}
