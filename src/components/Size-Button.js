import React from "react";


export default function SizeButton({ index, setSizeState, size, sizeState }) {
    let classStyle = "";
  
    // If button is selected
    if (sizeState === index) {
      classStyle = "size-selected";
    } else {
      classStyle = "not-selected";
    }
  
    return (
      <button className={`${classStyle}`} onClick={() => setSizeState(index)}>
        {size}
      </button>
    );
  }