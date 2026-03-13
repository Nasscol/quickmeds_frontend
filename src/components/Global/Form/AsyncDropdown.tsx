"use client";

import { OptionType } from "@/interfaces";
import { Control, Controller, FieldErrors, useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";



type Props<T> = {
  loadOptions: (searchQuery: string) => Promise<OptionType<T>[]>;
  onSelect?: (data: any | null) => void;
  placeholder?: string;
  name: string;
  errors?: FieldErrors
  label?: string 
  required?: boolean
  control: Control<any>
};

export function AsyncDropdown<T>({ loadOptions, name, placeholder, errors, label, required, control, onSelect }: Props<T>) {
    const error = errors?.[name]

  return (
    <div className="relative pb-2 min-w-50">

        <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label> 


    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
          <AsyncSelect<OptionType<T>>
            defaultOptions
            loadOptions={loadOptions}
            getOptionLabel={(opt) => opt.label}
            getOptionValue={(opt) => String(opt.value)}
            onChange={(opt) => {field.onChange(opt ?? null); onSelect?.(opt?.data)}}
            value={field.value ?? null}
            placeholder={placeholder ?? "Search..."}
            isClearable
          />
        
      )}
    />

     {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}

    </div>
  )
}