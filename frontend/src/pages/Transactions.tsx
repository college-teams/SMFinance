import { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";

import Table from "@/components/Table";
import TextSearch from "@/components/TextSearch";
import { useAPI } from "@/hooks/useApi";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { TransactionResponse } from "@/types/transaction";
import { getTransactionList } from "@/api";
import { isApiError } from "@/types/Api";
import { format } from "date-fns";

const Transactions = () => {
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  const [data, setData] = useState<TransactionResponse[]>([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const fetchTransactionList = async () => {
    startLoading("/getTransactionList");
    try {
      const res = await getTransactionList(api, -1, debouncedSearchText);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getTransactionList");
    }
  };

  const columns = useMemo<Column<TransactionResponse>[]>(
    () => [
      {
        Header: "Customer Name",
        accessor: (row: TransactionResponse) =>
          row.emi?.loan?.customer?.name ?? "",
      },
      {
        Header: "Customer PhoneNumber",
        accessor: (row: TransactionResponse) =>
          row.emi?.loan?.customer?.phoneNumber ?? "",
      },
      { Header: "Amount Paid", accessor: "amountPaid" },
      {
        Header: "Payment Date",
        accessor: "paymentDate",
        Cell: ({ value }): string => format(new Date(value), "yyyy-mm-dd"),
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
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  useEffect(() => {
    fetchTransactionList();
  }, [debouncedSearchText]);

  return (
    <div>
      <div className="relative my-7">
        <TextSearch
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
        />
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

export default Transactions;
