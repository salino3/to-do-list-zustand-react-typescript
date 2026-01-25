import React, { lazy, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ContainerLayout } from "../layout";
import { routesApp } from ".";

interface PropsRoutes {
  path: string;
  element: JSX.Element;
  visibility: "public" | "private" | "restricted" | "admin";
}

const HomePage = lazy(() => import("../pods/home-page/home-page.component")); // with 'export default'
//
const lazyLoad = (importPromise: Promise<any>, exportName: string) => {
  const Fn = React.lazy(() =>
    importPromise.then((module) => ({ default: module[exportName] })),
  );
  return <Fn />;
};

const routes: PropsRoutes[] = [
  {
    path: routesApp?.root,
    element: <HomePage />,
    visibility: "public",
  },

  {
    path: routesApp?.detailsTodo(":id"),
    element: lazyLoad(
      import("../pods/details-todo-page/details-todo-page.component"),
      "DetailsTodoPage",
    ),
    visibility: "private",
  },

  {
    path: routesApp?.error404,
    element: <Navigate to={routesApp?.root} />,
    visibility: "public",
  },
];

export const AppRoutes: React.FC = () => {
  return (
    <ContainerLayout>
      <Routes>
        {routes &&
          routes?.length > 0 &&
          routes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })}
      </Routes>
    </ContainerLayout>
  );
};
