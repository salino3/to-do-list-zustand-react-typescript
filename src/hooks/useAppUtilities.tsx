import type { ITodoItem } from "../store";

export const useAppUtilities = () => {
  //
  const fnPromise = (data: any) =>
    new Promise((resolve) => {
      resolve(data);
    });

  //
  const dateConverter = (dateValue: number | null) => {
    return dateValue && new Date(dateValue ?? 0).toISOString().slice(0, 16);
  };

  //
  const generateGoogleCalendarUrl = (todo: ITodoItem) => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    
    // Format dates: Remove dashes, colons, and add 'Z' (UTC)
    // Input: "2026-02-05T16:38" -> Output: "20260205T163800Z"
    const formatForGoogle = (dateStr: string | number) => {
      const d = new Date(dateStr);
      return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };
  
    const start = formatForGoogle(todo.reminderDate ?? 0);
    // For a simple reminder, we can just make the end time 30 mins later
    const end = formatForGoogle(Number(todo.reminderDate ?? 0) + 30 * 60000);
  
    const params = new URLSearchParams({
      text: todo.nameTodo,
      dates: `${start}/${end}`,
      details: "Created from my Todo App",
      sf: "true",
      output: "xml",
    });
  
    return `${baseUrl}&${params.toString()}`;
  };

  return { fnPromise, dateConverter , generateGoogleCalendarUrl};
};
