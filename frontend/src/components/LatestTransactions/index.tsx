import { Column } from "react-table";
import Table from "../Table";
import { useEffect, useMemo, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAPI } from "@/hooks/useApi";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { TransactionResponse } from "@/types/transaction";
import { getTransactionList } from "@/api";
import { isApiError } from "@/types/Api";
import { format } from "date-fns";

const LatestTransactions = () => {
  const navigate = useNavigate();
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  const [data, setData] = useState<TransactionResponse[]>([]);

  const fetchTransactionList = async () => {
    startLoading("/getTransactionList");
    try {
      const res = await getTransactionList(api, 5);
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

  useEffect(() => {
    fetchTransactionList();
  }, []);

  return (
    <div className="relative bg-secondaryBg p-5 rounded-md">
      <span className="relative flex gap-3 items-center">
        <p className="relative capitalize font-light text-lightWhite text-[1.5rem]">
          latest transactions
        </p>
        <span>
          <FiExternalLink
            onClick={() => navigate("/dashboard/transactions")}
            size={23}
            className={"relative cursor-pointer"}
          />
        </span>
      </span>

      <div className="relative mt-7 max-w-full overflow-x-auto">
        <Table data={data} columns={columns} loading={loading} />
      </div>
    </div>
  );
};

export default LatestTransactions;
