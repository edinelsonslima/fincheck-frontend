import { ComponentProps } from "react";

type OmitChildren<T> = Omit<T, "children">;

export interface SVGProps extends OmitChildren<ComponentProps<"svg">> {}
export interface SelectProps extends OmitChildren<ComponentProps<"select">> {}
export interface ButtonProps extends OmitChildren<ComponentProps<"button">> {}
