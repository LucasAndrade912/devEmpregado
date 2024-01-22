import { Schema, model } from 'mongoose'

export const JobModel = model('Job', new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	company: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	modality: String,
	contract: String,
	salary: {
		type: Number,
		min: 1
	},
	status: {
		type: String,
		required: true,
		enum: ['Andamento', 'Encerrada', 'Efetivado'],
		default: 'Andamento'
	},
	job_url: {
		type: String,
		required: true
	}
}))
