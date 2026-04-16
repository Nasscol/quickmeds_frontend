"use client"
import { Controller, FieldErrors } from "react-hook-form";
import Select from 'react-select';

interface DropdownOption {
  label: string;
  value: string | boolean;
}

interface DropdownList {
  defaultValue?: DropdownOption | null
  name: string;
  label: string;
  required?: boolean;
  control: any
  options: DropdownOption[];
  isLoading?: boolean;
  placeholder?: string;
  searchField?: boolean;
  errors?: FieldErrors
  onSearch?: (inputValue: string) => void;     // Fires every time the user types in the dropdown
  onSelect?: (data: any) => void;   // Fires when the user clicks an option
}


export default function Dropdown({searchField = false, options, required, name, label, control, errors, onSelect, defaultValue, onSearch,  isLoading = false, placeholder = "Search..."}: DropdownList) {
  const error = errors?.[name]
  
  return (
    <div className={`${searchField ? "" : "pb-2"} relative min-w-50`}>

        <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label> 
         
        <Controller
        name={name}
        control={control}
        render={({ field }) => (

           <Select
            {...field}
            options={options}
            placeholder={placeholder}
            onChange={(selected) => {field.onChange(selected); onSelect?.(selected.value)}}
            value={field.value ?? null}
            isClearable
          />

          )}
        />

        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}

    </div>
  );
}