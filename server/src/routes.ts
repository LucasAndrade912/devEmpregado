import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/auth'

import { LoginUserController } from '@controllers/loginUser'
import { RegisterUserController } from '@controllers/registerUser'
import { RefreshTokenController } from '@controllers/refreshToken'

import { GetJobController } from '@controllers/getJob'
import { GetJobsController } from '@controllers/getJobs'
import { CreateJobController } from '@controllers/createJob'
import { DeleteJobController } from '@controllers/deleteJob'
import { UpdateJobController } from '@controllers/updateJob'

export class Routes {
	private router = Router()

	start() {
		this.router.post('/register', RegisterUserController.handle)
		this.router.post('/login', LoginUserController.handle)
		this.router.get('/refresh-token', RefreshTokenController.handle)

		this.router.get('/jobs', AuthMiddleware.handle, GetJobsController.handle)
		this.router.get('/jobs/:jobId', AuthMiddleware.handle, GetJobController.handle)
		this.router.post('/jobs', AuthMiddleware.handle, CreateJobController.handle)
		this.router.patch('/jobs/:jobId', AuthMiddleware.handle, UpdateJobController.handle)
		this.router.delete('/jobs/:jobId', AuthMiddleware.handle, DeleteJobController.handle)

		return this.router
	}
}
