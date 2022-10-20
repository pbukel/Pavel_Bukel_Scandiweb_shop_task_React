import React from "react";
import mainContext from "../context/mainContext";
import { useContext } from "react";
import BigCartItem from "../components/BigCartItem";

function BagPage() {
  const { basket, totalAmount, selectedCurrency, qty } =
    useContext(mainContext);

  return (
    <div className="cartPage">
      <div className="cartName">CART</div>
      {basket.map((x, i) => (
        <BigCartItem key={i} product={x} productInBasketIndex={i} />
      ))}
      <div className="calculations">
        <div className="calcDataPlace">
          <div className="orderCalculations">
            <div className="tax">
              Tax 21%:{" "}
              <span>
                {selectedCurrency.symbol}
                {(totalAmount - totalAmount / 1.21).toFixed(2)}
              </span>
            </div>
            <div className="tax">
              Quantity: <span>{qty}</span>
            </div>
            <div className="tax">
              Total:
              <span>
                {selectedCurrency.symbol}
                {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <button className="order">ORDER</button>
        </div>
      </div>
    </div>
  );
}

export default BagPage;
