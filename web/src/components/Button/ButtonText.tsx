import { twMerge } from 'tailwind-merge'

type Props = {
	children: React.ReactNode
	className?: string
}

export function ButtonText({ children, className }: Props) {
	const defaultStyles = 'uppercase text-base'
	const styles = twMerge(defaultStyles, className)

	return <span className={styles}>{children}</span>
}
