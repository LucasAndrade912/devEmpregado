import {
	Buildings,
	AddressBook,
	MapPin,
	CurrencyCircleDollar,
	Link as LinkURL,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { Button } from '@components/Button'
import { formatCurrency } from '@utils/formatCurrency'

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
		<div className="p-5 2xl:p-6 border border-black-border rounded-lg flex flex-col">
			<div className="flex justify-between items-center mb-7">
				<h3 className="font-semibold text-lg 2xl:text-xl underline">
					<Link
						to="jobs/1"
						className="block w-[280px] overflow-hidden overflow-ellipsis whitespace-nowrap">
						{title}
					</Link>
				</h3>

				<span className="text-xs italic">{status}</span>
			</div>

			<div className="flex gap-3 mb-5">
				<span className="flex gap-1 items-center text-xs 2xl:text-sm w-[50%]">
					<Buildings size={14} color="#060606" />{' '}
					<span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
						Empresa: {company}
					</span>
				</span>
				<span className="flex gap-1 items-center text-xs 2xl:text-sm">
					<AddressBook size={14} color="#060606" /> <span>Contrato: {contract}</span>
				</span>
			</div>

			<div className="flex gap-3 mb-7">
				<span className="flex gap-1 items-center text-xs 2xl:text-sm w-[50%]">
					<MapPin size={14} color="#060606" /> <span>Modalidade: {modality}</span>
				</span>
				<span className="flex gap-1 items-center text-xs 2xl:text-sm">
					<CurrencyCircleDollar size={14} color="#060606" />{' '}
					<span>Salário: {formatCurrency(salary)}</span>
				</span>
			</div>

			<Button.Root asChild className="self-start gap-2 2xl:gap-3 px-[14px] py-2">
				<a href="#">
					<Button.Icon>
						<LinkURL className="text-white text-sm 2xl:text-base" />
					</Button.Icon>
					<Button.Text className="text-sm 2xl:text-base">Acessar vaga</Button.Text>
				</a>
			</Button.Root>
		</div>
	)
}
