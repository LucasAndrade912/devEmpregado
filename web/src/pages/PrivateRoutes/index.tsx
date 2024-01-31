import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

export function PrivateRoutes() {
	const auth = useAuth()

	if (!auth.token) return <Navigate to="/login" />

	return (
		<div className="px-14 py-16">
			<Header />
			<Outlet />
			<Footer />
		</div>
	)
}
