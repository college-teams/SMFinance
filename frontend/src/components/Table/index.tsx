// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy, Column } from "react-table";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Config from "../../types/react-table-config";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Loader from "../Loader";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  showPagination?: boolean;
  initialState?: {
    hiddenColumns: string[];
  };
}

const Table = <T extends object>({
  data,
  columns,
  loading,
  initialState,
  showPagination,
}: TableProps<T>): JSX.Element => {
  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    setPageSize,
    pageOptions,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 5, ...initialState },
    },

    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className="relative mb-5">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={i}
                  >
                    {column.render("Header")}
                    <span className="relative inline-block">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <IoMdArrowDropup />
                        ) : (
                          <IoMdArrowDropdown />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {!loading && (
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, cellIndex) => {
                      const headerName = cell.column.Header;
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={cellIndex}
                          data-cell={headerName}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {loading && (
          <div className="relative w-full pt-8 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!loading && data?.length == 0 && (
          <div className="relative w-full py-4 flex items-center justify-center text-[1.1rem]  border border-t-0 border-gray-600">
            {/* Add dynamic and  */}
            No data to show
          </div>
        )}
      </div>

      {/* PAGINATION */}

      {showPagination && (
        <>
          <div className="relative flex flex-wrap  items-center gap-7 justify-between py-7 px-7  sm:hidden">
            <span
              className={`relative rounded  px-4 py-[1px]  bg-yellow-300 ${
                !canPreviousPage && "!bg-gray-200"
              }`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <MdKeyboardArrowLeft className="relative text-[2rem] cursor-pointer text-black" />
            </span>
            <span
              className={`relative rounded  px-4 py-[1px] bg-yellow-300 ${
                !canNextPage && "!bg-gray-200"
              }`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <MdKeyboardArrowRight className="relative text-[2rem] cursor-pointer text-black" />
            </span>
          </div>
          <div className="relative  flex-wrap  items-center gap-7 justify-center py-7 px-7 hidden sm:flex">
            {/* {data.length > 0 && ( */}
            <div className="flex items-center gap-2">
              <button
                className="table_btn"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                previous
              </button>

              <span className="relative text-[2rem]">{"|"}</span>
            </div>
            {/* )} */}

            <div className="flex items-center gap-2">
              <div>
                <span className="relative mr-5 ">Page</span>
                <strong className="relative font-light">
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </div>

              {/* <span className="relative text-[2rem]">{"|"}</span> */}

              {/* <div>
            <input
              type={"number"}
              min={1}
              max={pageOptions.length}
              onBlur={onPageBlur}
              onChange={onPageChange}
              value={pageIndex + 1}
              className="relative px-4 py-1 text-black border"
            />
          </div> */}

              <span className="relative text-[2rem]">{"|"}</span>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <select
                  className="relative px-4 py-[2px] font-medium border-2 text-black"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 20, 50, 100, 200, 500].map((e: number) => (
                    <option className="relative border-b-2" key={e} value={e}>
                      Show {e}
                    </option>
                  ))}
                </select>
              </div>

              <span className="relative text-[2rem]">{"|"}</span>
            </div>

            <button
              className="table_btn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
