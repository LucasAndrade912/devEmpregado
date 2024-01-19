import { Slot } from '@radix-ui/react-slot'

type Props = {
	children: React.ReactNode
}

export function SelectIcon({ children }: Props) {
	return <Slot className="text-xl text-[#2F2F2F]">{children}</Slot>
}
