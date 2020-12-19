import React from "react";

//import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Collapsible from "react-collapsible";
// https://www.npmjs.com/package/react-collapsible

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
//const Handle = Slider.Handle;

export default function PriceSlider({ priceState, setPriceState }) {
  const handleRangeChange = (val) => {
    setPriceState(val);
  };
  /*
<Range
          min={0}
          max={1000}
          defaultValue={priceState}
          tipFormatter={(x) => `${x}`}
          step={50}
          onAfterChange={handleRangeChange}
          className="range-slider"
        />
        */
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