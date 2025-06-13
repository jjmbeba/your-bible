import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { useBibles } from '@/queries/bible'
import { BibleSummary } from '@/types/responses'
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { CheckIcon, ChevronDownIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Select, SelectTrigger, SelectValue } from '../ui/select'

const BibleSelector = () => {
    const { data: bibles, isLoading: isLoadingBibles } = useBibles()
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const { bible: value } = getRouteApi('/bible').useSearch()

    if (isLoadingBibles) {
        return (
            <Select>
                <SelectTrigger disabled={isLoadingBibles} className="w-full sm:w-[200px]">
                    <Loader2 className='size-4 animate-spin' />
                    <SelectValue placeholder='Loading...' />
                </SelectTrigger>
            </Select>
        )
    }

    if (!bibles || bibles.length === 0) {
        return (
            <Select>
                <SelectTrigger disabled className="w-full sm:w-[200px]">
                    <SelectValue placeholder='No bibles available' />
                </SelectTrigger>
            </Select>
        )
    }

    return (
        <div className="w-full sm:w-auto">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="bg-background hover:bg-background border-input w-full sm:w-[200px] justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                    >
                        <span className={cn("truncate", !value && "text-muted-foreground")}>
                            {value
                                ? bibles.find((bible: BibleSummary) => bible.id === value)
                                    ?.name
                                : "Select bible"}
                        </span>
                        <ChevronDownIcon
                            size={16}
                            className="text-muted-foreground/80 shrink-0"
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="border-input w-[calc(100vw-2rem)] sm:w-[var(--radix-popper-anchor-width)] p-0"
                    align="start"
                >
                    <Command
                        filter={(value, search) => {
                            if (!search) return 1
                            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                        }}
                    >
                        <CommandInput placeholder="Search bible..." className="h-9" />
                        <CommandList className="max-h-[300px]">
                            <CommandEmpty>No bible found.</CommandEmpty>
                            <CommandGroup>
                                {bibles.map((bible: BibleSummary) => (
                                    <CommandItem
                                        key={bible.id}
                                        value={bible.name}
                                        onSelect={(currentValue) => {
                                            navigate({
                                                to: "/bible",
                                                search: {
                                                    bible: bible.id
                                                }
                                            })
                                            setOpen(false)
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {bible.name}
                                        {value === bible.id && (
                                            <CheckIcon size={16} className="ml-auto" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default BibleSelector