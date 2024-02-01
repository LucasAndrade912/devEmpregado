import { z } from 'zod'

export const createJobSchema = z.object({
	company: z.string().min(3, 'Deve conter pelo menos 3 caracteres'),
	role: z.string().min(2, 'Deve conter pelo menos 2 caracteres'),
	modality: z.string().optional(),
	contract: z.string().optional(),
	salary: z.coerce.number().min(0).optional(),
	job_url: z.string().url('URL inválida')
})

export type CreateJobFields = z.infer<typeof createJobSchema>
