import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

import { Routes } from './routes.tsx'
import { queryClient } from './lib/queryClient.ts'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Routes />
		</QueryClientProvider>
	</React.StrictMode>
)
