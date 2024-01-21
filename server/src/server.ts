import express from 'express'
import mongoose from 'mongoose'

import { env } from './env'

const server = express()
const port = 3000 || env.PORT

mongoose.connect(env.MONGODB_DATABASE_URL)
	.then(() => {
		console.log('✅ Database connection established')

		server.listen(port, () => {
			console.log(`✨ Server listening on port ${port}`)
		})
	})
	.catch((error) => {
		console.log('❌ Database connection error', error)
	})
