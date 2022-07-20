import { ReactNode } from "react";
export interface ButtonProps {
    theme: "default" | "warning" | "danger" | "disabled" | "success";
    children: ReactNode;
}
