import {
	AddressBook,
	Briefcase,
	Buildings,
	CurrencyCircleDollar,
	MapPin,
	Link,
} from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link as LinkURL, useNavigate, useParams } from 'react-router-dom'

import { Select } from '@components/Select'
import { Button } from '@components/Button'
import { FormField } from '@components/FormField'
import { getJob } from '@pages/JobDetails/data'

import { queryClient } from '@lib/queryClient'

import { updateJob } from './data'
import { updateJobSchema, UpdateJobFields } from './validator'

export function JobEdit() {
	const jobId = useParams().jobId as string
	const navigate = useNavigate()

	const { data } = useQuery({
		queryKey: ['jobDetails', jobId],
		queryFn: () => getJob(jobId as string),
	})

	const { mutateAsync: updateJobFn, isPending } = useMutation({
		mutationFn: updateJob,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['jobs'] })
			queryClient.invalidateQueries({ queryKey: ['jobDetails', jobId] })
		},
	})

	const { register, formState, handleSubmit } = useForm<UpdateJobFields>({
		resolver: zodResolver(updateJobSchema),
		mode: 'onChange',
		defaultValues: {
			company: data?.job.company,
			role: data?.job.role,
			salary: data?.job.salary,
			job_url: data?.job.job_url,
		},
	})

	const { errors } = formState

	const handleUpdateJob = handleSubmit(async (data: UpdateJobFields) => {
		try {
			await updateJobFn({ jobId, ...data })
			alert('Atualização feita com sucesso')
			navigate(`/home/jobs/${jobId}`)
		} catch (error) {
			alert('Não foi possível atualizar o Job')
		}
	})

	return (
		<div className="mt-14">
			<ul className="flex gap-2 items-center text-xs">
				<li>
					<LinkURL to="/home" className="hover:underline">
						Home
					</LinkURL>
				</li>
				<li>&#707;</li>
				<li>
					<LinkURL to={`/home/jobs/${jobId}`} className="hover:underline">
						{data?.job.role}
					</LinkURL>
				</li>
				<li>&#707;</li>
				<li>Editar</li>
			</ul>

			<form className="mt-14 w-[1000px]" onSubmit={handleUpdateJob}>
				<h2 className="text-2xl font-title mb-10">Atualizar candidatura</h2>

				<div className="grid grid-cols-2 gap-14 w-full mb-12">
					<FormField
						label="Empresa"
						placeholder="Empresa da candidatura"
						icon={<Buildings className={errors.company && 'text-red-500'} />}
						error={errors.company?.message}
						{...register('company')}
					/>

					<FormField
						label="Cargo"
						placeholder="Cargo da candidatura"
						icon={<Briefcase className={errors.role && 'text-red-500'} />}
						error={errors.role?.message}
						{...register('role')}
					/>
				</div>

				<div className="grid grid-cols-3 gap-8 mb-12">
					<div className="flex flex-col gap-4">
						<label className="text-lg">Modalidade</label>

						<Select
							items={['Remoto', 'Presencial', 'Híbrido']}
							icon={<MapPin />}
							defaultValue={data?.job.modality}
							classNameValue="w-full"
							classNameItems="relative right-8 w-[320px]"
							placeholder="Modalidade de trabalho"
							{...register('modality')}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<label className="text-lg">Tipo de Contrato</label>

						<Select
							items={['CLT', 'PJ']}
							icon={<AddressBook />}
							defaultValue={data?.job.contract}
							classNameValue="w-full"
							classNameItems="relative right-8 w-[320px]"
							placeholder="Selecione o tipo do contrato"
							{...register('contract')}
						/>
					</div>

					<FormField
						label="Salário"
						placeholder="Salário da vaga"
						icon={<CurrencyCircleDollar className={errors.salary && 'text-red-500'} />}
						error={errors.salary?.message}
						className="min-w-0"
						{...register('salary')}
					/>
				</div>

				<FormField
					label="Link da vaga"
					placeholder="Link para acessar a vaga"
					icon={<Link className={errors.job_url && 'text-red-500'} />}
					type="url"
					error={errors.job_url?.message}
					{...register('job_url')}
				/>

				<Button.Root type="submit" className="px-10" disabled={isPending}>
					<Button.Text className="font-medium">Atualizar</Button.Text>
				</Button.Root>
			</form>
		</div>
	)
}
