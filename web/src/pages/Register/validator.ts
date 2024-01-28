import { z } from 'zod'

export const createUserSchema = z
	.object({
		name: z.string().min(2, 'Deve conter pelo menos 2 caracteres'),
		email: z.string().email('Email inválido'),
		password: z
			.string()
			.min(8, 'Deve conter pelo menos 8 caracteres')
			.max(64, 'Deve conter no máximo 64 caracteres'),
		confirmPassword: z
			.string()
			.min(8, 'Deve conter pelo menos 8 caracteres')
			.max(64, 'Deve conter no máximo 64 caracteres'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})

export type CreateUserFields = z.infer<typeof createUserSchema>
