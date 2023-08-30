import { ComponentProps } from "react";

export interface SVGProps extends Omit<ComponentProps<"svg">, "children"> {}
