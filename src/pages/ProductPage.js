import React from "react";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PROD_INFO } from "../GraphQL/ProductInfoQuerrie";
import ProductColors from "../components/ProductColors";
import ProductSizes from "../components/ProductSizes";
import DefaultProductAtribut from "../components/DefaultProductAtribut";
import { useContext } from "react";
import mainContext from "../context/mainContext";
import { Interweave } from "interweave";
import { addKey } from "../functions/functions";
import { getPrice } from "../functions/functions";
let productCopy;
function ProductPage() {
  const {
    selectedCurrency,
    basket,
    setBasket,
    productInfo,
    setProductInfo,
    setQty,
  } = useContext(mainContext);
  const { name } = useParams();

  const [mainImage, setMainImage] = useState();
  const [atributSelected, setAtributSelected] = useState(false);
  const [succesfullyAdded, setSuccesfullyAdded] = useState(false);
  const { loading, error, data } = useQuery(GET_SINGLE_PROD_INFO, {
    variables: { id: name },
  });
  useEffect(() => {
    if (loading) return console.log("Loading...");
    if (error) return console.log(`Error! ${error.message}`);
    if (data) {
      productCopy = addKey(data);

      setProductInfo(() => addKey(data));
      setMainImage(data.product.gallery[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function setAsMain(url) {
    setMainImage(url);
  }

  /* Function to check if there is a product in Cart with same atributes. If Yes adds Qty, if no adds new product to basket. */

  function sameOrDifferentCheck(item) {
    //All indexes of same product
    var results = [];
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === item.id) {
        results.push(i);
      }
    }
    //If there is no such item in basket, just add it:
    if (results.length === 0)
      return setBasket([...basket, JSON.parse(JSON.stringify(item))]);

    //
    let isSameAtribut = [];
    let isSameAtributIndex;

    for (let index of results) {
      //if ther is not atributes , just add qty to same product
      if (basket[index].attributes.length === 0)
        return (basket[index].qty = basket[index].qty + 1);

      //Cheking all atributs of same product,are they same or not. If same, add qty, if not, adding another prod with different atributes
      let check = basket[index].attributes.map((x, i) =>
        x.items.map(
          (y, j) => y.isSelected === item.attributes[i].items[j].isSelected
        )
      );
      for (let iter = 0; iter < check.length; iter++) {
        if (!check[iter].includes(false)) {
          isSameAtribut.push(index);
        } else {
          isSameAtribut.push("no");
        }
      }

      if (isSameAtribut.includes("no")) {
        isSameAtribut = [];
      } else {
        isSameAtributIndex = isSameAtribut[0];
        isSameAtribut = [];
      }
    }

    if (isSameAtributIndex >= 0) {
      basket[isSameAtributIndex].qty = basket[isSameAtributIndex].qty + 1;
    } else {
      setBasket([...basket, JSON.parse(JSON.stringify(item))]);
    }
  }

  function addToBasket() {
    // Checking, are all atributes selected? ===>
    const reply = productInfo.attributes.map((x) =>
      x.items.find((x) => x.isSelected === true)
    );
    const notSelectedAtr = reply.includes(undefined);
    if (notSelectedAtr) {
      setSuccesfullyAdded(false);
      setAtributSelected(true);
      return;
    } else {
      setAtributSelected(false);
      setSuccesfullyAdded(true);
      let tarpinis = { ...productInfo };
      // checking is added item have same atributs or it is different
      sameOrDifferentCheck(tarpinis);
      setProductInfo(productCopy);
    }
    let qtyCalculations = basket.map((x) => x.qty);
    let totalqty = qtyCalculations.reduce(function (a, b) {
      return a + b;
    }, 0);
    setQty(totalqty);
  }

  return (
    <div className="mainbox">
      <div className="smallImages">
        {productInfo &&
          productInfo.gallery.map((x, i) => (
            <div
              onClick={() => setAsMain(x)}
              className="singleSmallImg"
              style={{ backgroundImage: `url(${x})` }}
              key={i}
            ></div>
          ))}
      </div>
      <div
        className="mainImage"
        style={{ backgroundImage: `url(${mainImage})` }}
      ></div>
      {productInfo && (
        <div className="descriptionBox">
          <div className="brand">{productInfo.brand}</div>
          <div className="name">{productInfo.name}</div>
          <div className="atributes">
            {productInfo.attributes.map((x, i) => {
              if (x.id === "Color") {
                return <ProductColors key={i} atribut={x} index={i} />;
              }
              if (x.id === "Size") {
                return <ProductSizes key={i} atribut={x} index={i} />;
              } else {
                return <DefaultProductAtribut key={i} atribut={x} index={i} />;
              }
            })}
            {atributSelected && (
              <div className="alert">
                Please select all atributes beffore continue!
              </div>
            )}
          </div>

          <div className="itemPrice">PRICE:</div>

          {selectedCurrency.hasOwnProperty("label") ? (
            <div className="amount">
              {getPrice(productInfo, selectedCurrency)}
            </div>
          ) : null}

          <div onClick={addToBasket} className="addToCart">
            <p>ADD TO CART</p>
          </div>
          {succesfullyAdded && (
            <div className="greenAlert">Porduct was added to basket!</div>
          )}
          <div className="description">
            <Interweave content={productInfo.description} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
