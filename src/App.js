import React, { useState } from "react";

import "./App.css";
// import ReactDOM from 'react-dom';

// https://react-component.github.io/slider/
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// https://www.npmjs.com/package/react-toastify

import Cart from "./components/Cart";
import ProductTable from "./components/Product-Table"
import FiltersBox from "./components/Filters-Box"
import PriceSlider from "./components/Price-Slider"

// data
const products = [
  {
    catagory: "male",
    shape: "directional",
    price: 449.99,
    name: "Stalefish",
    size: [148, 153, 157],
    pic:
      "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-StalefishSnowboard-2020-2021.png?v=1599225319",
  },
  {
    catagory: "male",
    shape: "directional",
    price: 399.95,
    name: "Service Dog",
    size: [148, 153, 157],
    pic:
      "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-ServiceDogSnowboard-Flip-2020-2021_600x.png?v=1599223293",
  },
  {
    catagory: "male",
    shape: "twin",
    price: 619.99,
    name: "stale mod",
    size: [156],
    pic:
      "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-StaleModSnowboard-2020-2021_920x.png?v=1601996097",
  },
  {
    catagory: "male",
    shape: "directional",
    price: 579.99,
    name: "national",
    size: [152, 154, "157w", "162w"],
    pic: "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-NationalSnowboard-2020-2021_600x.png?v=1599220987",
  },
  {
    catagory: "female",
    shape: "twin",
    price: 399.99,
    name: "Heist",
    size: [139, 143, 147, 151],
    pic:
      "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-HeistSnowboard-Flip-2020-2021_600x.png?v=1599215465",
  },
  {
    catagory: "female",
    shape: "twin",
    price: 499.99,
    name: "Women's Ravine",
    size: [144, 147, 150, 153],
    pic:
      "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-Women_sRavineSnowboard-Flip-2020-2021_600x.png?v=1599227349",
  },
  {
    catagory: "youth",
    shape: "twin",
    price: 199.99,
    name: "minishred",
    size: [100, 110, 120],
    pic:
      "https://cdn.shopify.com/s/files/1/0370/4055/4115/products/Rome-MinishredSnowboard-2020-2021_920x.png?v=1599220776",
  },
];

const gender = [{ title: "Men" }, { title: "Women" }, { title: "Youth" }];

const shape = [{ title: "Directional" }, { title: "Twin" }];

function App() {
  // 0: none, 1: male, 2: women, 3: youth
  const [genderState, setGenderState] = useState([false, false, false]);
  const [shapeState, setShapeState] = useState([false, false]);
  const [priceState, setPriceState] = useState([1, 750]);
  const [cartState, setCartState] = useState([]);

  const handleGenderState = (index) => {
    // console.log("gender" + index);

    // Because arrays in JS are ref values, so copying just using = it will only copy the ref to original array
    let newState = [...genderState];
    newState[index] = !genderState[index];
    //console.log(newState);
    setGenderState(newState);
  };

  const handleShapeState = (index) => {
    let newState = [...shapeState];
    newState[index] = !shapeState[index];
    //console.log(newState);
    setShapeState(newState);
  };

  // How many ms notification show for
  toast.configure({
    autoClose: 1000,
  });

  return (
    <div>
      <Cart cartState={cartState} setCartState={setCartState} />
      <div className="app">
        <div>
          <FiltersBox
            name="Gender"
            catagory={gender}
            handleState={handleGenderState}
          />
          <FiltersBox
            name="Shape"
            catagory={shape}
            handleState={handleShapeState}
          />
          <PriceSlider priceState={priceState} setPriceState={setPriceState} />
        </div>

        <ProductTable
          className="product-table"
          cartState={cartState}
          setCartState={setCartState}
          products={products}
          genderState={genderState}
          shapeState={shapeState}
          priceState={priceState}
        />
      </div>
    </div>
  );
}

export default App;
