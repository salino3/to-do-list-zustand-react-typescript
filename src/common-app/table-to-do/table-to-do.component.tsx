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

export interface Row {
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
  initialFilters: any;
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
    // initialFilters,
  }) => {
    console.log("clog1", rows);
    console.log("clog2", columns);

    return (
      <div className="table-container">
        <table className="custom-table">
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
              rows.map((values: any, rowIndex: number) => (
                <tr
                  key={
                    uniqueKey && values[uniqueKey]
                      ? values[uniqueKey]
                      : rowIndex
                  }
                  className={values.completed ? "row-completed" : ""}
                >
                  {columns &&
                    columns?.length > 0 &&
                    columns.map((row, colIndex) => {
                      const content =
                        row && row.render
                          ? row.render(values[row.key], values)
                          : values[row.key];
                      const tooltip =
                        row && row.tooltip
                          ? row.tooltip(values[row.key], values)
                          : null;

                      return (
                        <td
                          key={`${row.key}_${
                            uniqueKey && values[uniqueKey]
                              ? values[uniqueKey]
                              : rowIndex
                          }_${colIndex}`}
                          className={`table_x02_${row.key}_${
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
                          {row?.key && tooltip && (
                            <span
                              className={`${
                                row.key == "Contenido" ||
                                row.key == "diputados_autores"
                                  ? "table_x02_spanTooltip"
                                  : ""
                              }`}
                            >
                              {tooltip}
                            </span>
                          )}
                          {content}
                        </td>
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  },
);
