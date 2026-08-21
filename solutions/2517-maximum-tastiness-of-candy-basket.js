/**
 * Maximum Tastiness Of Candy Basket
 * Intuition: The problem asks for the maximum possible minimum difference between prices of selected candies. This type of "maximize the minimum" or "minimize the maximum" problem often suggests binary search on the answer.
 * Approach: 1. Sort the `price` array to efficiently find differences and apply a greedy strategy. 2. Define a search space for the "tastiness" (the minimum difference). The lower bound can be 0, and the upper bound is the difference between the maximum and minimum candy price in the input array. 3. Perform a binary search within this range. For each `currentMidTastiness` value (candidate for maximum tastiness), implement a `checkIfPossible` helper logic: a. Start by picking the first candy price and count it. b. Iterate through the sorted prices starting from the second candy. If the current candy's price is at least `currentMidTastiness` greater than the last picked candy's price, pick it and increment the count. c. If we can pick at least `k` candies this way, it means `currentMidTastiness` is achievable. 4. If `currentMidTastiness` is achievable, store it as a potential result and try for a higher tastiness by shifting the search lower bound (`lowerSearchBound = currentMidTastiness + 1`). 5. If `currentMidTastiness` is not achievable (couldn't pick `k` candies), it means `currentMidTastiness` is too high, so try a lower tastiness by shifting the search upper bound (`upperSearchBound = currentMidTastiness - 1`). 6. The final stored result after the binary search is the maximum tastiness.
 * Dry Run: price = [1, 6, 2, 7, 3, 5], k = 3
 * 1. Sort price: [1, 2, 3, 5, 6, 7]
 * 2. Initialize: lowerSearchBound = 0, upperSearchBound = 7 - 1 = 6, maximumAchievableTastiness = 0
 * 3. Loop:
 *    - Iteration 1: lowerSearchBound = 0, upperSearchBound = 6. currentMidTastiness = floor((0+6)/2) = 3.
 *      Check if 3 is possible:
 *      selectedCandiesCount = 1, lastSelectedPrice = 1.
 *      currentPriceIndex = 1 (price[1]=2): 2-1 = 1 < 3. Skip.
 *      currentPriceIndex = 2 (price[2]=3): 3-1 = 2 < 3. Skip.
 *      currentPriceIndex = 3 (price[3]=5): 5-1 = 4 >= 3. Select. selectedCandiesCount = 2, lastSelectedPrice = 5.
 *      currentPriceIndex = 4 (price[4]=6): 6-5 = 1 < 3. Skip.
 *      currentPriceIndex = 5 (price[5]=7): 7-5 = 2 < 3. Skip.
 *      Final selectedCandiesCount = 2, which is < k (3). So 3 is too high.
 *      upperSearchBound = 3 - 1 = 2.
 *    - Iteration 2: lowerSearchBound = 0, upperSearchBound = 2. currentMidTastiness = floor((0+2)/2) = 1.
 *      Check if 1 is possible:
 *      selectedCandiesCount = 1, lastSelectedPrice = 1.
 *      currentPriceIndex = 1 (price[1]=2): 2-1 = 1 >= 1. Select. selectedCandiesCount = 2, lastSelectedPrice = 2.
 *      currentPriceIndex = 2 (price[2]=3): 3-2 = 1 >= 1. Select. selectedCandiesCount = 3, lastSelectedPrice = 3.
 *      (selectedCandiesCount >= k, so 1 is possible. Continue loop to find more if available.)
 *      currentPriceIndex = 3 (price[3]=5): 5-3 = 2 >= 1. Select. selectedCandiesCount = 4, lastSelectedPrice = 5.
 *      currentPriceIndex = 4 (price[4]=6): 6-5 = 1 >= 1. Select. selectedCandiesCount = 5, lastSelectedPrice = 6.
 *      currentPriceIndex = 5 (price[5]=7): 7-6 = 1 >= 1. Select. selectedCandiesCount = 6, lastSelectedPrice = 7.
 *      Final selectedCandiesCount = 6, which is >= k (3). So 1 is achievable.
 *      maximumAchievableTastiness = 1. lowerSearchBound = 1 + 1 = 2.
 *    - Iteration 3: lowerSearchBound = 2, upperSearchBound = 2. currentMidTastiness = floor((2+2)/2) = 2.
 *      Check if 2 is possible:
 *      selectedCandiesCount = 1, lastSelectedPrice = 1.
 *      currentPriceIndex = 1 (price[1]=2): 2-1 = 1 < 2. Skip.
 *      currentPriceIndex = 2 (price[2]=3): 3-1 = 2 >= 2. Select. selectedCandiesCount = 2, lastSelectedPrice = 3.
 *      currentPriceIndex = 3 (price[3]=5): 5-3 = 2 >= 2. Select. selectedCandiesCount = 3, lastSelectedPrice = 5.
 *      (selectedCandiesCount >= k, so 2 is possible. Continue loop to find more if available.)
 *      currentPriceIndex = 4 (price[4]=6): 6-5 = 1 < 2. Skip.
 *      currentPriceIndex = 5 (price[5]=7): 7-5 = 2 >= 2. Select. selectedCandiesCount = 4, lastSelectedPrice = 7.
 *      Final selectedCandiesCount = 4, which is >= k (3). So 2 is achievable.
 *      maximumAchievableTastiness = 2. lowerSearchBound = 2 + 1 = 3.
 *    - Iteration 4: lowerSearchBound = 3, upperSearchBound = 2. lowerSearchBound > upperSearchBound. Loop terminates.
 * 4. Return maximumAchievableTastiness = 2.
 * Time Complexity: O(N log N + N log D)
 * Space Complexity: O(log N)
 */
var maximumTastiness = function (price, k) {
  price.sort((priceA, priceB) => priceA - priceB);

  let lowerSearchBound = 0;
  let upperSearchBound = price[price.length - 1] - price[0];
  let maximumAchievableTastiness = 0;

  while (lowerSearchBound <= upperSearchBound) {
    const currentMidTastiness = Math.floor(
      (lowerSearchBound + upperSearchBound) / 2
    );

    let selectedCandiesCount = 1;
    let lastSelectedPrice = price[0];
    let currentPriceIndex = 1;

    while (currentPriceIndex < price.length) {
      if (price[currentPriceIndex] - lastSelectedPrice >= currentMidTastiness) {
        selectedCandiesCount++;
        lastSelectedPrice = price[currentPriceIndex];
      }
      currentPriceIndex++;
    }

    if (selectedCandiesCount >= k) {
      maximumAchievableTastiness = currentMidTastiness;
      lowerSearchBound = currentMidTastiness + 1;
    } else {
      upperSearchBound = currentMidTastiness - 1;
    }
  }

  return maximumAchievableTastiness;
};
