import { useState } from 'react'

import { JobCard } from './components/JobCard'
import { RadioGroup } from './components/RadioGroup'

import { fakeJobs } from '../../utils/fakeData'
import { Select } from '../../components/Select'

type Modalities = 'Remoto' | 'Presencial' | 'Híbrido'
type Contracts = 'CLT' | 'PJ'

export function Home() {
	const [modality, setModality] = useState<Modalities>()
	const [contract, setContract] = useState<Contracts>()

	return (
		<div className="mt-[108px] flex">
			<div id="filters">
				<h2 className="text-2xl font-medium mb-10">Filtrar por:</h2>

				<div id="filters-fields" className="flex flex-col gap-7">
					<div className="input-field flex flex-col gap-[14px]">
						<p>Empresa</p>

						<Select.Root>
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

						<Select.Root>
							<Select.Trigger className="w-full">
								<Select.Value placeholder="Selecione o cargo" />
							</Select.Trigger>

							<Select.Items>
								{['Programador', 'Cibersegurança', 'Desenvolvedor Pleno', 'Estágio'].map((item) => (
									<Select.Item value={item} key={item} />
								))}
							</Select.Items>
						</Select.Root>
					</div>

					<div className="input-field flex flex-col gap-[14px]">
						<p>Modalidade</p>

						<RadioGroup
							values={['Remoto', 'Presencial', 'Híbrido']}
							selectedValue={modality}
							onSelect={(value) => setModality(value as Modalities)}
						/>
					</div>

					<div className="input-field flex flex-col gap-[14px]">
						<p>Tipo de contrato</p>

						<RadioGroup
							values={['CLT', 'PJ']}
							selectedValue={contract}
							onSelect={(value) => setContract(value as Contracts)}
						/>
					</div>
				</div>
			</div>

			<div className="divisor mx-16 h-[520px] w-px bg-[#b3b3b3]" />

			<main id="jobs" className="grid 2xl:grid-cols-3 grid-cols-2 2xl:gap-12 gap-7 w-full">
				{fakeJobs.map((job) => (
					<JobCard key={job.id} {...job} />
				))}
			</main>
		</div>
	)
}
