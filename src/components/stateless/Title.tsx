import { Divider } from "@nextui-org/divider";
import clsx from "clsx";
import { FC } from "react";
import { subtitle, title } from "./primitives";

export interface TitleDividerProps {
  name: string;
}

export const TitleDivider: FC<TitleDividerProps> = ({ name }) => {
  return (
    <span className="flex items-center gap-2">
      <h5 className={clsx(title({ size: "card" }))}>{name}</h5>
      <Divider className="ml-1" />
    </span>
  );
};

export interface TitleTopProps {
  name: string;
  caption: string;
}

export const TitleTop: FC<TitleTopProps> = ({ name, caption }) => {
  return (
    <>
      <h2 className={clsx(title())}>{name}</h2>
      <h4 className={clsx(subtitle())}>{caption}</h4>
    </>
  );
};
