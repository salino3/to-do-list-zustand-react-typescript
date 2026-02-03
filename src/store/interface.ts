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

export interface PropsProvider {
  todoList: ITodoItem[];
  addTodo: (todo: ITodoItem) => void;
  setTodo: (todo: ITodoItem) => void;
  updateDataTodo: (todo: ITodoItem) => void;
  deleteTodo: (id: string) => void;
}

export interface FilterFormTable {
  nameTodo: string;
  web: string;
  tel: string;
  priority: "low" | "medium" | "high";
  reminderDate: number | null;
  place: string;
  completed: boolean | null;
}
