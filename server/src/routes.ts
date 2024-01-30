import { Router } from 'express'

import { AuthMiddleware } from './middlewares/auth'

import { LoginUserController } from './controllers/loginUser'
import { RegisterUserController } from './controllers/registerUser'

import { CreateJobController } from './controllers/createJob'

export class Routes {
	private router = Router()

	start() {
		this.router.post('/register', RegisterUserController.handle)
		this.router.post('/login', LoginUserController.handle)

		this.router.get('/jobs', () => {
			console.log('Get all jobs')
		})

		this.router.get('/jobs/:jobId', () => {
			console.log('Get specified job')
		})

		this.router.post('/jobs', AuthMiddleware.handle, CreateJobController.handle)

		this.router.put('/jobs/:jobId', () => {
			console.log('Update specified job')
		})

		this.router.delete('/jobs/:jobId', () => {
			console.log('Delete specified job')
		})

		return this.router
	}
}
