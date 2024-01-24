import { z } from 'zod'

const envSchema = z.object({
	MONGODB_DATABASE_URL: z.string().url(),
	NODE_ENV: z.string(),
	PORT: z.string().optional()
})

export const env = envSchema.parse(process.env)
