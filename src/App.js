import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
// https://www.npmjs.com/package/react-collapsible
import './App.css';
// import ReactDOM from 'react-dom';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
// https://www.npmjs.com/package/rc-checkbox
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// https://react-component.github.io/slider/
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// https://www.npmjs.com/package/react-toastify
/*
FiltersBox
-FilterCatagories
--CatagoryOption
--PriceSlider
Cart
ProductTable
-ProductBox
*/



function SizeButton({ index, setSizeState, size, sizeState}){
  let classStyle = "";

  // If button is selected
  if (sizeState === index){
    classStyle="size-selected";
  } else {
    classStyle="not-selected";
  }

return(
  <button className={`${classStyle}`} onClick={() => setSizeState(index)}>
    {size}
    </button>
);
}

function ProductBox({ product, setCartState, cartState }){
  // 0 means none chosen
  const [sizeState, setSizeState] = useState("");

  const notifyAdded = () => toast("Added to Cart");
  const notifySelectSize = () => toast("Select a board size");

  const handleAddtoCart = (product, size) =>{
    if (size !== ""){
      notifyAdded();
      
      let newState = [...cartState];
      newState.push({prod: product, sizeNo: size});
      setCartState(newState);
    }
    else
      notifySelectSize();
  };

// Label tells browser everything contained should be treated as one
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
      <button className="add-cart" onClick={() => handleAddtoCart(product, sizeState)}>Add to Cart</button>
    </div>
  )
  
}

function ProductTable({ cartState, setCartState, products, genderState, shapeState, priceState }){
  let filteredProducts = [];

  const allAreFalse = state => {
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
  // result true means all filters are false
  let result = allAreFalse(genderState);

  // If every filter of gender state is false, else true
  if (result === true){
    filteredProducts = products;
    //console.log(result);
  } else {
     // Add those products that fit the catagory
    for (let j = 0; j < products.length; j++){
      //console.log("cat" + products[j].catagory);
      switch (products[j].catagory){

        case "male":
          if(genderState[0] === true){
            filteredProducts.push(products[j]);
          }
          break;

        case "female":
          if (genderState[1] === true){
            filteredProducts.push(products[j]);
          }
          break;

        case "youth":
          if (genderState[2] === true){
            filteredProducts.push(products[j]);
          }
          break;
      }
    }
  }

  // Same again for Shape
  result = allAreFalse(shapeState);
  let reFilteredProducts = [];
 // console.log(filteredProducts + result);
  if (result !== true){
    
    for (let i = 0; i < filteredProducts.length; i++){
        switch(filteredProducts[i].shape){
          case "directional":
            if (shapeState[0] === true){
              reFilteredProducts.push(filteredProducts[i]);
            }
          break;
          case "twin":
            if (shapeState[1] === true){
              reFilteredProducts.push(filteredProducts[i]);
            }
            break;
        }
    }
  } else {
    reFilteredProducts = filteredProducts;
  }

  // Aaaand same again for price
  let finalProducts = [];
  for (let i = 0; i < reFilteredProducts.length; i++){
    // Less that max price and more than min
    if (reFilteredProducts[i].price < priceState[1] && reFilteredProducts[i].price > priceState[0]){
    finalProducts.push(reFilteredProducts[i]);
    }
  }
  
  // There's probably a better way of doing all this filtering :)

// console.log(reFilteredProducts)
  return(
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
  )
}
/*
function ItemsSort(){

}
*/
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);
  const Handle = Slider.Handle;
  
function PriceSlider({ priceState, setPriceState }){

  const handleRangeChange = val => {
    setPriceState(val);
  };

  return (
    <div className="filters">
      <Collapsible trigger="Price Range" open="true">
         <Range 
        min={0}
        max={1000}
        defaultValue={priceState}
        tipFormatter={x => `${x}`}
        step={50}

        onAfterChange={handleRangeChange}
        className="range-slider"

      />
      </Collapsible>
     
    </div>
  );
}

function FiltersBox({name, catagory, handleState}){

  // Index + 1 as 0 is all products
  return(
    <div className="filters">
      <Collapsible trigger={name} open="true">
        
        {catagory.map((option, index) => ( 
          <p>
            <Checkbox onClick={() => {handleState(index)}}/> 
            {' '}{option.title}
          </p>
        ))}
      </Collapsible>

    </div>
  )
}

function Cart({ cartState, setCartState }){

const deleteItem = (index) => {

  let newState = [...cartState];
  newState.splice(index, 1);

  setCartState(newState);
};

  let total = 0;
  for (let i = 0; i < cartState.length; i++){
    total = total + cartState[i].prod.price;
  }

  return (
    <div className="cart">
      <Collapsible trigger="View Cart" overflowWhenOpen="auto">
        <p>Total: £{total}</p>
        {cartState.map((item, index) => (
          <p>
            {item.prod.name} {item.prod.size[item.sizeNo]} {' '}
            <button className="delete" onClick={() => deleteItem(index)}>x</button>{' '}
            £{item.prod.price}
          </p>
          
        ))}
      </Collapsible>
    </div>
  )
}

function App() {
  // 0: none, 1: male, 2: women, 3: youth
  const [genderState, setGenderState] = useState([false, false, false]);
  const [shapeState, setShapeState] = useState([false, false]);
  const [priceState, setPriceState] = useState([1, 750]);
  const [cartState, setCartState] = useState([]);

  const products = [
    {catagory: "male", shape: "directional", price: 748.99, name: "powder room", size: [150],
  pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_POWDER_DIVISION_SPLIT.png"},
    {catagory: "male", shape: "directional", price: 649.99, name: "blur", size: [153, 156, 159],
  pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_MOUNTAIN_DIVISION.png"},
    {catagory: "male", shape: "twin", price: 619.99, name: "stale mod", size: [156],
  pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_MOD_STALE.png"},
    {catagory: "male", shape: "directional", price: 579.99, name: "national", size: [152, 154, "157w", "162w"],
  pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_WINTERLAND.png"},
    {catagory: "female", shape: "twin", price: 519.99, name: "ozzy buckshot", size: [154, 155],
    pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_RAVINE_ALEK.png"},
    {catagory: "female", shape: "twin", price: 519.99, name: "alek ravine", size: [155, 157],
  pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_RAVINE.png"},
    {catagory: "youth", shape: "twin", price: 199.99, name: "minishred", size: [110, 115, 125],
  pic: "https://www.romesnowboards.com/images?image=media/20_BOARD_ROME_MINISHRED.png"}
  ];
  
  const gender = [
    {title: "Men"},
    {title: "Women"},
    {title: "Youth"}
  ];

  const shape = [
    {title: "Directional"}, 
    {title: "Twin"}
  ];
  const catagories = [{gender}, {shape}];

  const handleGenderState = index => {
   // console.log("gender" + index);
    
   // Because arrays in JS are ref values, so copying just using = it will only copy the ref to original array
    let newState = [...genderState];
    newState[index] = !genderState[index];
    //console.log(newState);
    setGenderState(newState);
  };

  const handleShapeState = index => {
    let newState = [...shapeState];
    newState[index] = !shapeState[index];
    //console.log(newState);
    setShapeState(newState);
  };        

  toast.configure({
    autoClose: 2000
  });

  return (
    <div>
      <Cart cartState={cartState} setCartState={setCartState}/>
      <div className="app">
        
        <div>
          <FiltersBox name="Gender" catagory={gender} handleState={handleGenderState}/>
          <FiltersBox name="Shape" catagory={shape} handleState={handleShapeState}/> 
          <PriceSlider priceState={priceState} setPriceState={setPriceState}/>
        </div>
         
        <ProductTable cartState={cartState} setCartState={setCartState} products={products} genderState={genderState} shapeState={shapeState} priceState={priceState}/>
      </div>
      
    </div>

  );
}

export default App;

