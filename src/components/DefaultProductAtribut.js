import React from "react";
import SingleDefaultAtribut from "./SingleDefaultAtribut";

function DefaultProductAtribut({
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
          <SingleDefaultAtribut
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

export default DefaultProductAtribut;
