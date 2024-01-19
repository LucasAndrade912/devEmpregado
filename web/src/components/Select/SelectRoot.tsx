import * as SelectPrimitive from '@radix-ui/react-select'

type Props = {
	children: React.ReactNode[]
	defaultValue?: string
	onSelect?: (selectedItem: string) => void
}

export function SelectRoot({ children, onSelect, defaultValue }: Props) {
	return (
		<SelectPrimitive.Root defaultValue={defaultValue} onValueChange={onSelect}>
			{children}
		</SelectPrimitive.Root>
	)
}
