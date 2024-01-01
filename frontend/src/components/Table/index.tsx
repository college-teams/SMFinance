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
import { MdOutlineArrowForward } from "react-icons/md";

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
}

const Table = <T extends object>({
  data,
  columns,
  loading,
}: TableProps<T>): JSX.Element => {
  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    gotoPage,
    setPageSize,
    pageCount,
    pageOptions,
    // previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
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
            {/* <Loader /> */}
            <span>Loader..</span>
          </div>
        )}

        {!loading && data?.length == 0 && (
          <div className="relative w-full py-4 flex items-center justify-center text-[1.1rem]  border border-t-0 border-gray-600">
            No data to show
          </div>
        )}
      </div>

      {/* PAGINATION */}
    </div>
  );
};

export default Table;
