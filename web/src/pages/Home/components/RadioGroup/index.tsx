import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { Item } from './Item'

type Props = {
	values: string[]
	selectedValue?: string
	onSelect: (value: string) => void
}

export function RadioGroup({ values, selectedValue, onSelect }: Props) {
	return (
		<RadioGroupPrimitive.Root onValueChange={onSelect}>
			<div className="flex gap-3">
				{values.map((value) => (
					<Item value={value} selectedValue={selectedValue} key={value} />
				))}
			</div>
		</RadioGroupPrimitive.Root>
	)
}
