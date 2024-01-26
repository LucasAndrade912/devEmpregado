import mongoose from 'mongoose'

import { DatabaseDriver } from './driver'

export class MongoDrive implements DatabaseDriver {
	async connect(databaseURL: string): Promise<void> {
		await mongoose.connect(databaseURL)
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect()
	}
}
