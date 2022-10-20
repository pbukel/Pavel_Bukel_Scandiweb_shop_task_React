import React from "react";
import SingleColorAtribut from "./SingleColorAtribut";

function ProductColors({
  atribut,
  index,
  fromCart,
  productInBasketIndex,
  fromBigCart,
}) {
  return (
    <div>
      <div
        className={
          fromCart
            ? fromBigCart
              ? "atributName"
              : "smallAtributName"
            : "atributName"
        }
      >
        {atribut.id.toUpperCase()}:
      </div>
      <div className="sizesContainer">
        {atribut.items.map((x, i) => (
          <SingleColorAtribut
            key={i}
            atr={x}
            atributIndex={index}
            atributValueIndex={i}
            fromSmallCart={fromCart}
            productInBasketIndex={productInBasketIndex}
            fromBigCart={fromBigCart}
            fromCart={fromCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductColors;
