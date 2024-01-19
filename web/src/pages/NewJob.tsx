import {
	AddressBook,
	Briefcase,
	Buildings,
	CurrencyCircleDollar,
	MapPin,
	Link,
} from '@phosphor-icons/react'
import { Link as LinkURL } from 'react-router-dom'

import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'

export function NewJob() {
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

			<form className="mt-14 w-[1000px]">
				<h2 className="text-2xl font-title mb-10">Cadastrar nova candidatura</h2>

				<div className="grid grid-cols-2 gap-14 w-full mb-12">
					<div className="flex flex-col gap-4">
						<label htmlFor="empresa" className="text-lg">
							Empresa <span className="text-red-500">*</span>
						</label>

						<Input.Root>
							<Input.Icon>
								<Buildings />
							</Input.Icon>

							<Input.Field id="empresa" type="text" placeholder="Empresa da candidatura" />
						</Input.Root>
					</div>

					<div className="flex flex-col gap-4">
						<label htmlFor="cargo" className="text-lg">
							Cargo <span className="text-red-500">*</span>
						</label>

						<Input.Root>
							<Input.Icon>
								<Briefcase />
							</Input.Icon>

							<Input.Field id="cargo" type="text" placeholder="Cargo da candidatura" />
						</Input.Root>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-8 mb-12">
					<div className="flex flex-col gap-4">
						<label className="text-lg">Modalidade</label>

						<Select.Root>
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

						<Select.Root>
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

					<div className="flex flex-col gap-4">
						<label htmlFor="salario" className="text-lg">
							Tipo de Contrato
						</label>

						<Input.Root>
							<Input.Icon>
								<CurrencyCircleDollar />
							</Input.Icon>

							<Input.Field
								id="salario"
								type="number"
								placeholder="Salário da vaga"
								className="min-w-0"
							/>
						</Input.Root>
					</div>
				</div>

				<div className="flex flex-col gap-4 mb-14">
					<label htmlFor="link" className="text-lg">
						Link da vaga <span className="text-red-500">*</span>
					</label>

					<Input.Root>
						<Input.Icon>
							<Link />
						</Input.Icon>

						<Input.Field id="link" type="url" placeholder="Link para acessar a vaga" />
					</Input.Root>
				</div>

				<Button.Root type="submit" className="px-10">
					<Button.Text>Cadastrar</Button.Text>
				</Button.Root>
			</form>
		</div>
	)
}
