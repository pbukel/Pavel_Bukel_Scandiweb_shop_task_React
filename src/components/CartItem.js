import React from "react";
import ProductColors from "../components/ProductColors";
import ProductSizes from "../components/ProductSizes";
import DefaultProductAtribut from "../components/DefaultProductAtribut";
import { useContext } from "react";
import mainContext from "../context/mainContext";
import { getPrice } from "../functions/functions";

function CartItem({ product, productInBasketIndex }) {
  const { selectedCurrency, basket, setBasket } = useContext(mainContext);

  function plus() {
    const newState = [...basket];
    newState[productInBasketIndex].qty = newState[productInBasketIndex].qty + 1;
    setBasket(newState);
  }

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
    <div className="cartItem">
      <div className="descriptionCart">
        <div className="frame3">
          <div className="prodTitle">{`${product.brand} ${product.name}`}</div>
          {selectedCurrency ? (
            <div className="prodPrice">
              {getPrice(product, selectedCurrency)}
            </div>
          ) : null}
        </div>

        <div className="atributesSmallCart">
          {product.attributes.map((x, i) => {
            if (x.id === "Color") {
              return (
                <ProductColors
                  key={i}
                  atribut={x}
                  index={i}
                  fromCart={true}
                  productInBasketIndex={productInBasketIndex}
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
                />
              );
            }
          })}
        </div>
      </div>
      <div className="controlQty">
        <button onClick={plus} className="plus">
          +
        </button>
        <div className="qty">{product.qty}</div>
        <button onClick={minus} className="minus">
          -
        </button>
      </div>
      <div
        className="smallCartPhoto"
        style={{ backgroundImage: `url(${product.gallery[0]})` }}
      ></div>
    </div>
  );
}

export default CartItem;
