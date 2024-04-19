import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";

export default function LectureTable({ lectures, setLectures }) {
  const data = useMemo(
    () =>
      lectures.map((lecture) =>
        createData(lecture[0], lecture[1], lecture[2], lecture[3], lecture[4])
      ),
    [lectures]
  );

  const columns = useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
          <input type="checkbox" {...row.getToggleRowSelectedProps()} />
        ),
      },
      {
        Header: "Teacher",
        accessor: "teacher",
      },
      {
        Header: "Section",
        accessor: "section",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Arrangement",
        accessor: "arrangement",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useSortBy, usePagination, useRowSelect);

  const deleteRow = useCallback(() => {
    const newLectures = [...lectures];
    selectedFlatRows.forEach((row) => {
      const target = newLectures.findIndex(
        (e) => e[4] === row.original.lectureID
      );
      newLectures.splice(target, 1);
    });
    setLectures(newLectures, "lectures");
  }, [selectedFlatRows, lectures, setLectures]);

  return (
    <div className="flex flex-col justify-end">
      <button
        className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 self-start"
        onClick={deleteRow}
      >
        Remove Selected Rows
      </button>
      <div className="overflow-x-auto border border-black rounded-xl my-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table
          {...getTableProps()}
          className="w-full text-left rounded-xl overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-2 border-black border-b"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-50 border-black"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="px-4 py-2">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center space-x-2">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronsLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="flex items-center">
          Page{" "}
          <strong className="font-medium mx-1">
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <ChevronsRight className="h-5 w-5" />
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border-gray-300 border rounded bg-white p-1"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function createData(teacher, section, subject, arrangement, lectureID) {
  return { teacher, section, subject, arrangement, lectureID };
}
