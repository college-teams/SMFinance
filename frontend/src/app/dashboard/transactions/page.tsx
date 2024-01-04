"use client";

import { useMemo } from "react";
import { Column } from "react-table";

import Combobox from "@/components/Combobox";
import Table from "@/components/Table";
import { UserDetails } from "@/components/latestTransactions";

const Transactions = () => {
  const columns = useMemo<Column<UserDetails>[]>(
    () => [
      {
        Header: "Firstname",
        accessor: "firstName",
      },
      { Header: "Lastname", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "PhoneNumber", accessor: "phoneNumber" },
      { Header: "Role", accessor: "role" },
    ],
    []
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
      <div className="relative my-7">
        <Combobox placeholder="Search by Customer" items={frameworks} />
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

export default Transactions;
