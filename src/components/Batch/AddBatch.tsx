"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputField,
  NumberField,
  Dropdown,
  DateField,
  ReactNumberField,
  AsyncDropdown,
} from "../Global/Form";
import {
  BatchType,
  MedicineType,
  OptionType,
  WholesalerType,
} from "@/interfaces";

import LoadingSpinner from "../Global/LoadingSpinner";
import { useState } from "react";
import { toast } from "sonner";
import { BatchFormData, batchSchema } from "@/schema/batchSchema";
import { useMedicines } from "@/hooks/inventory/useMedicine";
import { useWholesalers } from "@/hooks/inventory/useWholesalers";
import { useAddBatch } from "@/hooks/inventory/useBatch";
import { env } from "@/config/env";
import api from "@/lib/axios";
import { getErrorMessage } from "@/helper";

interface AddBatchFormProps {
  defaultValues?: Partial<BatchFormData>;
  onCancel: () => void;
  onSave: () => void;
}

export default function AddBatch({
  defaultValues,
  onCancel,
  onSave,
}: AddBatchFormProps) {
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
    defaultValues,
    resolver: zodResolver(batchSchema),
  });

  const addBatch = useAddBatch();

  // const medicine = Medicine?.results
  // const medicine_options = medicine?.map((m: MedicineType) => ({
  //   label: `${m.name} | ${m.generic_name}`,
  //   value: m.id ?? "",
  // }));
  const loadMedicineOptions = async (
    inputValue: string,
  ): Promise<OptionType<MedicineType>[]> => {
    const res = await api.get(`${inventoryAPI}/medicine-summary/`, {
      params: { search: inputValue },
    });

    return res.data.results.map((med: MedicineType) => ({
      label: `${med.name} ${med.generic_name && `| ${med.generic_name}`}  ${med.strength && `| ${med.strength}`} ${med.strength_unit && ` ${med.strength_unit}`} `,
      value: med.id,
    }));
  };

  const loadWholesalerOptions = async (
    inputValue: string,
  ): Promise<OptionType<MedicineType>[]> => {
    const res = await api.get(`${inventoryAPI}/wholesalers/`, {
      params: { name: inputValue },
    });

    return res.data.results.map((wholesale: WholesalerType) => ({
      label: wholesale.name,
      value: wholesale.id,
    }));
  };

  const onSubmit = async (data: BatchType) => {
    if (addBatch.isPending) {
      return;
    }

    addBatch.mutate(data, {
      onSuccess: () => {
        toast.success("Batch added successfully");
        onSave();
      },
      onError: (error: any) => {
        const message = getErrorMessage(error, "Batch was not added!");
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
      {addBatch.isPending && <LoadingSpinner />}
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
          />
        </div>

        <div className="w-70">
          <AsyncDropdown
            required={true}
            name="wholesaler"
            label="Wholesaler"
            control={control}
            loadOptions={loadWholesalerOptions}
            placeholder="Select a Wholesaler..."
            errors={errors}
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
          disabled={addBatch.isPending}
          className="px-5 py-1 cursor-pointer rounded-lg bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-blue-700 text-sm transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}
