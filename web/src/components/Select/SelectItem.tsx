import { Check } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'

type Props = {
	value: string
}

export function SelectItem({ value }: Props) {
	return (
		<SelectPrimitive.Item
			value={value}
			className="hover:bg-purple-hover hover:text-white transition-colors flex outline-none cursor-pointer p-2 items-center rounded-sm">
			<SelectPrimitive.ItemText>{value}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
				<Check />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	)
}
