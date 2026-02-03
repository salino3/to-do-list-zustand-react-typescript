import { memo } from "react";
import { CustomInput } from "../../../../common";
import type { FilterFormTable } from "../../../../store";
import "./filter-table-todo.styles.scss";

interface Props {
  filterFormTable: FilterFormTable;
  setFilterFormTable: React.Dispatch<React.SetStateAction<FilterFormTable>>;
}

export const FilterTableTodo: React.FC<Props> = memo((props) => {
  const { filterFormTable, setFilterFormTable } = props;

  //
  const handleChangeFilter =
    (key: keyof FilterFormTable) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
    ) => {
      setFilterFormTable((prev: FilterFormTable) => ({
        ...prev,
        [key]: e?.target.value,
      }));
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
        value={filterFormTable.nameTodo}
        lbl="Start Reminder Date"
        name="startReminderDate"
        pl="Start Reminder Date"
        type="datetime-local"
        ariaLabeInput="Input filter Start Reminder Date"
      />
    </div>
  );
});
