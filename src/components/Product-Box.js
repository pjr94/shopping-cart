import React from "react"
import SizeButton from "./Size-Button"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// https://www.npmjs.com/package/react-toastify

export default function ProductBox({ product, setCartState, cartState }) {
    // 0 means none chosen
    const [sizeState, setSizeState] = React.useState("");
  
    // Notifications
    const notifyAdded = () => toast("Added to Cart");
    const notifySelectSize = () => toast("Select a board size");
  
    const handleAddtoCart = (product, size) => {
      // Ensure something valid is selected
      if (size !== "") {
        notifyAdded();
  
        let newState = [...cartState];
        newState.push({ prod: product, sizeNo: size });
        setCartState(newState);
      } else notifySelectSize();
    };

  return (
    <div className="product-card">
      <img className="board-pic" src={product.pic} alt={product.name}></img>
      <h1>{product.name}</h1>
      <h2 className="price">£{product.price}</h2>

      <p>
        {product.size.map((size, index) => (
          <SizeButton
            index={index}
            sizeState={sizeState}
            setSizeState={setSizeState}
            size={size}
          />
        ))}
      </p>
      <button
        className="add-cart"
        onClick={() => handleAddtoCart(product, sizeState)}
      >
        Add to Cart
      </button>
    </div>
  );
}