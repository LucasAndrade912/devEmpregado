import { Plus } from '@phosphor-icons/react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Button } from '../components/Button'

export function Layout() {
	const { pathname } = useLocation()

	return (
		<div className="px-14 py-16">
			<header className="flex justify-between">
				<h1 className="font-title text-5xl">
					<span className="font-title text-purple-secondary">(dev)</span>Empregado
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

			<Outlet />

			<footer className="text-sm font-medium mt-28 text-center">
				Feito por{' '}
				<a
					className="text-purple-primary underline"
					href="https://www.github.com/LucasAndrade912"
					target="_blank"
					rel="noreferrer">
					Lucas Andrade :D
				</a>
			</footer>
		</div>
	)
}
