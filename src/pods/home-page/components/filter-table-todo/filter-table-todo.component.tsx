import { memo } from "react";
import type { FilterFormTable } from "../../../../store";
import { useAppUtilities } from "../../../../hooks";
import { CustomInput } from "../../../../common";
import "./filter-table-todo.styles.scss";

interface Props {
  filterFormTable: FilterFormTable;
  setFilterFormTable: React.Dispatch<React.SetStateAction<FilterFormTable>>;
}

export const FilterTableTodo: React.FC<Props> = memo((props) => {
  const { dateConverter } = useAppUtilities();

  const { filterFormTable, setFilterFormTable } = props;

  //
  const handleChangeFilter =
    (key: keyof FilterFormTable) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
    ) => {
      if (key === "startReminderDate" || key === "endReminderDate") {
        setFilterFormTable((prev: FilterFormTable) => ({
          ...prev,
          [key]: new Date(e?.target.value ?? "").getTime(),
        }));
      } else {
        setFilterFormTable((prev: FilterFormTable) => ({
          ...prev,
          [key]: e?.target.value,
        }));
      }
    };

  return (
    <div className="rootFilterTableTodo">
      <CustomInput
        id="nameTodo"
        handleChange={handleChangeFilter("nameTodo")}
        value={filterFormTable.nameTodo}
        lbl="Name To do"
        name="nameTodo"
        pl="Name To do"
        type="text"
        ariaLabeInput="Input filter name To do"
      />
      <CustomInput
        id="startReminderDate"
        handleChange={handleChangeFilter("startReminderDate")}
        value={dateConverter(filterFormTable.startReminderDate)}
        lbl="Start Reminder Date"
        name="startReminderDate"
        pl="Start Reminder Date"
        type="datetime-local"
        ariaLabeInput="Input filter Start Reminder Date"
      />
    </div>
  );
});
