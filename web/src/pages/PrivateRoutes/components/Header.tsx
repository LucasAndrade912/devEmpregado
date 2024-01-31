import { Plus } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '../../../components/Button'

export function Header() {
	const { pathname } = useLocation()

	return (
		<header className="flex justify-between">
			<h1 className="text-5xl">
				<Link to="/home" className="font-title">
					<span className="font-title text-purple-secondary">(dev)</span>Empregado
				</Link>
			</h1>

			{!pathname.includes('new-job') && (
				<Button.Root asChild>
					<Link to="new-job">
						<Button.Icon>
							<Plus size={18} color="#FFF" />
						</Button.Icon>

						<Button.Text>Cadastrar candidatura</Button.Text>
					</Link>
				</Button.Root>
			)}
		</header>
	)
}
