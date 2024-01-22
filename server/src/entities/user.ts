import { z } from 'zod'
import bcrypt from 'bcrypt'

import { Job } from './job'

const workFactor = 8

export class User {
	private name: string
	private email: string
	private password: string
	private jobs: Job[] = []

	constructor(name: string, email: string, password: string) {
		const userSchema = z.object({
			name: z.string().min(2),
			email: z.string().email(),
			password: z.string().min(8).max(64)
		})

		const user = userSchema.parse({ name, email, password })

		this.name = user.name
		this.email = user.email

		this.encryptPassword(user.password)
			.then((encryptPassword) => this.password = encryptPassword)
			.catch(console.log)
	}

	private async encryptPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(workFactor)
		const hash = await bcrypt.hash(password, salt)
		return hash
	}
}
