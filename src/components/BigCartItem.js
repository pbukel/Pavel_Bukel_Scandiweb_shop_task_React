import React from "react";
import { useContext, useState } from "react";
import mainContext from "../context/mainContext";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import DefaultProductAtribut from "./DefaultProductAtribut";
import toLeft from "../VectorLeft.svg";
import toRight from "../VectorRight.svg";

function BigCartItem({ product, productInBasketIndex }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { selectedCurrency, basket, setBasket } = useContext(mainContext);
  function getPrice() {
    const price = product.prices.find(
      (x) => x.currency.label === selectedCurrency.label
    );
    return `${selectedCurrency.symbol}${price.amount}`;
  }
  /* Picture sliding setup */
  const slideStyles = {
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  // Go to previous picture
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? product.gallery.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  // Go to next picture
  const goToNext = () => {
    const isLastSlide = currentIndex === product.gallery.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  // Changing picture
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${product.gallery[currentIndex]})`,
  };
  /* Picture sliding setup */

  // Add prod qty
  function plus() {
    const newState = [...basket];
    newState[productInBasketIndex].qty = newState[productInBasketIndex].qty + 1;
    setBasket(newState);
  }
  // Minnus prod qty
  function minus() {
    const newState = [...basket];
    newState[productInBasketIndex].qty = newState[productInBasketIndex].qty - 1;
    if (newState[productInBasketIndex].qty === 0) {
      newState.splice(productInBasketIndex, 1);
      setBasket(newState);
    }
    setBasket(newState);
  }

  return (
    <div className="BigCartItem">
      <div className="mainCartProductInfo">
        <div className="brand">{product.brand}</div>
        <div className="name inMainCart">{product.name}</div>

        {selectedCurrency ? (
          <div className="amount m10">{getPrice()}</div>
        ) : null}
        <div className="atributes">
          {product.attributes.map((x, i) => {
            if (x.id === "Color") {
              return (
                <ProductColors
                  key={i}
                  atribut={x}
                  index={i}
                  fromCart={true}
                  productInBasketIndex={productInBasketIndex}
                  fromBigCart={true}
                />
              );
            }
            if (x.id === "Size") {
              return (
                <ProductSizes
                  key={i}
                  atribut={x}
                  index={i}
                  fromCart={true}
                  productInBasketIndex={productInBasketIndex}
                  fromBigCart={true}
                />
              );
            } else {
              return (
                <DefaultProductAtribut
                  key={i}
                  atribut={x}
                  index={i}
                  fromCart={true}
                  productInBasketIndex={productInBasketIndex}
                  fromBigCart={true}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="qtyImage">
        <div className="qtyControl">
          <button onClick={plus} className="mainCartplus">
            +
          </button>
          <div className="qty">{product.qty}</div>
          <button onClick={minus} className="mainCartMinus">
            -
          </button>
        </div>
        <div className="mainCartImage" style={slideStylesWidthBackground}>
          {product.gallery.length > 1 ? (
            <div className="pictureSwitch">
              <div onClick={goToPrevious} className="toLeft">
                <img src={toLeft} alt="" />
              </div>
              <div onClick={goToNext} className="toRigth">
                <img src={toRight} alt="" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default BigCartItem;
