import { twMerge } from 'tailwind-merge'
import * as SelectPrimitive from '@radix-ui/react-select'

type Props = {
	children: React.ReactNode
	className?: string
}

export function SelectItems({ children, className }: Props) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				className={twMerge('overflow-hidden bg-white p-2 shadow-lg', className)}>
				<SelectPrimitive.Viewport className="flex flex-col gap-2">
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}
