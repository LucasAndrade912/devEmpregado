import { z } from 'zod'

export const loginUserSchema = z
	.object({
		email: z.string().email('Email inválido'),
		password: z
			.string()
			.min(8, 'Deve conter pelo menos 8 caracteres')
			.max(64, 'Deve conter no máximo 64 caracteres'),
	})

export type LoginUserFields = z.infer<typeof loginUserSchema>
