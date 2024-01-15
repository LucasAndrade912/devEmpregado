import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

type Props = {
	value: string
	selectedValue?: string
}

export function Item({ value, selectedValue }: Props) {
	return (
		<label
			className="cursor-pointer text-xs w-20 py-[10px] rounded-full flex justify-center items-center transition-colors"
			style={{
				backgroundColor: selectedValue === value ? '#9E24D6' : '#D3D3D3',
				color: selectedValue === value ? '#FFF' : '#000',
				fontWeight: selectedValue === value ? '500' : '400',
			}}>
			{value}
			<RadioGroupPrimitive.Item value={value} />
		</label>
	)
}
