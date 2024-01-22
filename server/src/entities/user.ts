import { z } from 'zod'
import bcrypt from 'bcrypt'

const workFactor = 8

export class User {
	private _name: string
	private _email: string
	private _password: string

	constructor(name: string, email: string, password: string) {
		const userSchema = z.object({
			name: z.string().min(2),
			email: z.string().email(),
			password: z.string().min(8).max(64)
		})

		const user = userSchema.parse({ name, email, password })

		this._name = user.name
		this._email = user.email

		this.encryptPassword(user.password)
			.then((encryptPassword) => this._password = encryptPassword)
			.catch(console.log)
	}

	private async encryptPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(workFactor)
		const hash = await bcrypt.hash(password, salt)
		return hash
	}
}
