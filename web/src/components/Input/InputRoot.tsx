import { twMerge } from 'tailwind-merge'

type Props = {
	children: React.ReactNode[]
	className?: string
}

export function InputRoot({ children, className }: Props) {
	const defaultStyle = 'border border-black-border px-3 py-[10px] flex items-center gap-3 rounded'
	const style = twMerge(defaultStyle, className)

	return <div className={style}>{children}</div>
}
