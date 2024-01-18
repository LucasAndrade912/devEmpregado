import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ComponentProps<'input'> {}

export function InputField({ className, ...props }: Props) {
	return (
		<input
			className={twMerge('flex-1 placeholder:text-[#797979] outline-none', className)}
			{...props}
		/>
	)
}
