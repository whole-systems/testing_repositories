import { ChangeEvent, useState } from 'react';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ryed/ui';

interface VatPickerProps {
  value: number | ""
  onChange: (e: ChangeEvent<HTMLInputElement> | { target: { value: number | ""; name: string } }) => void
  error?: string
}

export function VatPicker({ value, onChange, error }: VatPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const numbers = Array.from({ length: 101 }, (_, i) => i)
  const filtered = numbers.filter((n) => n.toString().includes(search))

  return (
    <div className="w-full">
      <div className="text-lg font-semibold mb-2">VAT:</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="number"
            name="defaultVat"
            placeholder="0"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={(e) => {
              onChange(e)
              setSearch(e.target.value)
            }}
            className="w-full cursor-pointer"
            readOnly
            onClick={() => setOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="p-2 w-48">
          <Input
            placeholder="Search VAT"
            value={search}
            onChange={(e) => setSearch(e.target.value.replace(/[^0-9]/g, "").slice(0,3))}
            className="mb-2"
            autoFocus
          />
          <div className="max-h-40 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((num) => (
                <Button
                  key={num}
                  variant={num === Number(value) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onChange({ target: { value: num, name: "defaultVat" } })
                    setOpen(false)
                    setSearch(num.toString())
                  }}
                >
                  {num}
                </Button>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                No results
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <div>
        <span className="text-sm text-red-600">{error}</span>
      </div>
    </div>
  )
}
