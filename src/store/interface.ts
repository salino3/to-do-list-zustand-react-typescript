export interface PriorityPros {
  priority: "low" | "medium" | "high";
}

export interface ITodoItem {
  id: string; // Changed to string for UUIDs
  nameTodo: string;
  topic: string;
  status?: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null; // Nullable if not yet finished
  updatedAt: number | null;

  // Contact & Location Info
  place?: string;
  email?: string;
  tel?: string;
  web?: string;

  // Content
  description?: string;
  note?: string;

  // Scheduling
  reminderDate?: number | null;
  priority: "low" | "medium" | "high"; // Added for better sorting

  // Metadata
  tags?: string[]; // Added for filtering
}

export type ITodoFormState = ITodoItem & {
  calendar: boolean;
};

export interface PropsProvider {
  todoList: ITodoItem[];
  addTodo: (todo: ITodoFormState) => Promise<false | void | Window | null>;
  setTodo: (todo: ITodoItem) => void;
  updateDataTodo: (todo: ITodoItem) => void;
  deleteTodo: (id: string) => void;
}

export interface FilterFormTable {
  nameTodo: string;
  web: string;
  tel: string;
  priority: "low" | "medium" | "high";
  startReminderDate: number | null;
  endReminderDate: number | null;
  place: string;
  completed: boolean | null;
}

//
export interface Content {
  key: string;
  text: string;
}

export interface SelectList {
  optgroup: string;
  content: Content[];
}

export interface ListInput {
  name: string;
  selectList?: SelectList[];
  ariaRq: boolean;
  click?:
    | ((e: React.MouseEvent<HTMLSelectElement> | undefined) => void)
    | undefined;
  pl?: string;
  lbl: string;
  type: string;
  ariaLabeInput: string;
}
