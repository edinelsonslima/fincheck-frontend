import { ComponentProps } from "react";

type OmitChildren<T> = Omit<T, "children">;

export interface ISVGProps extends OmitChildren<ComponentProps<"svg">> {}
export interface ISelectProps extends OmitChildren<ComponentProps<"select">> {}
export interface IButtonProps extends OmitChildren<ComponentProps<"button">> {}
