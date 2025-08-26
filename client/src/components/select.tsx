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

interface props {
    defaultLabel: string
    label: string;
    args: string[]
}

export function SelectComponent({ defaultLabel, label, args }: props) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{defaultLabel}</SelectLabel>
                    {args.map(arg => (
                        <SelectItem key={arg} value={arg}>{arg}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
