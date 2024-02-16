import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { UseFormRegisterReturn } from 'react-hook-form'
import { CaretDown, Check } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'

interface Props extends UseFormRegisterReturn {
	items: string[]
	icon?: React.ReactNode
	classNameValue?: string
	classNameItems?: string
	placeholder?: string
	defaultValue?: string
}

export const Select = forwardRef<HTMLButtonElement, Props>(
	(
		{
			items,
			icon,
			classNameValue,
			classNameItems,
			placeholder,
			name,
			onChange,
			defaultValue,
			...rest
		},
		ref
	) => {
		const defaultValueStyle =
			'flex items-center justify-between w-[16.5rem] border border-black-border rounded-sm px-[14px] py-[10px]'
		const valueStyle = twMerge(defaultValueStyle, classNameValue)

		return (
			<SelectPrimitive.Root
				defaultValue={defaultValue}
				name={name}
				onValueChange={(value) => onChange({ target: { name, value } })}
				{...rest}>
				<SelectPrimitive.Trigger className={valueStyle} ref={ref}>
					<div className="flex gap-2 items-center">
						{icon && <span className="text-xl text-[#2F2F2F]">{icon}</span>}

						<SelectPrimitive.Value placeholder={placeholder} className="text-[#2F2F2F]" />
					</div>

					<SelectPrimitive.Icon>
						<CaretDown size={16} color="#060606" weight="bold" />
					</SelectPrimitive.Icon>
				</SelectPrimitive.Trigger>

				<SelectPrimitive.Portal>
					<SelectPrimitive.Content
						className={twMerge('overflow-hidden bg-white p-2 shadow-lg', classNameItems)}>
						<SelectPrimitive.Viewport className="flex flex-col gap-2">
							{items.map((item) => (
								<SelectPrimitive.Item
									value={item}
									key={item}
									className="hover:bg-purple-hover hover:text-white transition-colors flex outline-none cursor-pointer p-2 items-center rounded-sm">
									<SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
									<SelectPrimitive.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
										<Check />
									</SelectPrimitive.ItemIndicator>
								</SelectPrimitive.Item>
							))}
						</SelectPrimitive.Viewport>
					</SelectPrimitive.Content>
				</SelectPrimitive.Portal>
			</SelectPrimitive.Root>
		)
	}
)
