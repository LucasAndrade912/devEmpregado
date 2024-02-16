import { z } from 'zod'

export const updateJobSchema = z.object({
	company: z.string().min(3, 'Deve conter pelo menos 3 caracteres').optional(),
	role: z.string().min(2, 'Deve conter pelo menos 2 caracteres').optional(),
	modality: z.string().optional(),
	contract: z.string().optional(),
	salary: z.coerce.number().min(0).optional(),
	job_url: z.string().url('URL inválida').optional()
})

export type UpdateJobFields = z.infer<typeof updateJobSchema>
