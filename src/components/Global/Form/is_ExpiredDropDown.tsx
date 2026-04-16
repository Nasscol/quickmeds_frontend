"use client"
import { Controller, FieldErrors } from "react-hook-form";
import Select from 'react-select';

interface DropdownList {
  name: string;
  label: string;
  required?: boolean;
  register?: any;
  placeholder?: string;
  errors?: FieldErrors
  control?: any
  gender?: string | undefined;
  setGender?: (gender: string | undefined) => void;
  form?: boolean
  onSelect?: (value: boolean) => void | undefined
}



const IsExpiredDropDown = ({required, name, label, control, errors, form=false,  onSelect, placeholder = ""}: DropdownList) => {

      const error = errors?.[name]
      const options = [ 
        { label: "Expired", value: true }, 
        { label: "Not Expired", value: false } ];
    
  return (
     <div className={`relative ${form ? "pb-2" : ""} min-w-40`}>
      <label htmlFor={name} className="capitalize flex text-sm mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
                <Select
                  options={options ?? []}   
                  placeholder={placeholder}
                  onChange={(selectedOption: any) => {
                    const val = selectedOption?.value ?? null;
                    
                    onSelect?.(selectedOption?.value)

                    onChange(val);       
                  }}
                  isClearable
                  value={options?.find((option: any) => option.value === value) || null}
                />
          )}
        />

        {error && <p className="text-red-500 text-sm absolute bottom">{error.message?.toString()}</p>}
    </div>
  )
}

export default IsExpiredDropDown