import React from "react";
import cirkleIcon from "../CircleIcon.svg";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_SINGLE_PROD_INFO } from "../GraphQL/ProductInfoQuerrie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import mainContext from "../context/mainContext";
import { addKey, getPrice } from "../functions/functions";

function SingleProduct({ product }) {
  const [prodInfo, setProdInfo] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const nav = useNavigate();

  const { selectedCurrency, basket, setBasket, setQty } =
    useContext(mainContext);

  /* Sending Querry to GraphQl */
  const { loading, error, data } = useQuery(GET_SINGLE_PROD_INFO, {
    variables: { id: product.id },
  });
  /* Setting data from querry to state */
  useEffect(() => {
    if (loading) return console.log("Loading...");
    if (error) return console.log(`Error! ${error.message}`);
    if (data) {
      /* beffore setting a state ,adding additional keys to object (qty, isSelected) for handling qty and atribute change. */
      setProdInfo(() => addKey(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  function handleNavigateToProductPage() {
    nav("/productPage/" + prodInfo.id);
  }

  /* Function to check if there is a product in Cart with same atributes. If Yes adds Qty, if no adds new product to basket. */
  function sameOrDifferentCheck(item) {
    //all indexes of same product in arra result
    var results = [];
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === item.id) {
        results.push(i);
      }
    }
    //if there is no such item in basket, just add it:
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
    // Selecting first product atribut as selected
    prodInfo.attributes.map((x) => (x.items[0].isSelected = true));
    let tarpinis = { ...prodInfo };
    //Cheking if there is already product with same atributes in basket
    sameOrDifferentCheck(tarpinis);

    /* Updating basket Qty */
    let qtyCalculations = basket.map((x) => x.qty);
    let totalqty = qtyCalculations.reduce(function (a, b) {
      return a + b;
    }, 0);
    setQty(totalqty);
    /* Updating basket Qty */
  }

  return (
    <div
      className="productCard"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {prodInfo && (
        <div>
          <div
            onClick={handleNavigateToProductPage}
            className="image"
            style={{
              backgroundImage: `url(${prodInfo.gallery[0]})`,
            }}
          >
            {prodInfo.inStock ? null : (
              <div className="outOfStock">
                <div>OUT OF STOCK</div>
              </div>
            )}
          </div>
          <div className="circleIcon">
            <img
              onClick={prodInfo.inStock ? addToBasket : null}
              src={cirkleIcon}
              alt=""
              style={{ opacity: isHovering ? 1 : 0 }}
            />
          </div>
          <div className="leyout"></div>
          <div onClick={handleNavigateToProductPage} className="content">
            <p className="title">{prodInfo.name}</p>
            <p className="price">{getPrice(prodInfo, selectedCurrency)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
