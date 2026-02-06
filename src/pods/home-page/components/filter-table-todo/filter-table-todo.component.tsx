import { memo } from "react";
import type { FilterFormTable, ListInput } from "../../../../store";
import { useAppUtilities } from "../../../../hooks";
import { CustomInput } from "../../../../common";
import { listFiltersInputs } from "./data.component";
import "./filter-table-todo.styles.scss";

interface Props {
  filterFormTable: FilterFormTable;
  setFilterFormTable: React.Dispatch<React.SetStateAction<FilterFormTable>>;
}

export const FilterTableTodo: React.FC<Props> = memo((props) => {
  const { filterFormTable, setFilterFormTable } = props;

  const { dateConverter } = useAppUtilities();

  //
  const handleChangeFilter =
    (key: keyof FilterFormTable) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
    ) => {
      setFilterFormTable((prev: FilterFormTable) => ({
        ...prev,
        [key]: key.includes("eminderDate")
          ? new Date(e?.target.value ?? "").getTime()
          : e?.target.value,
      }));
    };

  return (
    <div className="rootFilterTableTodo">
      {listFiltersInputs &&
        listFiltersInputs.length > 0 &&
        listFiltersInputs.map((input: ListInput) => (
          <CustomInput
            key={input.name}
            name={input.name}
            id={input.name}
            value={
              input.name.includes("eminderDate")
                ? dateConverter(
                    (filterFormTable[
                      input.name as keyof FilterFormTable
                    ] as any) ?? "",
                  )
                : ((filterFormTable[
                    input.name as keyof FilterFormTable
                  ] as any) ?? "")
            }
            lbl={input.lbl}
            handleChange={handleChangeFilter(
              input.name as keyof FilterFormTable,
            )}
            pl={input.pl}
            selectList={input?.selectList}
            ariaRq={input.ariaRq}
            type={input.type}
            ariaLabeInput={input.ariaLabeInput}
          />
        ))}
    </div>
  );
});
