import type React from "react";
import type { ITodoItem } from "../../../../store";
import "./drop-down-table.styles.scss";

interface Props {
  rows: ITodoItem[];
  values: ITodoItem;
  index: number;
}

export const DropDownTable: React.FC<Props> = (props) => {
  const { rows, values, index } = props;
  return (
    <div className="rootDropDownTable">
      {rows[0].id} - {values.nameTodo} - {index}
    </div>
  );
};
