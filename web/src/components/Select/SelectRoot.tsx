import * as SelectPrimitive from '@radix-ui/react-select'

type Props = {
	children: React.ReactNode[]
	onSelect?: (selectedItem: string) => void
}

export function SelectRoot({ children, onSelect }: Props) {
	return <SelectPrimitive.Root onValueChange={onSelect}>{children}</SelectPrimitive.Root>
}
