/**
 * Shopping Offers
 * Time Complexity: O(S * N * (maxN + 1)^N)
 * Space Complexity: O((maxN + 1)^N)
 */
var shoppingOffers = function (price, special, needs) {
  const itemPrices = price;
  const specialOffersList = special;
  const initialNeedsQuantities = needs;
  const numberOfItems = itemPrices.length;

  const memoCache = new Map();

  function calculateMinimumCost(currentNeedsArray) {
    const memoKeyString = currentNeedsArray.join(",");
    if (memoCache.has(memoKeyString)) {
      return memoCache.get(memoKeyString);
    }

    let minimumPriceComputed = 0;
    for (let itemPosition = 0; itemPosition < numberOfItems; itemPosition++) {
      minimumPriceComputed +=
        currentNeedsArray[itemPosition] * itemPrices[itemPosition];
    }

    for (const specialOfferObject of specialOffersList) {
      const temporaryNeedsState = [...currentNeedsArray];
      let isOfferFeasible = true;

      for (
        let commodityIndex = 0;
        commodityIndex < numberOfItems;
        commodityIndex++
      ) {
        if (
          temporaryNeedsState[commodityIndex] <
          specialOfferObject[commodityIndex]
        ) {
          isOfferFeasible = false;
          break;
        }
        temporaryNeedsState[commodityIndex] -=
          specialOfferObject[commodityIndex];
      }

      if (isOfferFeasible) {
        const offerTotalCost = specialOfferObject[numberOfItems];
        const costIncludingOffer =
          offerTotalCost + calculateMinimumCost(temporaryNeedsState);
        minimumPriceComputed = Math.min(
          minimumPriceComputed,
          costIncludingOffer,
        );
      }
    }

    memoCache.set(memoKeyString, minimumPriceComputed);
    return minimumPriceComputed;
  }

  return calculateMinimumCost(initialNeedsQuantities);
};
