/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select as CustomSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Select from "react-select";
import { CustomerResponse } from "@/types/customer";
import { LoanRequest } from "@/types/loan";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type LoanInfoFormProps = {
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  register: UseFormRegister<LoanRequest>;
  reset: UseFormReset<LoanRequest>;
  setValue: UseFormSetValue<LoanRequest>;
  getValues: UseFormGetValues<LoanRequest>;
  errors: FieldErrors<LoanRequest>;
  customerList: CustomerResponse[];
  control?: Control<LoanRequest>;
  watch: UseFormWatch<LoanRequest>;
  clearErrors: UseFormClearErrors<LoanRequest>;
  seletedCustomerName: string;
  isEditMode: boolean;
};

const LoanInfoForm = ({
  onNext,
  customerList,
  control,
  errors,
  register,
  watch,
  clearErrors,
  setValue,
  isEditMode,
}: LoanInfoFormProps) => {
  const loanCategory = watch("loanCategory");

  useEffect(() => {
    if (loanCategory === "WEEKLY" || loanCategory === "DAILY") {
      setValue("customerPreference", 0);
      clearErrors("customerPreference");
    }
  }, [loanCategory, setValue]);

  return (
    <div className="mt-10">
      <p className="relative text-2xl font-medium my-5 sm:hidden">
        {isEditMode ? "View" : "Add"} Loan
      </p>
      <form className="relative grid grid-cols-1 sm:grid-cols-2  gap-x-8 gap-y-3">
        <div className="relative">
          <Controller
            name="customerId"
            control={control}
            rules={{ required: "Customer is required" }}
            render={({ field }) => (
              <>
                <label className="form_label" htmlFor="customer">
                  Customer*
                </label>
                <Select
                  {...field}
                  id="customer"
                  value={field.value}
                  onChange={(newValue: any) => {
                    field.onChange(newValue);
                  }}
                  options={customerList}
                  isSearchable={true}
                  isClearable={true}
                  isDisabled={isEditMode}
                  className="relative font-medium outline-none rounded-md mt-[1.5rem]"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: "#f3f3f3",
                      background: "transparent",
                      color: "#fff",
                      padding: "6px",
                      outline: "none",
                      borderRadius: "6px",
                      cursor: state.isDisabled ? "not-allowed" : "default",
                    }),
                    option: (styles, state) => ({
                      ...styles,
                      backgroundColor: "#151c2c",
                      color: "#FFF",
                      borderColor: "#f3f3f3",
                      borderWidth: "1px",
                      cursor: state.isDisabled ? "not-allowed" : "default",
                      fontWeight: "normal",
                    }),
                    singleValue: (styles, state) => ({
                      ...styles,
                      color: state.isDisabled ? "#a5a5a5" : "#fff",
                    }),
                  }}
                />
              </>
            )}
          />
          <span className="relative text-red-600 font-medium mt-4 inline-block">
            {errors?.customerId &&
              (errors?.customerId?.message || "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="loanAmount">
            Loan Amount*
          </label>
          <input
            className="form_input"
            type="text"
            id="loanAmount"
            placeholder="Loan amount"
            {...register("loanAmount", {
              required: "Loan amount is required",
              pattern: {
                value: /^\d+(\.\d{1,5})?$/,
                message: "Please enter a valid loan amount",
              },
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.loanAmount &&
              (errors?.loanAmount?.message || "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="penaltyAmount">
            Penalty Amount*
          </label>
          <input
            className="form_input"
            type="text"
            id="penaltyAmount"
            placeholder="penalty amount"
            {...register("penaltyAmount", {
              required: "Penalty amount is required",
              pattern: {
                value: /^\d+(\.\d{1,5})?$/,
                message: "Please enter a valid penalty amount",
              },
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.penaltyAmount &&
              (errors?.penaltyAmount?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="interestAmount">
            Interest Amount*
          </label>
          <input
            className="form_input"
            type="text"
            id="interestAmount"
            placeholder="Interest amount"
            {...register("interestAmount", {
              required: "Interest amount is required",
              pattern: {
                value: /^\d+(\.\d{1,5})?$/,
                message: "Please enter a valid interest amount",
              },
            })}
            disabled={isEditMode}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.interestAmount &&
              (errors?.interestAmount?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="interestAmount">
            Loan Category*
          </label>
          <Controller
            name="loanCategory"
            control={control}
            rules={{ required: "Loan category is required" }}
            render={({ field }) => (
              <CustomSelect
                disabled={isEditMode}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="form_input bg-transparent h-full disabled:border-white disabled:opacity-80">
                  <SelectValue placeholder="Loan category" />
                </SelectTrigger>
                <SelectContent className="relative bg-primaryBg text-white cursor-pointer">
                  <SelectItem className="cursor-pointer" value="DAILY">
                    DAILY
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="WEEKLY">
                    WEEKLY
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="MONTHLY">
                    MONTHLY
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="TIME_TO_TIME">
                    TIME TO TIME
                  </SelectItem>
                </SelectContent>
              </CustomSelect>
            )}
          />

          <span className="relative text-red-600 font-medium mt-4 inline-block">
            {errors?.loanCategory &&
              (errors?.loanCategory?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        {(loanCategory === "MONTHLY" || loanCategory === "TIME_TO_TIME") && (
          <div className="form_container">
            <label className="form_label" htmlFor="customerPreference">
              Customer Preference
            </label>
            <input
              className="form_input"
              type="number"
              id="customerPreference"
              placeholder="Customer Preference"
              {...register("customerPreference", {
                required: "Customer Preference is required",
                pattern: {
                  value: /^\d{1,5}$/,
                  message: "Please enter a valid customer Preference",
                },
              })}
              disabled={isEditMode}
            />
            <span className="relative text-red-600 font-medium mt-2">
              {errors?.customerPreference &&
                (errors?.customerPreference?.message ||
                  "Please enter valid input data")}
            </span>
          </div>
        )}

        <div className="relative col-span-1 sm:col-span-2  mt-4 flex items-end">
          <button
            onClick={onNext}
            className="relative bg-orange-500 text-center ml-auto px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanInfoForm;
