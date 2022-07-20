import { ReactNode } from "react"

export interface InputProps {
    theme: "default" | "disabled"
    type: string
    placeholder?: string
}