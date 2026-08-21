/**
 * Shopping Offers
 * Intuition: Recurse on remaining needs: either buy everything at unit price or apply any special that still fits, memoized by the needs tuple.
 * Approach: 1. `calculateMinimumCost` keys `memoCache` on `currentNeedsArray.join(',')`. 2. Baseline is sum of need[i]*price[i]. 3. For each offer, if every item count fits, subtract the bundle and recurse, adding the offer's last-slot cost. 4. Store the min and start from `initialNeedsQuantities`.
 * Dry Run: price=[2,5], special=[[3,0,5],[1,2,10]], needs=[3,2].
 *   - All unit: 6+10=16. Offer [3,0,5] leaves [0,2] → 5+10=15. Offer [1,2,10] leaves [2,0] → 10+4=14. Return 14.
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
          costIncludingOffer
        );
      }
    }

    memoCache.set(memoKeyString, minimumPriceComputed);
    return minimumPriceComputed;
  }

  return calculateMinimumCost(initialNeedsQuantities);
};
