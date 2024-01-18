import { Slot } from '@radix-ui/react-slot'

type Props = {
	children: React.ReactNode
	className?: string
}

export function ButtonIcon({ children, className }: Props) {
	return <Slot className={className}>{children}</Slot>
}
