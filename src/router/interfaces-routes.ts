interface Routes {
  root: string;
  detailsTodo: (id: string) => string;
  createTodo: string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/to-do-list-zustand-react-typescript",
  detailsTodo: (id: string) =>
    `/to-do-list-zustand-react-typescript/details/${id}`,
  createTodo: `/to-do-list-zustand-react-typescript/details`,
  error404: "*",
};
