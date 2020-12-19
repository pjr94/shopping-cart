import React from "react";

import Collapsible from "react-collapsible";
// https://www.npmjs.com/package/react-collapsible
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
// https://www.npmjs.com/package/rc-checkbox

export default function FiltersBox({ name, catagory, handleState }) {
    // Index + 1 as 0 is all products
    return (
      <div className="filters">
        <Collapsible trigger={name} open="true">
          {catagory.map((option, index) => (
            <p>
              <Checkbox
                onClick={() => {
                  handleState(index);
                }}
              />{" "}
              {option.title}
            </p>
          ))}
        </Collapsible>
      </div>
    );
  }