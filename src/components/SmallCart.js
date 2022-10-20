import React from "react";
import mainContext from "../context/mainContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function SmallCart({ setShowSmallCart }) {
  const nav = useNavigate();
  function navigateToBag() {
    setShowSmallCart(false);
    nav("/bag");
  }
  const { basket, totalAmount, selectedCurrency } = useContext(mainContext);
  return (
    <div className="smallCartBox">
      <div className="frame12">
        <div className="smallCartName">My bag. {basket.length} items</div>
        {basket.map((x, i) => (
          <CartItem key={i} product={x} productInBasketIndex={i} />
        ))}
        <div className="group405">
          <div>Total</div>
          <div>
            {selectedCurrency.symbol}
            {totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="frame13">
        <button onClick={navigateToBag} className="viewBag">
          VIEW BAG
        </button>
        <button className="checkOut">CHEKC OUT</button>
      </div>
    </div>
  );
}

export default SmallCart;
