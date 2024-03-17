import Table from "@/components/Table";
import TextSearch from "@/components/TextSearch";
import { Customer } from "@/types/customer";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";

const CustomerList = () => {
  const navigate = useNavigate();

  const columns = useMemo<Column<Customer>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value } }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-blue-500"
              onClick={() => {
                navigate("/dashboard/customers/id");
              }}
            >
              {value}
            </div>
          );
        },
      },
      { Header: "Email", accessor: "email" },
      { Header: "PhoneNumber", accessor: "phoneNumber" },
      { Header: "AltPhoneNumber", accessor: "altPhoneNumber" },
    ],
    []
  );

  const dummyCustomers: Customer[] = [];

  return (
    <div>
      <div className="relative my-7 flex justify-center sm:justify-between items-center gap-4 flex-wrap">
        <TextSearch />

        <div>
          <button
            onClick={() => navigate("/dashboard/customers/create")}
            className="relative bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded"
          >
            Add Customer
          </button>
        </div>
      </div>

      <div className="relative  max-w-full overflow-x-auto">
        <Table
          data={dummyCustomers}
          columns={columns}
          loading={false}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default CustomerList;
