import { Router } from 'express'

import { LoginUserController } from './controllers/loginUser'
import { RegisterUserController } from './controllers/registerUser'

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

		this.router.post('/jobs', () => {
			console.log('Create new job')
		})

		this.router.put('/jobs/:jobId', () => {
			console.log('Update specified job')
		})

		this.router.delete('/jobs/:jobId', () => {
			console.log('Delete specified job')
		})

		return this.router
	}
}
