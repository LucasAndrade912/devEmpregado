import {
	AddressBook,
	Buildings,
	CurrencyCircleDollar,
	Link,
	MapPin,
	PencilSimple,
	Trash,
} from '@phosphor-icons/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link as LinkURL, useParams, useNavigate } from 'react-router-dom'

import { Button } from '@components/Button'
import { queryClient } from '@lib/queryClient'
import { formatCurrency } from '@utils/formatCurrency'
import { getJob, deleteJob } from './data'

export function JobDetails() {
	const { jobId } = useParams()
	const navigate = useNavigate()

	const { data } = useQuery({
		queryKey: ['jobDetails', jobId],
		queryFn: () => getJob(jobId as string),
	})

	const { mutateAsync: deleteJobFn, isPending } = useMutation({
		mutationFn: deleteJob,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jobs'] })
			queryClient.invalidateQueries({ queryKey: ['jobDetails', jobId] })
		},
	})

	async function handleDeleteJob() {
		try {
			await deleteJobFn(jobId as string)
			navigate('/home')
			alert('Job deletado com sucesso')
		} catch (error) {
			alert('Erro ao deletar Job')
		}
	}

	return (
		<div className="mt-14">
			<ul className="flex gap-2 items-center text-xs">
				<li>
					<LinkURL to="/home" className="hover:underline">
						Home
					</LinkURL>
				</li>
				<li>&#707;</li>
				<li>{data?.job.role}</li>
			</ul>

			<div>
				<h2 className="mb-10 mt-14 text-2xl font-title">{data?.job.role}</h2>

				<div className="grid grid-cols-[420px_1fr] gap-y-10 mb-14">
					<div className="flex gap-3 items-center">
						<Buildings size={24} />

						<span className="text-xl">Empresa: {data?.job.company}</span>
					</div>

					<div className="flex gap-3 items-center">
						<CurrencyCircleDollar size={24} />

						<span className="text-xl">
							Salário: {formatCurrency(data?.job.salary as number)}
						</span>
					</div>

					<div className="flex gap-3 items-center">
						<MapPin size={24} />
						<span className="text-xl">Modalidade: {data?.job.modality}</span>
					</div>

					<div className="flex gap-3 items-center">
						<AddressBook size={24} />

						<span className="text-xl">Tipo de Contrato: {data?.job.contract}</span>
					</div>
				</div>

				<div className="flex gap-8">
					<Button.Root className="px-[14px] py-2" asChild>
						<LinkURL to={data?.job.job_url as string} target="_blank">
							<Button.Icon>
								<Link />
							</Button.Icon>

							<Button.Text>Acessar vaga</Button.Text>
						</LinkURL>
					</Button.Root>

					<Button.Root
						className="px-[14px] py-2 bg-[#2F2F2F] transition-colors hover:bg-[#474747]"
						asChild>
						<LinkURL to="edit">
							<Button.Icon>
								<PencilSimple />
							</Button.Icon>

							<Button.Text>Editar vaga</Button.Text>
						</LinkURL>
					</Button.Root>

					<Button.Root
						className="px-[14px] py-2 bg-[#CD0000] transition-colors hover:bg-[#F01212]"
						onClick={handleDeleteJob}
						disabled={isPending}>
						<Button.Icon>
							<Trash />
						</Button.Icon>

						<Button.Text>Deletar vaga</Button.Text>
					</Button.Root>
				</div>
			</div>
		</div>
	)
}
