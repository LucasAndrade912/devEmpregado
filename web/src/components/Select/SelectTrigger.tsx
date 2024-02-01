import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CaretDown } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'

type Props = {
	children?: React.ReactNode
	className?: string
}

export const SelectTrigger = forwardRef<HTMLButtonElement, Props>(
	({ className, children, ...rest }, ref) => {
		const defaultStyle =
			'flex items-center justify-between w-[16.5rem] border border-black-border rounded-sm px-[14px] py-[10px]'
		const style = twMerge(defaultStyle, className)

		return (
			<SelectPrimitive.Trigger className={style} ref={ref} {...rest}>
				<div className="flex items-center gap-3">{children}</div>

				<SelectPrimitive.Icon>
					<CaretDown size={16} color="#060606" weight="bold" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
		)
	}
)
