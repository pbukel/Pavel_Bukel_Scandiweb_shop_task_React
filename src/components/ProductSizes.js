import React from "react";
import SingleSizeAtribut from "./SingleSizeAtribut";

function ProductSizes({
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
          <SingleSizeAtribut
            key={i}
            atr={x}
            atributIndex={index}
            atributValueIndex={i}
            fromCart={fromCart}
            productInBasketIndex={productInBasketIndex}
            fromBigCart={fromBigCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSizes;
