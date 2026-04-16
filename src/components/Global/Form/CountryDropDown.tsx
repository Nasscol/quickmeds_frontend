"use client"
import { useCountries } from '@/hooks/useCountries';
import { Controller, FieldErrors } from "react-hook-form";
import Select from 'react-select';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownList {
  name: string;
  label: string;
  required?: boolean;
  control: any
  register: any;
  isLoading?: boolean;
  placeholder?: string;
  errors?: FieldErrors
  onSearch?: (inputValue: string) => void;     // Fires every time the user types in the dropdown
  onSelect?: (id: string | null) => void;   // Fires when the user clicks an option
}

const CountryDropDown = ({required, name, label, control, errors, register, onSelect,  onSearch, placeholder = "Search..."}: DropdownList) => {

    const { data: countries = [], isLoading } = useCountries()
    const error = errors?.[name]
    
  return (
     <div className="relative pb-2">
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
                <Select
                  options={countries ?? []}   
                  placeholder={placeholder}
                  onChange={(selectedOption: any) => {
                    const val = selectedOption?.value ?? null;
                    
                    onChange(val);       
                  }}
                  isClearable
                  value={countries?.find((option: any) => option.value === value) || null}
                />
          )}
        />


        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}

export default CountryDropDown