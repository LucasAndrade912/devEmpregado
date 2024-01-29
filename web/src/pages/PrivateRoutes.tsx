import { Plus } from '@phosphor-icons/react'
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { Button } from '../components/Button'

export function PrivateRoutes() {
	const { pathname } = useLocation()
	const auth = useAuth()

	if (!auth.token) return <Navigate to="/login" />

	return (
		<div className="px-14 py-16">
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
