import { twMerge } from 'tailwind-merge'
import { Slot } from '@radix-ui/react-slot'
import { ComponentProps, forwardRef } from 'react'

interface Props extends ComponentProps<'button'> {
	asChild?: boolean
}

export const ButtonRoot = forwardRef<HTMLButtonElement, Props>(
	({ asChild, className, ...props }, ref) => {
		const Component = asChild ? Slot : 'button'

		const defaultStyle =
			'bg-purple-primary flex px-5 py-[14px] rounded-lg gap-[14px] items-center justify-center text-white hover:bg-purple-hover transition-colors'

		const style = twMerge(defaultStyle, className)

		return <Component {...props} className={style} ref={ref} />
	}
)
