import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "./GraphQL/ProductQuerrie";
import { GET_CATEGORIES } from "./GraphQL/CategoriesQuerrie";
import { useState, useEffect } from "react";
import mainContext from "./context/mainContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import BagPage from "./pages/BagPage";

function App() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [basket, setBasket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [qty, setQty] = useState();
  const [showSmallCart, setShowSmallCart] = useState(false);
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    let SingleSumCaluclations = basket.map(
      (x) =>
        x.qty *
        x.prices.find((x) => x.currency.label === selectedCurrency.label).amount
    );
    let qtyCalculations = basket.map((x) => x.qty);

    let totalqty = qtyCalculations.reduce(function (a, b) {
      return a + b;
    }, 0);

    let sum = SingleSumCaluclations.reduce(function (a, b) {
      return a + b;
    }, 0);
    setQty(totalqty);
    setTotalAmount(sum);
  }, [setBasket, selectedCurrency, basket]);

  const state = {
    products,
    setProducts,
    selectedCategory,
    setSelectedCategory,
    categories,
    setCategories,
    selectedCurrency,
    setSelectedCurrency,
    basket,
    setBasket,
    productInfo,
    setProductInfo,
    totalAmount,
    setTotalAmount,
    qty,
    setQty,
    showSmallCart,
    setShowSmallCart,
  };
  // Fetching dat a to get categories
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(GET_CATEGORIES);
  // Fetching data to get products based on categories, that already received.
  const [
    fetchSecondQueryData,
    {
      data: secondQueryData,
      loading: secondQueryLoading,
      error: secondQueryError,
    },
  ] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    if (categoriesLoading) return console.log("Loading...");
    if (categoriesError)
      return console.log(`Error! ${categoriesError.message}`);
    if (categoriesData) {
      setCategories(categoriesData.categories);
      setSelectedCategory(categoriesData.categories[0].name);
      fetchSecondQueryData({
        variables: { categorie: selectedCategory },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesData]);

  useEffect(() => {
    if (secondQueryLoading) return console.log("Loading...");
    if (secondQueryError)
      return console.log(`Error! ${secondQueryError.message}`);
    if (secondQueryData) {
      setProducts(secondQueryData.category.products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondQueryData]);

  return (
    <div className="App">
      <mainContext.Provider value={state}>
        <BrowserRouter>
          {categories && <Header />}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/productPage/:name" element={<ProductPage />} />
            <Route path="/bag" element={<BagPage />} />
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
      {showSmallCart && <div className="inactiveShop"></div>}
    </div>
  );
}

export default App;
