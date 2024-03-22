import { getLoanList } from "@/api";
import Table from "@/components/Table";
import TextSearch from "@/components/TextSearch";
import { useAPI } from "@/hooks/useApi";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";
import { isApiError } from "@/types/Api";
import { LoanResponse } from "@/types/loan";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Column } from "react-table";
import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LoanList = () => {
  const navigate = useNavigate();
  const api = useAPI();
  const [loading, startLoading, endLoading] = useLoadingIndicator();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [data, setData] = useState<LoanResponse[]>([]);

  const fetchLoanList = async () => {
    startLoading("/getLoanList");
    try {
      const res = await getLoanList(api, debouncedSearchText);
      if (!isApiError(res)) {
        setData(res);
      }
    } finally {
      endLoading("/getLoanList");
    }
  };

  const columns = useMemo<Column<LoanResponse>[]>(
    () => [
      {
        Header: "Customer Name",
        accessor: "customer",
        Cell: ({ cell: { value, row } }): JSX.Element => {
          return (
            <div className="relative font-medium text-blue-500">
              <Link to={`/dashboard/loans/${row.original.id}/edit`}>
                {value.name}
              </Link>
            </div>
          );
        },
      },
      { Header: "Loan Amount", accessor: "loanAmount" },
      { Header: "Loan Category", accessor: "loanCategory" },
      { Header: "Maturity Date", accessor: "maturityDate" },
      {
        Header: "Pre Closed",
        accessor: "preClosed",
        Cell: ({ cell: { value } }): string => (value ? "Yes" : "No"),
      },
      {
        Header: "Loan Status",
        accessor: "loanStatus",
        Cell: ({ cell: { value } }): JSX.Element => (
          <div
            className={`relative ${
              value === "ACTIVE" ? "bg-green-600" : "bg-gray-600"
            }  px-2 py-1 rounded-sm text-black font-semibold text-sm loan_status inline`}
          >
            {value}
          </div>
        ),
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
    fetchLoanList();
  }, [debouncedSearchText]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  return (
    <div>
      <div className="relative my-7 flex justify-between items-center flex-wrap gap-y-5">
        <TextSearch
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
        />

        <div>
          <button
            onClick={() => navigate("/dashboard/loans/create")}
            className="relative bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded"
          >
            Add Loans
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

export default LoanList;
