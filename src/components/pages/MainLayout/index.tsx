import { FC, ReactNode } from "react";
import NavBar from "../../sections/NavBar";

interface PropType {
  children: JSX.Element;
}

export const MainLayout = ({ children }: PropType) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
