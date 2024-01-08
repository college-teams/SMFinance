"use client";

import { useMemo } from "react";
import { Column } from "react-table";

import Combobox from "@/components/Combobox";
import Table from "@/components/Table";
import { UserDetails } from "@/components/latestTransactions";
import { useRouter } from "next/navigation";

const Customers = () => {
  const { push } = useRouter();

  const columns = useMemo<Column<UserDetails>[]>(
    () => [
      {
        Header: "Firstname",
        accessor: "firstName",
        Cell: ({ cell: { value } }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-blue-500"
              onClick={() => {
                push("/dashboard/customers/id");
              }}
            >
              {value}
            </div>
          );
        },
      },
      { Header: "Lastname", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "PhoneNumber", accessor: "phoneNumber" },
      { Header: "Role", accessor: "role" },
    ],
    [push]
  );

  const dummyUserDetails: UserDetails[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      role: "USER",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      role: "ADMIN",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      role: "USER",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      role: "ADMIN",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      role: "USER",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      role: "ADMIN",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      role: "USER",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      role: "ADMIN",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
    {
      id: 7,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "555-123-4567",
      role: "USER",
    },
  ];

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
  ];

  return (
    <div>
      <div className="relative my-7 flex justify-between items-center  flex-wrap">
        <Combobox placeholder="Search by name" items={frameworks} />

        <div>
          <button
            onClick={() => push("/dashboard/customers/create")}
            className="relative bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded"
          >
            Add Customer
          </button>
        </div>
      </div>

      <div className="relative  max-w-full overflow-x-auto">
        <Table
          data={dummyUserDetails}
          columns={columns}
          loading={false}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default Customers;
