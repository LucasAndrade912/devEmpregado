import { z } from 'zod'

const envSchema = z.object({
	MONGODB_DATABASE_URL: z.string().url(),
	JWT_ACCESS_TOKEN_SECRET: z.string(),
	JWT_REFRESH_TOKEN_SECRET: z.string(),
	NODE_ENV: z.string(),
	PORT: z.string().optional()
})

export const env = envSchema.parse(process.env)
