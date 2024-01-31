import { forwardRef } from 'react'

import { Input } from './Input'

type Props = {
	label: string
	required?: boolean
	type?: string
	placeholder?: string
	className?: string
	icon?: React.ReactNode
	error?: string
}

export const FormField = forwardRef<HTMLDivElement, Props>(
	(
		{
			label,
			required = true,
			type = 'text',
			placeholder,
			className,
			icon,
			error,
			...rest
		},
		ref
	) => {
		return (
			<div className="flex flex-col gap-4 mb-7" ref={ref}>
				<label htmlFor={label} className="text-lg">
					{label} {required && <span className="text-red-500">*</span>}
				</label>

				<Input.Root className={error && 'border-red-500'}>
					{icon && <Input.Icon>{icon}</Input.Icon>}

					<Input.Field
						id={label}
						type={type}
						placeholder={placeholder}
						className={className}
						{...rest}
					/>
				</Input.Root>

				{error && (
					<span className="w-full text-right italic text-sm text-red-500">{error}</span>
				)}
			</div>
		)
	}
)
