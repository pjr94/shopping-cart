import React from "react";
import Collapsible from 'react-collapsible';
// https://www.npmjs.com/package/react-collapsible

export default function Cart({ cartState, setCartState }){

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