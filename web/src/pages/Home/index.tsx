import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getJobs } from './data'
import { JobCard } from './components/JobCard'
import { Filters } from './components/Filters'

export function Home() {
	const [searchParams] = useSearchParams()

	const company = searchParams.get('company') ?? ''
	const role = searchParams.get('role') ?? ''
	const modality = searchParams.get('modality') ?? ''
	const contract = searchParams.get('contract') ?? ''

	const { data, isLoading } = useQuery({
		queryKey: ['jobs', company, role, modality, contract],
		queryFn: () => getJobs({ company, role, modality, contract }),
	})

	return (
		<div className="mt-[108px] flex">
			<Filters companies={data?.companies ?? []} roles={data?.roles ?? []} />

			<div className="divisor mx-16 h-[520px] w-px bg-[#b3b3b3]" />

			<main
				id="jobs"
				className="grid items-start auto-rows-min 2xl:grid-cols-3 grid-cols-2 2xl:gap-12 gap-7 w-full">
				{!isLoading && data?.jobs.map((job) => <JobCard key={job._id} {...job} />)}
			</main>
		</div>
	)
}
