import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Register } from './pages/Register'
import { NewJob } from './pages/NewJob'
import { Layout } from './pages/Layout'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Register />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'home',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'new-job',
				element: <NewJob />,
			},
		],
	},
])

export function Routes() {
	return <RouterProvider router={router} />
}
