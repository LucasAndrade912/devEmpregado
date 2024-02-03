import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { UseFormRegisterReturn } from 'react-hook-form'
import * as SelectPrimitive from '@radix-ui/react-select'

interface Props extends UseFormRegisterReturn {
	children: React.ReactNode[]
}

export const SelectRoot = forwardRef<HTMLButtonElement, Props>(
	({ children, onChange, name, ...rest }, ref) => {
		return (
			<SelectPrimitive.Root
				name={name}
				onValueChange={(value) => onChange({ target: { name, value } })}
				{...rest}>
				<Slot ref={ref}>{children[0]}</Slot>

				{children.slice(1)}
			</SelectPrimitive.Root>
		)
	}
)
