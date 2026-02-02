import type React from "react";
import { memo } from "react";
import "./table-to-do.styles.scss";

export interface FilteringValuesFilter {
  [key: string]: ValuesFilter[];
}

export interface ValuesFilter {
  text: string;
  value: any;
}

export interface Columns {
  key?: string;
  title: string;
  tooltip?: (item: any, row: any) => any | string | undefined | boolean;
  render?: (item: any, row: any) => any | string | undefined | boolean;
  typeFilter?: any;
  valuesFilter?: ValuesFilter[] | [];
  filter?: any;
  setFilter?: any;
  minDate?: string | number | undefined;
  maxDate?: string | number | undefined;
  valueClass?: any;
}

//
interface TableProps {
  totalData: number;
  columns: any[];
  rows: any[];
  uniqueKey?: string;
  page?: number;
  pageSize?: number;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  rowPerPages?: number[];
  initialTableFilters: any;
  customStylesTableRowElement?: (values: any) => string;
}

export const TodoTable: React.FC<TableProps> = memo(
  ({
    // totalData = 0,
    columns,
    rows,
    uniqueKey,
    // page = 1,
    // pageSize = 10,
    // setFlag,
    // setPage,
    // setPageSize,
    // rowPerPages = [5, 10, 25, 50],
    // initialTableFilters,
    customStylesTableRowElement,
  }) => {
    console.log("clog1", rows);
    console.log("clog2", columns);

    return (
      <div className="table-container">
        <table
          aria-label="To-do list table. Use tab to navigate through the table."
          tabIndex={-1}
          className="custom-table"
        >
          <caption>List of To-Dos</caption>
          <thead>
            <tr>
              {columns &&
                columns.length > 0 &&
                columns.map((item: any) => (
                  <th scope="col" key={item?.key}>
                    {item?.title}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows?.length > 0 &&
              rows.map((values: any, rowIndex: number) => {
                return (
                  <tr
                    className={`priority-${values.priority}
                      ${customStylesTableRowElement && customStylesTableRowElement(values)}
                       `}
                    key={
                      uniqueKey && values[uniqueKey]
                        ? values[uniqueKey]
                        : rowIndex
                    }
                  >
                    {columns &&
                      columns?.length > 0 &&
                      columns.map((column, colIndex) => {
                        const content =
                          column && column.render
                            ? column.render(values[column.key], values)
                            : (values[column.key] ?? "-");
                        const tooltip =
                          column && column.tooltip
                            ? column.tooltip(values[column.key], values)
                            : null;
                        const valueClass: string =
                          column && column.valueClass
                            ? column.valueClass(values[column.key], values)
                            : "";

                        return (
                          <td
                            key={`${column.key}_${
                              uniqueKey && values[uniqueKey]
                                ? values[uniqueKey]
                                : rowIndex
                            }_${colIndex}`}
                            className={`
                            ${valueClass}
                            table_x02_${column.key} 
                            table_x02_${column.key}_${
                              uniqueKey && values[uniqueKey]
                                ? values[uniqueKey]
                                : rowIndex
                            }_${colIndex}`}
                            style={
                              {
                                // minWidth:
                                //   key == "Contenido" || key == "diputados_autores"
                                //     ? "300px"
                                //     : "",
                                // wordBreak:
                                //   key == "Contenido" || key == "diputados_autores"
                                //     ? "break-word"
                                //     : "unset",
                              }
                            }
                          >
                            {content}
                            {column?.key && tooltip && (
                              <span
                                className={`table_x03_spanTooltip${
                                  column.key == "Contenido" ||
                                  column.key == "diputados_autores"
                                    ? "table_x02_spanTooltip"
                                    : ""
                                }`}
                              >
                                {tooltip}
                              </span>
                            )}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  },
);
