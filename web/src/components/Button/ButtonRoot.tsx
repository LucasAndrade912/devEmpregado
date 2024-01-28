import { twMerge } from 'tailwind-merge'
import { Slot } from '@radix-ui/react-slot'
import { Spinner } from '@phosphor-icons/react'
import { ComponentProps, forwardRef } from 'react'

interface Props extends ComponentProps<'button'> {
	asChild?: boolean
	isLoading?: boolean
}

export const ButtonRoot = forwardRef<HTMLButtonElement, Props>(
	({ asChild, className, isLoading = false, ...props }, ref) => {
		const Component = asChild ? Slot : 'button'

		const defaultStyle =
			'bg-purple-primary flex px-5 py-[14px] rounded-lg gap-[14px] items-center justify-center text-white hover:bg-purple-hover transition-colors'

		const style = twMerge(defaultStyle, className)

		if (isLoading) {
			return (
				<Component {...props} className={style} ref={ref}>
					<Spinner className="animate-spin text-2xl" />
				</Component>
			)
		}

		return <Component {...props} className={style} ref={ref} />
	}
)
