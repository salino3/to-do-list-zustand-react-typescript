import type React from "react";
import type { ITodoItem } from "../../../../store";
import { useAppUtilities } from "../../../../hooks";
import "./drop-down-table.styles.scss";

const BoxText: React.FC<{
  title: string;
  value: ITodoItem[keyof ITodoItem];
}> = ({ title, value }) => {
  return (
    <div className="boxText">
      <span className="title">{title || "-"}:</span>
      <span className="value">{value ?? "-"}</span>
    </div>
  );
};

//
interface Props {
  rows: ITodoItem[];
  values: ITodoItem;
  index: number;
}

export const DropDownTable: React.FC<Props> = (props) => {
  const { rows, values, index } = props;

  const { dateConverter } = useAppUtilities();

  return (
    <div className="rootDropDownTable">
      <div className="boxLeft">
        <BoxText title="Created At" value={dateConverter(values.createdAt)} />
        <BoxText title="Updated At" value={dateConverter(values.updatedAt)} />
      </div>
      <div className="boxRight">
        {rows[0].id} - {values.nameTodo} - {index}
      </div>
    </div>
  );
};
