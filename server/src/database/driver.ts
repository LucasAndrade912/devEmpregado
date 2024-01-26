export interface DatabaseDriver {
	connect: (databaseURL: string) => Promise<void>
	disconnect: () => Promise<void>
}
