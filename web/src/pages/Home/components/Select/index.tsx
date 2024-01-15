import { CaretDown } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { Item } from './Item'

type Props = {
	items: string[]
	placeholder: string
	onSelect?: (selectedItem: string) => void
}

export function Select({ items, onSelect, placeholder }: Props) {
	return (
		<SelectPrimitive.Root onValueChange={onSelect}>
			<SelectPrimitive.Trigger className="flex items-center justify-between w-[16.5rem] border border-black-border rounded-sm px-[14px] py-[10px]">
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<CaretDown size={16} color="#060606" weight="bold" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content className="overflow-hidden bg-white p-2 shadow-lg">
					<SelectPrimitive.Viewport className="flex flex-col gap-2">
						{items.map((item) => (
							<Item value={item} key={item} />
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	)
}
