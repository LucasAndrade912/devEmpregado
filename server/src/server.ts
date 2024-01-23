import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { env } from './env'
import { Routes } from './routes'

class App {
	private static server = express()
	private static port = 3000 || env.PORT
	private static routes = new Routes()

	static async start() {
		this.server.use(cors())
		this.server.use(express.json())
		this.server.use(App.routes.start())

		try {
			await mongoose.connect(env.MONGODB_DATABASE_URL)

			console.log('✅ Database connection established')

			App.server.listen(App.port, () => {
				console.log(`✨ Server listening on port ${App.port}`)
			})
		} catch (error) {
			console.log('❌ Database connection error', error)
		}
	}
}

App.start()
