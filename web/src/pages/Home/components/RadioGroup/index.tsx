import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { Item } from './Item'
import { useState } from 'react'

interface Props extends UseFormRegisterReturn {
	values: string[]
}

export const RadioGroup = forwardRef<HTMLDivElement, Props>(
	({ values, name, onChange }, ref) => {
		const [selectedValue, setSelectedValue] = useState('')

		return (
			<RadioGroupPrimitive.Root
				name={name}
				onValueChange={(value) => {
					onChange({ target: { name, value } })
					setSelectedValue(value)
				}}
				ref={ref}>
				<div className="flex gap-3">
					{values.map((value) => (
						<Item value={value} key={value} selectedValue={selectedValue} />
					))}
				</div>
			</RadioGroupPrimitive.Root>
		)
	}
)
