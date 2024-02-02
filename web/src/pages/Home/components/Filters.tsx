import { z } from 'zod'
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { Funnel } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Select } from '@components/Select'
import { Button } from '@components/Button'

import { RadioGroup } from './RadioGroup'

const filterJobsSchema = z.object({
	company: z.string().optional(),
	role: z.string().optional(),
	modality: z.string().optional(),
	contract: z.string().optional(),
})

export type FilterJobsFields = z.infer<typeof filterJobsSchema>

type Props = {
	onSubmit: (data: FilterJobsFields) => Promise<void>
}

export const Filters = forwardRef<HTMLFormElement, Props>(({ onSubmit }, ref) => {
	const { register, handleSubmit } = useForm<FilterJobsFields>({
		resolver: zodResolver(filterJobsSchema),
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} ref={ref}>
			<h2 className="text-2xl font-medium mb-10">Filtrar por:</h2>

			<div className="flex flex-col gap-7 mb-12">
				<div className="input-field flex flex-col gap-[14px]">
					<p>Empresa</p>

					<Select.Root {...register('company')}>
						<Select.Trigger className="w-full">
							<Select.Value placeholder="Selecione a empresa" />
						</Select.Trigger>

						<Select.Items>
							{['google', 'microsoft', 'apple', 'meta'].map((item) => (
								<Select.Item value={item} key={item} />
							))}
						</Select.Items>
					</Select.Root>
				</div>

				<div className="input-field flex flex-col gap-[14px]">
					<p>Cargo</p>

					<Select.Root {...register('role')}>
						<Select.Trigger className="w-full">
							<Select.Value placeholder="Selecione o cargo" />
						</Select.Trigger>

						<Select.Items>
							{['Programador', 'Cibersegurança', 'Desenvolvedor Pleno', 'Estágio'].map(
								(item) => (
									<Select.Item value={item} key={item} />
								)
							)}
						</Select.Items>
					</Select.Root>
				</div>

				<div className="input-field flex flex-col gap-[14px]">
					<p>Modalidade</p>

					<RadioGroup
						values={['Remoto', 'Presencial', 'Híbrido']}
						{...register('modality')}
					/>
				</div>

				<div className="input-field flex flex-col gap-[14px]">
					<p>Tipo de contrato</p>

					<RadioGroup values={['CLT', 'PJ']} {...register('contract')} />
				</div>
			</div>

			<Button.Root className="px-6 gap-2" type="submit">
				<Button.Icon className="text-sm">
					<Funnel />
				</Button.Icon>

				<Button.Text className="text-sm">Filtrar</Button.Text>
			</Button.Root>
		</form>
	)
})
