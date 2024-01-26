import { z } from 'zod'
import bcrypt from 'bcrypt'

import { Job } from './job'

const workFactor = 8

export interface UserProps {
	id: string
	name: string
	email: string
	password: string
	jobs?: Job[]
}

export class User {
	private id: string = ''
	private name: string
	private email: string
	private password: string
	private jobs: Job[] = []

	private constructor(name: string, email: string, password: string) {
		this.name = name
		this.email = email
		this.password = password
	}

	static async build(name: string, email: string, password: string) {
		const userSchema = z.object({
			name: z.string().min(2),
			email: z.string().email(),
			password: z.string().min(8).max(64)
		})

		const user = userSchema.parse({ name, email, password })
		const encryptPassword = await User.encryptPassword(user.password)

		return new User(user.name, user.email, encryptPassword)
	}

	private static async encryptPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(workFactor)
		const hash = await bcrypt.hash(password, salt)
		return hash
	}

	getId(): string {
		return this.id
	}

	getName(): string {
		return this.name
	}

	getEmail(): string {
		return this.email
	}

	getPassword(): string {
		return this.password
	}
}
