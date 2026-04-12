"use client";

import { useUpdateBatch } from "@/hooks/inventory/useBatch";
import { useMedicines } from "@/hooks/inventory/useMedicine";
import { useWholesalers } from "@/hooks/inventory/useWholesalers";
import {
  BatchType,
  MedicineType,
  OptionType,
  WholesalerType,
} from "@/interfaces";
import { BatchFormData, batchSchema } from "@/schema/batchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AsyncDropdown,
  DateField,
  Dropdown,
  InputField,
  NumberField,
  ReactNumberField,
} from "../Global/Form";
import LoadingSpinner from "../Global/LoadingSpinner";
import { getErrorMessage } from "@/helper";
import api from "@/lib/axios";
import { env } from "@/config/env";

interface EditBatchFormProps {
  defaultValues?: Partial<BatchType>;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditBatch({
  defaultValues,
  onCancel,
  onSave,
}: EditBatchFormProps) {
  const [medicineName, setMedicineName] = useState<string | undefined>(
    undefined,
  );
  const [wholesalerName, setWholesalerName] = useState<string | undefined>(
    undefined,
  );
  const [ErrorMessage, ShowErrorMessage] = useState<boolean>(false);
  const inventoryAPI = env.inventoryApi;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BatchFormData>({
    defaultValues: {
      ...defaultValues,
      medicine: defaultValues?.medicine_details?.id,
      wholesaler: defaultValues?.wholesaler_details?.id,
      purchase_price: defaultValues?.purchase_price
        ? Number(defaultValues?.purchase_price)
        : undefined,
      selling_price_per_unit: defaultValues?.selling_price_per_unit
        ? Number(defaultValues?.selling_price_per_unit)
        : undefined,
    },
    resolver: zodResolver(batchSchema),
  });

  console.log("default values: ", defaultValues);

  const editBatch = useUpdateBatch();

  const { data: Medicine, isLoading: Medicine_loading } = useMedicines({
    search: medicineName,
  });
  const { data: Wholesaler, isLoading: Wholesaler_loading } = useWholesalers({
    name: wholesalerName,
  });

  const loadMedicineOptions = async (inputValue: string): Promise<OptionType<MedicineType>[]> => {
    const res = await api.get(`${inventoryAPI}/medicine-summary/`, { params: { search: inputValue },
    });

    return res.data.results.map((med: MedicineType) => ({
      label: `${med.name} ${med.generic_name && `| ${med.generic_name}`}  ${med.strength && `| ${med.strength}`} ${med.strength_unit && ` ${med.strength_unit}`} `,
      value: med.id,
    }));
  };
  
  const loadWholesalerOptions = async (inputValue: string): Promise<OptionType<WholesalerType>[]> => {
    const res = await api.get(`${inventoryAPI}/wholesalers/`, { params: { search: inputValue },
    });

    return res.data.results.map((wholesaler: WholesalerType) => ({
      label: wholesaler.name,
      value: wholesaler.id,
    }));
  };

  const defaultMedicineDropdownValues = {
    label: `${defaultValues?.medicine_details?.name} ${defaultValues?.medicine_details?.generic_name && `| ${defaultValues?.medicine_details?.generic_name}`}  ${defaultValues?.medicine_details?.strength && `| ${defaultValues?.medicine_details?.strength}`} ${defaultValues?.medicine_details?.strength_unit && ` ${defaultValues?.medicine_details?.strength_unit}`} `,
    value: defaultValues?.medicine_details?.id,
  }


  const defaultWholeSalerDropdownValues = {
    label: defaultValues?.wholesaler_details?.name,
    value: defaultValues?.wholesaler_details?.id,
  }

  const onSubmit = async (data: BatchType) => {
    if (editBatch.isPending) {
      return;
    }

    const updatedData = { ...data, id: defaultValues?.id };

    editBatch.mutate(updatedData, {
      onSuccess: () => {
        toast.success("Batch updated successfully");
        onSave();
      },
      onError: (error) => {
        const message = getErrorMessage(error, "Batch was not updated!");
        toast.error(<span style={{ whiteSpace: "pre-line" }}>{message}</span>);
        ShowErrorMessage(true);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative overflow-hidden flex flex-col gap-4 w-full mx-auto px-4 py-8 bg-white border rounded-lg shadow-sm "
    >
      {editBatch.isPending && <LoadingSpinner />}
      {ErrorMessage && (
        <p className="text-center text-red-500 text-sm absolute top-3 left-0 w-full">
          Sorry, something went wrong!
        </p>
      )}

      <div className="flex flex-row gap-x-5">
        <InputField
          label="Batch Number"
          name="batch_number"
          placeholder="Enter medicine name"
          register={register}
          errors={errors}
          required={true}
        />
        <div className="w-70">
          <AsyncDropdown
            required={true}
            name="medicine"
            label="Medicine"
            control={control}
            loadOptions={loadMedicineOptions}
            placeholder="Select Medicine..."
            errors={errors}
            defaultValues={defaultMedicineDropdownValues}
          />
        </div>

        <div className="w-70">
          <AsyncDropdown
            required={true}
            name="wholesaler"
            label="wholesaler"
            control={control}
            loadOptions={loadWholesalerOptions}
            placeholder="Select Wholesaler..."
            errors={errors}
            defaultValues={defaultWholeSalerDropdownValues}
          />
        </div>
      </div>

      <div className="flex flex-row gap-x-5">
        <ReactNumberField
          control={control}
          required={true}
          label="Purchase Price"
          name="purchase_price"
          placeholder="Enter Total Purchase Price"
          register={register}
          errors={errors}
        />
        <NumberField
          required={true}
          label="Quantity Received"
          name="quantity_received"
          placeholder="Enter Quantity received"
          register={register}
          errors={errors}
        />
        <ReactNumberField
          control={control}
          required={true}
          label="Selling Price Per Unit"
          name="selling_price_per_unit"
          placeholder="Enter Selling Price Per Unit"
          register={register}
          errors={errors}
        />
      </div>

      <DateField
        required={true}
        label="Expiry Date"
        name="expiry_date"
        placeholder="Enter Expiry Date"
        register={register}
        errors={errors}
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-1 cursor-pointer rounded-lg border bg-gray-100 hover:bg-gray-200 text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={editBatch.isPending}
          className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}
