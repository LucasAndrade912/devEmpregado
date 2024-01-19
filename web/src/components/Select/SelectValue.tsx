import * as SelectPrimitive from '@radix-ui/react-select'

type Props = {
	placeholder: string
}

export function SelectValue({ placeholder }: Props) {
	return <SelectPrimitive.Value placeholder={placeholder} className="text-[#2F2F2F]" />
}
