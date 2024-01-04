"use client";

/* eslint-disable react/jsx-key */
//@ts-nocheck

import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy, Column } from "react-table";
import * as Config from "../../types/react-table-config";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdArrowBack,
} from "react-icons/io";

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  showPagination?: boolean;
}

const Table = <T extends object>({
  data,
  columns,
  loading,
  showPagination,
}: TableProps<T>): JSX.Element => {
  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    gotoPage,
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
      initialState: { pageIndex: 0, pageSize: 5 },
    },

    useSortBy,
    usePagination
  );

  const onPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const val =
        Number(e.target.value) - 1 > 0 ? Number(e.target.value) - 1 : 0;
      gotoPage(val);
    }
  };

  const onPageBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const val = e.target.value ? Number(e.target.value) : 0;
    if (val < 1 || val > pageOptions.length) {
      e.target.value = String(val);
    }
  };

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
            {/* <Loader /> TODO: Loader */}
            <span>Loader..</span>
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
        <div className="relative flex flex-wrap  items-center gap-7 justify-center py-7 px-7">
          {data.length > 0 && (
            <>
              <button
                className="table_btn"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                previous
              </button>

              <span className="relative text-[2rem]">{"|"}</span>
            </>
          )}

          <div>
            <span className="relative mr-5 ">Page</span>
            <strong className="relative font-light">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>

          <span className="relative text-[2rem]">{"|"}</span>

          <div>
            <input
              type={"number"}
              min={1}
              max={pageOptions.length}
              onBlur={onPageBlur}
              onChange={onPageChange}
              value={pageIndex + 1}
              className="relative px-4 py-1 text-black border"
            />
          </div>
          <span className="relative text-[2rem]">{"|"}</span>

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

          <button
            className="table_btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
