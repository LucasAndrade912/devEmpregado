import { twMerge } from 'tailwind-merge'
import { ComponentProps, forwardRef } from 'react'

interface Props extends ComponentProps<'input'> {}

export const InputField = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
	return (
		<input
			className={twMerge('flex-1 placeholder:text-[#797979] outline-none', className)}
			{...props}
			ref={ref}
		/>
	)
})
