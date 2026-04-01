"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ResidentSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [residents, setResidents] = useState<Resident[]>([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const { data } = await supabase
        .from("residents")
        .select("id, first_name, last_name")
        .order("first_name");

      setResidents(data || []);
    };

    fetchResidents();
  }, []);

  const selected = residents.find((r) => r.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
        >
          {selected
            ? `${selected.first_name} ${selected.last_name}`
            : "Select Resident"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search resident..." />

          <CommandEmpty>No resident found.</CommandEmpty>

          <CommandGroup>
            {residents.map((r) => (
              <CommandItem
                key={r.id}
                value={`${r.first_name} ${r.last_name}`}
                onSelect={() => {
                  onChange(r.id);
                  setOpen(false);
                }}
              >
                {r.first_name} {r.last_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}