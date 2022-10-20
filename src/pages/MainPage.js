import React from "react";
import { useContext, useEffect } from "react";
import mainContext from "../context/mainContext";
import SingleProduct from "../components/SingleProduct";

function MainPage() {
  const { selectedCategory, products, setProductInfo } =
    useContext(mainContext);
  useEffect(() => {
    setProductInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainProductContainer">
      <div className="Title">
        {selectedCategory[0].toUpperCase() + selectedCategory.slice(1)}
      </div>
      <div className="productContainer">
        {products &&
          products.map((x, i) => <SingleProduct key={i} product={x} />)}
      </div>
    </div>
  );
}

export default MainPage;
