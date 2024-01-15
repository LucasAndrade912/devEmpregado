export function formatCurrency(value: number): string {
	const realFormat = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	})

	return realFormat.format(value)
}
