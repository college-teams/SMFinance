const CustomerCreate = () => {
  return (
    <div className="mt-10">
      <p className="relative text-2xl font-medium my-5 sm:hidden">
        Add Customer
      </p>
      <form className="relative grid grid-cols-1 sm:grid-cols-2  gap-x-8 gap-y-3">
        <div className="form_container">
          <label className="form_label" htmlFor="name">
            Name
          </label>
          <input className="form_input" type="text" id="name" />
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="phone">
            Phone number
          </label>
          <input className="form_input" type="text" id="phone" />
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="alternate_phone">
            Alternate phone number
          </label>
          <input className="form_input" type="text" id="alternate_phone" />
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="email">
            Email
          </label>
          <input className="form_input" type="email" id="email" />
        </div>
        <div className="form_container">
          <label className="form_label" htmlFor="occupation">
            Occupation
          </label>
          <input className="form_input" type="text" id="occupation" />
        </div>
        <div />
        <div className="form_container col-span-1 sm:col-span-2 items-start">
          <label className="form_label" htmlFor="address">
            Address
          </label>
          <textarea
            rows={6}
            className="relative bg-transparent border rounded-md p-3 w-full md:w-[49%] border-lightWhite focus:border-white active:border-white"
            id="address"
          />
        </div>

        <div className="relative col-span-1 sm:col-span-2 text-center mt-4">
          <button className="relative bg-orange-500 text-center px-5 w-full sm:w-[30%] py-3 rounded-md hover:bg-orange-600">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerCreate;
