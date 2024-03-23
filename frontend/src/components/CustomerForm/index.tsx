import { CustomerRequest } from "@/types/customer";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type CustomerFormProps = {
  onNext: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  register: UseFormRegister<CustomerRequest>;
  errors: FieldErrors<CustomerRequest>;
  isEditMode: boolean;
};

const EMAIL_REGREX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CustomerForm = ({
  onNext,
  errors,
  register,
  isEditMode,
}: CustomerFormProps) => {
  return (
    <div className="mt-10">
      <p className="relative text-2xl font-medium my-5 sm:hidden">
        {isEditMode ? "Edit" : "Add"} Customer
      </p>
      <form className="relative grid grid-cols-1 sm:grid-cols-2  gap-x-8 gap-y-3">
        <div className="form_container">
          <label className="form_label" htmlFor="name">
            Name*
          </label>
          <input
            className="form_input"
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.name &&
              (errors?.name?.message || "Please enter valid input data")}
          </span>
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="email">
            Email
          </label>
          <input
            className="form_input"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              pattern: {
                value: EMAIL_REGREX,
                message: "Please enter valid email address!!",
              },
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.email &&
              (errors?.email?.message || "Please enter valid input data")}
          </span>
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="phone">
            Phone number*
          </label>
          <input
            className="form_input"
            type="text"
            id="phone"
            placeholder="Phone Number"
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^\+?\d[\d -]{8,12}\d$/,
                message: "Please enter a valid phone number!!!",
              },
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.phoneNumber &&
              (errors?.phoneNumber?.message || "Please enter valid input data")}
          </span>
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="alternate_phone">
            Alternate phone number
          </label>
          <input
            className="form_input"
            type="text"
            id="alternate_phone"
            placeholder="Alternate phone Number"
            {...register("altPhoneNumber", {
              pattern: {
                value: /^\+?\d[\d -]{8,12}\d$/,
                message: "Please enter a valid alternate phone number!!",
              },
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.altPhoneNumber &&
              (errors?.altPhoneNumber?.message ||
                "Please enter valid input data")}
          </span>
        </div>

        <div className="form_container">
          <label className="form_label" htmlFor="occupation">
            Occupation*
          </label>
          <input
            className="form_input"
            type="text"
            id="occupation"
            placeholder="Occupation"
            {...register("occupation", {
              required: "Occupation is required",
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.occupation &&
              (errors?.occupation?.message || "Please enter valid input data")}
          </span>
        </div>
        <div />
        <div className="form_container col-span-1 sm:col-span-2 items-start">
          <label className="form_label" htmlFor="address">
            Address*
          </label>
          <textarea
            rows={6}
            className="relative bg-transparent border rounded-md p-3 w-full md:w-[49%] border-lightWhite focus:border-white active:border-white"
            id="address"
            placeholder="Address"
            {...register("address", {
              required: "Address is required",
            })}
          />
          <span className="relative text-red-600 font-medium mt-2">
            {errors?.address &&
              (errors?.address?.message || "Please enter valid input data")}
          </span>
        </div>

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

export default CustomerForm;
