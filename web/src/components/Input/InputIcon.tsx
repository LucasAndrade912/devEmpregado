import { twMerge } from 'tailwind-merge'
import { Slot } from '@radix-ui/react-slot'

type Props = {
	children: React.ReactNode
	className?: string
}

export function InputIcon({ children, className }: Props) {
	return <Slot className={twMerge('text-xl text-[#2F2F2F]', className)}>{children}</Slot>
}
