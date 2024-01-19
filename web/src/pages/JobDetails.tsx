import {
	AddressBook,
	Buildings,
	CurrencyCircleDollar,
	Link,
	MapPin,
	PencilSimple,
	Trash,
} from '@phosphor-icons/react'
import { Link as LinkURL } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'
import { Button } from '../components/Button'

export function JobDetails() {
	return (
		<div className="mt-14">
			<ul className="flex gap-2 items-center text-xs">
				<li>
					<LinkURL to="/home" className="hover:underline">
						Home
					</LinkURL>
				</li>
				<li>&#707;</li>
				<li>Programador Senior</li>
			</ul>

			<div>
				<h2 className="text-2xl font-title mb-10 mt-14">Programador Senior</h2>

				<div className="grid grid-cols-[420px_1fr] gap-y-10 mb-14">
					<div className="flex gap-3 items-center">
						<Buildings size={24} />

						<span className="text-xl">Empresa: Baires Dev</span>
					</div>

					<div className="flex gap-3 items-center">
						<CurrencyCircleDollar size={24} />

						<span className="text-xl">Salário: {formatCurrency(13000)}</span>
					</div>

					<div className="flex gap-3 items-center">
						<MapPin size={24} />
						<span className="text-xl">Modalidade: Presencial</span>
					</div>

					<div className="flex gap-3 items-center">
						<AddressBook size={24} />

						<span className="text-xl">Tipo de Contrato: CLT</span>
					</div>
				</div>

				<div className="flex gap-8">
					<Button.Root className="px-[14px] py-2" asChild>
						<LinkURL to="#" target="_blank">
							<Button.Icon>
								<Link />
							</Button.Icon>

							<Button.Text>Acessar vaga</Button.Text>
						</LinkURL>
					</Button.Root>

					<Button.Root
						className="px-[14px] py-2 bg-[#2F2F2F] transition-colors hover:bg-[#474747]"
						asChild>
						<LinkURL to="#" target="_blank">
							<Button.Icon>
								<PencilSimple />
							</Button.Icon>

							<Button.Text>Editar vaga</Button.Text>
						</LinkURL>
					</Button.Root>

					<Button.Root
						className="px-[14px] py-2 bg-[#CD0000] transition-colors hover:bg-[#F01212]"
						asChild>
						<LinkURL to="#" target="_blank">
							<Button.Icon>
								<Trash />
							</Button.Icon>

							<Button.Text>Deletar vaga</Button.Text>
						</LinkURL>
					</Button.Root>
				</div>
			</div>
		</div>
	)
}
