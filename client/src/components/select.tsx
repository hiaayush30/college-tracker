import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    defaultLabel: string
    label: string
    args: string[]
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export function SelectComponent({ defaultLabel, label, args, setValue, value }: Props) {
    return (
        <Select
            value={value} 
            onValueChange={(val) => setValue(val)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{defaultLabel}</SelectLabel>
                    {args.map((arg) => (
                        <SelectItem
                            key={arg}
                            value={arg}
                        >
                            {arg}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
