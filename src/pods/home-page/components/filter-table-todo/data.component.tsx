import type { ListInput } from "../../../../store";

//
export const listInputs: ListInput[] = [
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
    name: "topic",
    ariaRq: false,
    pl: "Topic",
    lbl: "Topic",
    type: "text",
    ariaLabeInput: "Select a topic for this task",
  },
  {
    name: "place",
    ariaRq: false,
    pl: "Place",
    lbl: "Place",
    type: "text",
    ariaLabeInput: "What's the place for this task",
  },
  {
    name: "reminderDate",
    ariaRq: true,
    pl: "Reminder Date",
    lbl: "Reminder Date",
    type: "datetime-local",
    ariaLabeInput: "Select a reminder date for this task",
  },

  {
    name: "status",
    ariaRq: false,
    pl: "Status",
    lbl: "Status",
    type: "text",
    ariaLabeInput: "What's the status for this task",
  },
  {
    name: "calendar",
    lbl: "Google calendar: (Optional)",
    ariaRq: false,
    type: "checkbox",
    ariaLabeInput: "Choose if add the task to your Google calendar",
  },
];
