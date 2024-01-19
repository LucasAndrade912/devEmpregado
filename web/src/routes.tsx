import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { JobDetails } from './pages/JobDetails'
import { Register } from './pages/Register'
import { JobEdit } from './pages/JobEdit'
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
			{
				path: 'jobs/:jobId',
				element: <JobDetails />,
			},
			{
				path: 'jobs/:jobId/edit',
				element: <JobEdit />,
			},
		],
	},
])

export function Routes() {
	return <RouterProvider router={router} />
}
