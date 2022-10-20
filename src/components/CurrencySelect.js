import React, { useState, useRef, useEffect } from "react";
import mainContext from "../context/mainContext";
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENCIES } from "../GraphQL/CurrencyQuerry";
import SingleCurrency from "./SingleCurrency";

function CurrencySelect() {
  const [allcurrency, setAllCurrency] = useState();
  const { selectedCurrency, setSelectedCurrency } = useContext(mainContext);
  const [showCurrency, setShowCurrency] = useState(false);
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  useEffect(() => {
    if (loading) return console.log("Loading...");
    if (error) return console.log(`Error! ${error.message}`);
    if (data) {
      setAllCurrency(data.currencies);
      setSelectedCurrency(data.currencies[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* Handling Click outside => */
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowCurrency(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  /* <= Click outside */

  return (
    <div>
      {selectedCurrency && selectedCurrency.symbol}

      <svg
        onClick={() => setShowCurrency(true)}
        className="select-box__icon"
        fill="#000000"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        <path d="M0-.75h24v24H0z" fill="none" />
      </svg>
      {allcurrency &&
        (showCurrency ? (
          <div ref={wrapperRef} className="currencyList">
            {allcurrency.map((x, i) => (
              <SingleCurrency
                key={i}
                currency={x}
                setShowCurrency={setShowCurrency}
              />
            ))}
          </div>
        ) : null)}
    </div>
  );
}

export default CurrencySelect;
