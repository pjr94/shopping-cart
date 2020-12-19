import React from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Collapsible from "react-collapsible";
// https://www.npmjs.com/package/react-collapsible

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
//const Handle = Slider.Handle;

export default function PriceSlider({ priceState, setPriceState }) {
  const handleRangeChange = (val) => {
    setPriceState(val);
  };

  return (
    <div className="filters">
      <Collapsible trigger="Price Range" open="true">
        <Range
          min={0}
          max={1000}
          defaultValue={priceState}
          tipFormatter={(x) => `${x}`}
          step={50}
          onAfterChange={handleRangeChange}
          className="range-slider"
        />
      </Collapsible>
    </div>
  );
}