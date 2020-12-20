import React from "react"

import ProductBox from "./Product-Box"


export default function ProductTable({
    cartState,
    setCartState,
    products,
    genderState,
    shapeState,
    priceState,
  }) {
    let filteredProducts = [];
  
    const allAreFalse = (state) => {
      let result = true;
      for (let i = 0; i < state.length; i++) {
        if (state[i] === true) {
          result = false;
          break;
        }
      }
      return result;
    };
  
    // console.log(genderState);
    // result true means all filters are false / empty
    let result = allAreFalse(genderState);
  
    // If every filter of gender state is false, else true
    if (result === true) {
      filteredProducts = products;
      //console.log(result);
    } else {
      // Add those products that fit the catagory
      for (let j = 0; j < products.length; j++) {
        //console.log("cat" + products[j].catagory);
        switch (products[j].catagory) {
          case "male":
            if (genderState[0] === true) {
              filteredProducts.push(products[j]);
            }
            break;
  
          case "female":
            if (genderState[1] === true) {
              filteredProducts.push(products[j]);
            }
            break;
  
          case "youth":
            if (genderState[2] === true) {
              filteredProducts.push(products[j]);
            }
            break;
            
          default:// None
        }
      }
    }
  
    // Same again for Shape
    result = allAreFalse(shapeState);
    let reFilteredProducts = [];
    // console.log(filteredProducts + result);
    if (result !== true) {
      for (let i = 0; i < filteredProducts.length; i++) {
        switch (filteredProducts[i].shape) {
          case "directional":
            if (shapeState[0] === true) {
              reFilteredProducts.push(filteredProducts[i]);
            }
            break;
          case "twin":
            if (shapeState[1] === true) {
              reFilteredProducts.push(filteredProducts[i]);
            }
            break;
          default: // None
        }
      }
    } else {
      reFilteredProducts = filteredProducts;
    }
  
    // Aaaand same again for price
    let finalProducts = [];
    for (let i = 0; i < reFilteredProducts.length; i++) {
      // Less that max price and more than min
      if (
        reFilteredProducts[i].price < priceState[1] &&
        reFilteredProducts[i].price > priceState[0]
      ) {
        finalProducts.push(reFilteredProducts[i]);
      }
    }
  

    // console.log(reFilteredProducts)
    return (
      <div className="product-table">
        {finalProducts.map((product, index) => (
          <ProductBox
            key={index}
            index={index}
            product={product}
            setCartState={setCartState}
            cartState={cartState}
          />
        ))}
      </div>
    );
  }