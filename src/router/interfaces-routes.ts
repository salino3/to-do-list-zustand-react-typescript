interface Routes {
  root: string;
  detailsTodo: (id: string) => string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/to-do-list-zustand-react-typescript",
  detailsTodo: (id: string) =>
    `/to-do-list-zustand-react-typescript/details/${id}`,
  error404: "*",
};
