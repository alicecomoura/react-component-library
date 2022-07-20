import React from "react";

import { SearchInputButtonProps } from "./search-input-button.types"

import "./search-input-button.scss";

export const SearchInputButton = ({
  theme,
  type,
  placeholder
}: SearchInputButtonProps) => {
  return (
    // <input 
    //   data-testid="search-input-button"
    //   className={`search-input-button search-input-button-${theme}`}
    //   type={type}
    //   placeholder={placeholder}
    // />
    <div className="search-input-button">
      <div className="search-bar">
        <input/>
        <div className="icon">
          
        </div>
      </div>
    </div>
  )
}