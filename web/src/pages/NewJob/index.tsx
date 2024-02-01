import {
	AddressBook,
	Briefcase,
	Buildings,
	CurrencyCircleDollar,
	MapPin,
	Link,
} from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link as LinkURL } from 'react-router-dom'

import { createJob } from './data'
import { createJobSchema, CreateJobFields } from './validator'

import { Select } from '../../components/Select'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'

export function NewJob() {
	const navigate = useNavigate()

	const { register, handleSubmit, formState } = useForm<CreateJobFields>({
		resolver: zodResolver(createJobSchema),
		mode: 'onChange',
	})

	const { mutateAsync: createJobFn, isPending } = useMutation({
		mutationFn: createJob,
	})

	async function handleCreateJob(data: CreateJobFields) {
		try {
			await createJobFn(data)
			navigate('/home')
		} catch (error) {
			console.log(error)
			alert('Erro ao cadastrar a candidatura!')
		}
	}

	const { errors } = formState

	return (
		<div className="mt-14">
			<ul className="flex gap-2 items-center text-xs">
				<li>
					<LinkURL to="/home" className="hover:underline">
						Home
					</LinkURL>
				</li>
				<li>&#707;</li>
				<li>Cadastrar candidatura</li>
			</ul>

			<form className="mt-14 w-[1000px]" onSubmit={handleSubmit(handleCreateJob)}>
				<h2 className="text-2xl font-title mb-10">Cadastrar nova candidatura</h2>

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

						<Select.Root {...register('modality')}>
							<Select.Trigger className="w-full">
								<Select.Icon>
									<MapPin />
								</Select.Icon>
								<Select.Value placeholder="Modalidade de trabalho" />
							</Select.Trigger>

							<Select.Items className="relative right-8 w-[320px]">
								{['Remoto', 'Presencial', 'Híbrido'].map((item) => (
									<Select.Item value={item} key={item} />
								))}
							</Select.Items>
						</Select.Root>
					</div>

					<div className="flex flex-col gap-4">
						<label className="text-lg">Tipo de Contrato</label>

						<Select.Root {...register('contract')}>
							<Select.Trigger className="w-full">
								<Select.Icon>
									<AddressBook />
								</Select.Icon>
								<Select.Value placeholder="Selecione o tipo do contrato" />
							</Select.Trigger>

							<Select.Items className="relative right-8 w-[320px]">
								{['CLT', 'PJ'].map((item) => (
									<Select.Item value={item} key={item} />
								))}
							</Select.Items>
						</Select.Root>
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

				<Button.Root type="submit" className="px-10" isLoading={isPending}>
					<Button.Text className="font-medium">Cadastrar</Button.Text>
				</Button.Root>
			</form>
		</div>
	)
}
