import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Register } from './pages/Register'
import { Login } from './pages/Login'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
])

export function Routes() {
	return <RouterProvider router={router} />
}
