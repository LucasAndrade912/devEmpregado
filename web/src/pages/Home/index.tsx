import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'

import { Select } from './components/Select'
import { JobCard } from './components/JobCard'
import { RadioGroup } from './components/RadioGroup'

import { fakeJobs } from '../../utils/fakeData'

type Modalities = 'Remoto' | 'Presencial' | 'Híbrido'
type Contracts = 'CLT' | 'PJ'

export function Home() {
	const [modality, setModality] = useState<Modalities>()
	const [contract, setContract] = useState<Contracts>()

	return (
		<div className="px-14 py-16">
			<header className="flex justify-between">
				<h1 className="font-title text-5xl">
					<span className="font-title text-purple-secondary">(dev)</span>Empregado
				</h1>

				<button className="bg-purple-primary flex px-5 py-[14px] rounded-lg gap-[14px] items-center uppercase text-white hover:bg-purple-hover transition-colors">
					<Plus size={18} color="#FFF" />
					Cadastrar candidatura
				</button>
			</header>

			<div className="mt-[108px] flex">
				<div id="filters">
					<h2 className="text-2xl font-medium mb-10">Filtrar por:</h2>

					<div id="filters-fields" className="flex flex-col gap-7">
						<div className="input-field flex flex-col gap-[14px]">
							<p>Empresa</p>

							<Select
								items={['google', 'microsoft', 'apple', 'meta']}
								placeholder="Selecione a empresa"
							/>
						</div>

						<div className="input-field flex flex-col gap-[14px]">
							<p>Cargo</p>

							<Select
								items={['Programador', 'Cibersegurança', 'Desenvolvedor Pleno', 'Estágio']}
								placeholder="Selecione o cargo"
							/>
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
		</div>
	)
}
