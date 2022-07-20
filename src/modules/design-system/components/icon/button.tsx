import React from "react";

import { ButtonProps } from "./button.types"

import "./button.scss";

export const Button = ({ theme, children }: ButtonProps) => {
  return (
    <button 
      data-testid="button"
      className={`button button-${theme}`}
    >
      {children}
    </button>
  )
}