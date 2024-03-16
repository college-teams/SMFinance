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

  const dummyCustomers: Customer[] = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      altPhoneNumber: "987-654-3210",
      occupation: "Software Engineer",
      address: "123 Main Street, Cityville, USA",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "555-555-5555",
      altPhoneNumber: "666-666-6666",
      occupation: "Marketing Specialist",
      address: "456 Oak Avenue, Townsville, USA",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "111-222-3333",
      altPhoneNumber: "444-555-6666",
      occupation: "Accountant",
      address: "789 Pine Street, Villagetown, USA",
    },
    {
      name: "Bob Anderson",
      email: "bob.anderson@example.com",
      phoneNumber: "777-888-9999",
      altPhoneNumber: "111-222-3333",
      occupation: "Graphic Designer",
      address: "321 Cedar Lane, Hamletville, USA",
    },
    {
      name: "Eva Miller",
      email: "eva.miller@example.com",
      phoneNumber: "222-333-4444",
      altPhoneNumber: "555-666-7777",
      occupation: "Teacher",
      address: "987 Elm Street, Suburbia, USA",
    },
    {
      name: "Frank Davis",
      email: "frank.davis@example.com",
      phoneNumber: "888-999-0000",
      altPhoneNumber: "333-444-5555",
      occupation: "Doctor",
      address: "567 Maple Drive, Countryside, USA",
    },
    {
      name: "Grace Wilson",
      email: "grace.wilson@example.com",
      phoneNumber: "444-555-6666",
      altPhoneNumber: "777-888-9999",
      occupation: "Architect",
      address: "234 Birch Lane, Riverside, USA",
    },
    {
      name: "Henry Turner",
      email: "henry.turner@example.com",
      phoneNumber: "666-777-8888",
      altPhoneNumber: "111-222-3333",
      occupation: "Sales Manager",
      address: "876 Pine Avenue, Lakeside, USA",
    },
  ];

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
