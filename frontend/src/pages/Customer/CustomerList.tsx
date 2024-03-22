import { getCustomerList } from "@/api";
import Table from "@/components/Table";
import TextSearch from "@/components/TextSearch";
import { useAPI } from "@/hooks/useApi";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { isApiError } from "@/types/Api";
import { CustomerResponse } from "@/types/customer";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";

const CustomerList = () => {
  const navigate = useNavigate();
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [data, setData] = useState<CustomerResponse[]>([]);

  const fetchCustomerList = async () => {
    startLoading("/getLoanList");
    try {
      const res = await getCustomerList(api, debouncedSearchText);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getLoanList");
    }
  };

  const columns = useMemo<Column<CustomerResponse>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value, row } }): JSX.Element => {
          return (
            <div
              className="relative cursor-pointer font-medium text-blue-500"
              onClick={() => {
                navigate(`/dashboard/customers/${row.original.id}/edit`);
              }}
            >
              {value}
            </div>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ cell: { value } }): string => (value ? value : "Not added."),
      },
      { Header: "PhoneNumber", accessor: "phoneNumber" },
      {
        Header: "AltPhoneNumber",
        accessor: "altPhoneNumber",
        Cell: ({ cell: { value } }): string => (value ? value : "Not added."),
      },
    ],
    []
  );

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    setSearchText(text);
  };

  useEffect(() => {
    fetchCustomerList();
  }, [debouncedSearchText]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  return (
    <div>
      <div className="relative my-7 flex justify-center sm:justify-between items-center gap-4 flex-wrap gap-y-5">
        <TextSearch
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
        />

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
          data={data}
          columns={columns}
          loading={loading}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default CustomerList;
