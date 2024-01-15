import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/home',
		element: <Home />,
	},
])

export function Routes() {
	return <RouterProvider router={router} />
}
