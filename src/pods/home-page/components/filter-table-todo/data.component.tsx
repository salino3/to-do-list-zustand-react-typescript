import type { ListInput } from "../../../../store";

//
export const listFiltersInputs: ListInput[] = [
  {
    name: "nameTodo",
    ariaRq: false,
    pl: "Name To do",
    lbl: "Name To do",
    type: "text",
    ariaLabeInput: "Text the name task",
  },
  {
    name: "web",
    ariaRq: false,
    pl: "Web",
    lbl: "Web",
    type: "text",
    ariaLabeInput: "Text the web relationated with the task",
  },
  {
    name: "tel",
    ariaRq: false,
    pl: "Telephone",
    lbl: "Telephone",
    type: "tel",
    ariaLabeInput: "Text the telephone relationated with the task",
  },
  {
    name: "email",
    ariaRq: false,
    pl: "Email",
    lbl: "Email",
    type: "email",
    ariaLabeInput: "Text the email relationated with the task",
  },
  {
    name: "startReminderDate",
    ariaRq: true,
    pl: "Start Reminder Date",
    lbl: "Start Reminder Date",
    type: "datetime-local",
    ariaLabeInput: "Select the start reminder date for this task",
  },
  {
    name: "endReminderDate",
    ariaRq: true,
    pl: "End Reminder Date",
    lbl: "End Reminder Date",
    type: "datetime-local",
    ariaLabeInput: "Select the end reminder date for this task",
  },
];
