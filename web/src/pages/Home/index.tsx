import { fakeJobs } from '@utils/fakeData'

import { JobCard } from './components/JobCard'
import { FilterJobsFields, Filters } from './components/Filters'

export function Home() {
	async function handleFilterJobs(data: FilterJobsFields) {
		console.log(data)
	}

	return (
		<div className="mt-[108px] flex">
			<Filters onSubmit={handleFilterJobs} />

			<div className="divisor mx-16 h-[520px] w-px bg-[#b3b3b3]" />

			<main
				id="jobs"
				className="grid 2xl:grid-cols-3 grid-cols-2 2xl:gap-12 gap-7 w-full">
				{fakeJobs.map((job) => (
					<JobCard key={job.id} {...job} />
				))}
			</main>
		</div>
	)
}
