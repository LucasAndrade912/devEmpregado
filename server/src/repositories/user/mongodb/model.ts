import { Schema, model } from 'mongoose'

export const UserModel = model('User', new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 8
	},
	jobs: {
		type: [{
			_id: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Job'
			},
			company: {
				type: String,
				required: true
			},
			role: {
				type: String,
				required: true
			},
			status: {
				type: String,
				required: true,
				enum: ['Andamento', 'Encerrada', 'Efetivado']
			}
		}]
	}
}))
