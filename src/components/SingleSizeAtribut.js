import React from "react";
import { useContext } from "react";
import mainContext from "../context/mainContext";

function SingleSizeAtribut({
  atr,
  atributIndex,
  atributValueIndex,
  fromCart,
  productInBasketIndex,
  fromBigCart,
}) {
  const { productInfo, setProductInfo, basket, setBasket } =
    useContext(mainContext);
  function handleSelection() {
    let newParams = { ...productInfo };
    newParams.attributes[atributIndex].items.map((x) => (x.isSelected = false));
    newParams.attributes[atributIndex].items[
      atributValueIndex
    ].isSelected = true;
    setProductInfo(newParams);
  }
  function handleAtributChangeInBasket() {
    let updatedProduct = { ...basket[productInBasketIndex] };

    updatedProduct.attributes[atributIndex].items.map(
      (x) => (x.isSelected = false)
    );
    updatedProduct.attributes[atributIndex].items[
      atributValueIndex
    ].isSelected = true;
    let tarpinis = [...basket];
    tarpinis[productInBasketIndex] = updatedProduct;
    setBasket(tarpinis);
  }

  const selectedStyle = {
    backgroundColor: "#1D1F22",
    color: "#FFFFFF",
  };
  return (
    <div
      className={fromCart ? (fromBigCart ? "size" : "smallSize") : "size"}
      onClick={fromCart ? handleAtributChangeInBasket : handleSelection}
      style={atr.isSelected ? selectedStyle : null}
    >
      {atr.displayValue}
    </div>
  );
}

export default SingleSizeAtribut;
