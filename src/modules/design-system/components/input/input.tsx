import React from "react";

import { InputProps } from "./input.types"

import "./input.scss";

export const Input = ({
  theme,
  type,
  placeholder
}: InputProps) => {
  return (
    <input 
      data-testid="input"
      className={`input input-${theme}`}
      type={type}
      placeholder={placeholder}
    />
  )
}