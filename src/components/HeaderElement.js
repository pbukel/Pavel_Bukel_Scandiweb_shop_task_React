import React from "react";
import { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../GraphQL/ProductQuerrie";
import mainContext from "../context/mainContext";
import { useNavigate } from "react-router-dom";

function HeaderElement({ header_category }) {
  const nav = useNavigate();
  const { selectedCategory, setSelectedCategory, setProducts } =
    useContext(mainContext);

  /* Handling change of category and loading data based on selected category ==>  */
  const [
    fetchSecondQueryData,
    {
      data: secondQueryData,
      loading: secondQueryLoading,
      error: secondQueryError,
    },
  ] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    if (secondQueryLoading) return console.log("Loading...");
    if (secondQueryError)
      return console.log(`Error! ${secondQueryError.message}`);
    if (selectedCategory === header_category || header_category === undefined) {
      return;
    } else {
      fetchSecondQueryData({
        variables: { categorie: selectedCategory },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    if (secondQueryData) {
      setProducts(secondQueryData.category.products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondQueryData]);

  /*  <=== Handling change of category and loading data based on selected category  */

  function categoryChange() {
    setSelectedCategory(header_category);
    nav("/");
  }

  const selectedStyle = {
    background: "#5ECE7B",
  };
  const selecteTextdStyle = {
    color: "#5ECE7B",
  };

  return (
    <div className="headerElement">
      <div
        className="Padding_left"
        style={selectedCategory === header_category ? selectedStyle : null}
      ></div>
      <div className="Label">
        <div
          onClick={categoryChange}
          className="InsideLabel"
          style={
            selectedCategory === header_category ? selecteTextdStyle : null
          }
        >
          <p>{header_category}</p>
        </div>
        <div
          className="Border"
          style={selectedCategory === header_category ? selectedStyle : null}
        ></div>
      </div>
      <div
        className="Padding_right"
        style={selectedCategory === header_category ? selectedStyle : null}
      ></div>
    </div>
  );
}

export default HeaderElement;
