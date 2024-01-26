import { DatabaseDriver } from './driver'

export class Database {
	constructor(private databaseURL: string, private databaseDriver: DatabaseDriver) {}

	async connect(): Promise<void> {
		await this.databaseDriver.connect(this.databaseURL)
	}

	async disconnect(): Promise<void> {
		await this.databaseDriver.disconnect()
	}
}
