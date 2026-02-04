export const initialTableFilters = {
  nameTodo: "",
  web: "",
  tel: "",
  priority: "low",
  startReminderDate: null,
  endReminderDate: null,
  place: "",
  completed: null,
};

export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const intialValuesTodoForm = {
  id: "",
  nameTodo: "",
  topic: "",
  status: "",
  completed: false,
  createdAt: 0,
  completedAt: null,
  updatedAt: null,
  place: "",
  email: "",
  tel: "",
  web: "",
  description: "",
  note: "",
  reminderDate: null,
  priority: Priority.LOW,
  tags: [],
  calendar: false,
};
