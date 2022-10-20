import React from "react";
import mainContext from "../context/mainContext";
import { useContext } from "react";

function SingleCurrency({ currency, setShowCurrency }) {
  const { setSelectedCurrency } = useContext(mainContext);
  function handleCurrencySelect() {
    setSelectedCurrency(currency);
    setShowCurrency(false);
  }
  return (
    <div className="singleCurrency" onClick={handleCurrencySelect}>
      {`${currency.symbol} ${currency.label}`}
    </div>
  );
}

export default SingleCurrency;
