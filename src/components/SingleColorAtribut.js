import React from "react";
import { useContext } from "react";
import mainContext from "../context/mainContext";

function SingleColorAtribut({
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
    backgroundColor: atr.displayValue,
    border: "2px solid #5ECE7B",
  };
  const defaultStyle = { backgroundColor: atr.displayValue };
  return (
    <div
      onClick={fromCart ? handleAtributChangeInBasket : handleSelection}
      className={fromCart ? (fromBigCart ? "color" : "smallColor") : "color"}
      style={atr.isSelected ? selectedStyle : defaultStyle}
    ></div>
  );
}

export default SingleColorAtribut;
