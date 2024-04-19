import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table";

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Timetable({ timeTable, section }) {
  const data = useMemo(() => timeTable, [timeTable]);

  const columns = useMemo(
    () => [
      {
        Header: `Days`,
        accessor: (_, i) => weekDays[i],
      },
      ...timeTable[0].map((_, index) => ({
        Header: `Lecture ${index + 1}`,
        accessor: (row) => row[index] || "FREE",
      })),
    ],
    [timeTable]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold md:text-2xl md:font-bold self-start">{`${section}`}</p>
        <div className="overflow-x-auto border border-black rounded-xl">
          <table
            {...getTableProps()}
            className="text-left rounded-xl overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-2 border-black border-b bg-black text-white"
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
              {rows.map((row, i) => {
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
      </div>
    </div>
  );
}
