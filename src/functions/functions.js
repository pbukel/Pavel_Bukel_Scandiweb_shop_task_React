export const addKey = (data) => {
  let newData = { ...data.product };

  // adding new key "isSelected:false, to handle selected option in basket"
  newData = {
    ...newData,
    qty: 1,
    attributes: newData.attributes.map((x) => ({
      ...x,
      items: x.items.map((y) => ({
        ...y,
        isSelected: false,
      })),
    })),
  };
  let productCopy = JSON.parse(JSON.stringify(newData));
  return productCopy;
};

export const getPrice = (prodInfo, selectedCurrency) => {
  const price = prodInfo.prices.find(
    (x) => x.currency.label === selectedCurrency.label
  );
  return `${selectedCurrency.symbol}${price.amount}`;
};
