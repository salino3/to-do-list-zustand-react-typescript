import React from "react";
import { Outlet } from "react-router-dom";
import "./container-layout.styles.scss";

interface Props {
  children: React.ReactNode;
}

export const ContainerLayout: React.FC<Props> = ({ children }) => {
  return <main className="rootContainerLayout">{children}</main>;
};
