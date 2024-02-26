"use client";

import { Column } from "react-table";
import Table from "../Table";
import { useMemo } from "react";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/navigation";

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: ROLE;
}

export type ROLE = "USER" | "ADMIN";

const LatestTransactions = () => {
  const { push } = useRouter();

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
  ];

  return (
    <div className="relative bg-secondaryBg p-5 rounded-md">
      <span className="relative flex gap-3 items-center">
        <p className="relative capitalize font-light text-lightWhite text-[1.5rem]">
          latest transactions
        </p>
        <span>
          <FiExternalLink
            onClick={() => push("/dashboard/transactions")}
            size={23}
            className={"relative cursor-pointer"}
          />
        </span>
      </span>

      <div className="relative mt-7 max-w-full overflow-x-auto">
        <Table data={dummyUserDetails} columns={columns} loading={false} />
      </div>
    </div>
  );
};

export default LatestTransactions;
