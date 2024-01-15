import {
	Buildings,
	AddressBook,
	MapPin,
	CurrencyCircleDollar,
	Link as LinkURL,
} from '@phosphor-icons/react'

import { formatCurrency } from '../../../utils/formatCurrency'

type Props = {
	title: string
	status: string
	company: string
	contract: string
	modality: string
	salary: number
}

export function JobCard({ title, status, company, contract, modality, salary }: Props) {
	return (
		<div className="p-6 border border-black-border rounded-lg flex flex-col">
			<div className="flex justify-between items-center mb-7">
				<h3 className="font-semibold text-xl underline">
					<a
						href="#"
						className="block w-[280px] overflow-hidden overflow-ellipsis whitespace-nowrap">
						{title}
					</a>
				</h3>

				<span className="text-xs italic">{status}</span>
			</div>

			<div className="flex gap-3 mb-5">
				<span className="flex gap-1 items-center text-sm 2xl:w-[60%] w-[50%]">
					<Buildings size={14} color="#060606" />{' '}
					<span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
						Empresa: {company}
					</span>
				</span>
				<span className="flex gap-1 items-center text-sm">
					<AddressBook size={14} color="#060606" /> <span>Contrato: {contract}</span>
				</span>
			</div>

			<div className="flex gap-3 mb-7">
				<span className="flex gap-1 items-center text-sm 2xl:w-[60%] w-[50%]">
					<MapPin size={14} color="#060606" /> <span>Modalidade: {modality}</span>
				</span>
				<span className="flex gap-1 items-center text-sm">
					<CurrencyCircleDollar size={14} color="#060606" />{' '}
					<span>Salário: {formatCurrency(salary)}</span>
				</span>
			</div>

			<a
				className="bg-purple-primary px-[14px] py-2 text-white rounded-lg uppercase flex gap-3 self-start items-center hover:bg-purple-hover transition-colors"
				href="#">
				<LinkURL size={16} color="#FFF" />
				<span>Acessar vaga</span>
			</a>
		</div>
	)
}
