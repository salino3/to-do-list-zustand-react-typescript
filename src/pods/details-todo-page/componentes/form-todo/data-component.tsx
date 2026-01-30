import type { SelectList } from "../../../../common";
import { Priority } from "../../../../store";

interface ListInput {
  name: string;
  selectList: SelectList[];
  ariaRq: boolean;
  click?:
    | ((e: React.MouseEvent<HTMLSelectElement> | undefined) => void)
    | undefined;
  pl: string;
  lbl: string;
  type: string;
  ariaLabeInput: string;
}

//
const selectList: SelectList[] = [
  {
    optgroup: "Priority",
    content: Object.values(Priority).map((c) => {
      return {
        key: c,
        text: c === "" ? "..." : c.charAt(0).toUpperCase() + c.slice(1),
      };
    }),
  },
];

//
export const listInputs: ListInput[] = [
  {
    name: "nameTodo",
    selectList: [],
    ariaRq: false,
    pl: "Name To do",
    lbl: "Name To do",
    type: "text",
    ariaLabeInput: "Text the name task",
  },
  {
    name: "web",
    selectList: [],
    ariaRq: false,
    pl: "Web",
    lbl: "Web",
    type: "text",
    ariaLabeInput: "Text the web relationated with the task",
  },
  {
    name: "tel",
    selectList: [],
    ariaRq: false,
    pl: "Telephone",
    lbl: "Telephone",
    type: "tel",
    ariaLabeInput: "Text the telephone relationated with the task",
  },
  {
    name: "email",
    selectList: [],
    ariaRq: false,
    pl: "Email",
    lbl: "Email",
    type: "email",
    ariaLabeInput: "Text the email relationated with the task",
  },
  {
    name: "place",
    selectList: [],
    ariaRq: false,
    pl: "Topic",
    lbl: "Topic",
    type: "text",
    ariaLabeInput: "Select a topic for this task",
  },
  {
    name: "place",
    selectList: [],
    ariaRq: false,
    pl: "Place",
    lbl: "Place",
    type: "text",
    ariaLabeInput: "What's the place for this task",
  },
  {
    name: "reminderDate",
    selectList: [],
    ariaRq: true,
    pl: "Reminder Date",
    lbl: "Reminder Date",
    type: "datetime-local",
    ariaLabeInput: "Select a reminder date for this task",
  },
  {
    name: "priority",
    lbl: "Priority",
    click: (e: React.MouseEvent<HTMLSelectElement> | undefined) =>
      e!.stopPropagation(),
    pl: "Priority",
    selectList: selectList,
    ariaRq: true,
    type: "",
    ariaLabeInput: "Choose the to do priority",
  },
];
