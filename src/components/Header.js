import React from "react";
import HeaderElement from "./HeaderElement";
import { useContext } from "react";
import mainContext from "../context/mainContext";
import logo from "../a-logo.svg";
import cartlogo from "../Empty Cart.svg";
import CurrencySelect from "./CurrencySelect";
import SmallCart from "./SmallCart";

function Header() {
  const { categories, showSmallCart, setShowSmallCart, qty } =
    useContext(mainContext);

  function closeOpenSmallCart() {
    setShowSmallCart(!showSmallCart);
  }

  return (
    <div className="header">
      <div className="navigation">
        <div className="header_navigation">
          {categories.map((x, i) => (
            <HeaderElement key={i} header_category={x.name} />
          ))}
        </div>
      </div>
      <div className="a-logo">
        <img src={logo} alt="" />
      </div>
      <div className="actions">
        <div className="currancy">
          <CurrencySelect />
        </div>
        <div className="cart">
          <div onClick={closeOpenSmallCart}>
            <img src={cartlogo} alt="" />
            {qty > 0 ? <div className="qtyInCart">{qty}</div> : null}
          </div>

          {showSmallCart && <SmallCart setShowSmallCart={setShowSmallCart} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
