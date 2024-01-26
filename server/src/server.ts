import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import { env } from './env'
import { Routes } from './routes'
import { Database } from './database'
import { MongoDrive } from './database/mongoDrive'

class App {
	private static server = express()
	private static port = 3000 || env.PORT
	private static routes = new Routes()

	static async start() {
		this.server.use(cors())
		this.server.use(express.json())
		this.server.use(App.routes.start())

		try {
			const mongoDriver = new MongoDrive()
			const db = new Database(env.MONGODB_DATABASE_URL, mongoDriver)
			await db.connect()

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
