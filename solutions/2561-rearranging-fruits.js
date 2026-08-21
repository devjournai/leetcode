/**
 * Rearranging Fruits
 * Intuition: The problem requires making two baskets equal, meaning they must contain the same multiset of fruits. This implies that for any given fruit value, its total count across both initial baskets must be an even number, as it needs to be split equally into two final baskets. If any fruit has an odd total count, it's impossible. Once feasibility is established, we identify fruits that are "in excess" in one basket compared to the target (which is half of the total count for that fruit). These excess fruits represent items that *must* be moved. We pair up these excess fruits (one from each basket) and consider two swap strategies: a direct swap between the two excess fruits (cost is min of their values), or a "double swap" involving the globally cheapest fruit (cost is 2 * min_global_fruit_value). We choose the cheaper option for each pair to minimize the total cost.
 * Approach: 1. Count fruit frequencies for `basketOneValues` and `basketTwoValues` using separate maps (`frequencyMapOne`, `frequencyMapTwo`). 2. Consolidate all unique fruit values into a set (`combinedUniqueFruits`) and track the `overallMinimumFruitCost` encountered. 3. Iterate through each `uniqueFruitValue` in `combinedUniqueFruits`. For each value, calculate its total frequency across both baskets. If the `combinedFreqTotal` is odd, return -1 immediately as it's impossible to balance. 4. Determine the `desiredFreqPerBasket` for this `uniqueFruitValue`. If `currentFreqOne` (from `basketOneValues`) is greater than `desiredFreqPerBasket`, add the excess fruits to `overflowItemsOne`. Similarly, add excess from `basketTwoValues` to `overflowItemsTwo`. 5. Sort `overflowItemsOne` in ascending order and `overflowItemsTwo` in descending order. This pairing strategy helps minimize direct swap costs by matching a cheap fruit from one with an expensive fruit from the other. 6. Iterate through the sorted `overflowItemsOne` (which will have the same length as `overflowItemsTwo`). For each pair, calculate the `costDirectSwap` (`Math.min(fruitFromOne, fruitFromTwo)`) and `costDoubleSwap` (`2 * overallMinimumFruitCost`). Add the minimum of these two costs to `finalCalculatedCost`. 7. Return `finalCalculatedCost`.
 * Dry Run:
 * basketOneValues = [2,2,3,4], basketTwoValues = [1,1,3,4]
 *
 * 1. Frequencies:
 *    frequencyMapOne: {2: 2, 3: 1, 4: 1}
 *    frequencyMapTwo: {1: 2, 3: 1, 4: 1}
 *
 * 2. Combined Unique Fruits & Min Cost:
 *    combinedUniqueFruits: {1, 2, 3, 4}
 *    overallMinimumFruitCost = 1
 *
 * 3. Check Feasibility & Excess:
 *    - uniqueFruitValue = 1: currentFreqOne=0, currentFreqTwo=2. combinedFreqTotal=2. desiredFreqPerBasket=1.
 *      currentFreqTwo (2) > desiredFreqPerBasket (1). Add 1 to overflowItemsTwo. overflowItemsTwo = [1]
 *    - uniqueFruitValue = 2: currentFreqOne=2, currentFreqTwo=0. combinedFreqTotal=2. desiredFreqPerBasket=1.
 *      currentFreqOne (2) > desiredFreqPerBasket (1). Add 2 to overflowItemsOne. overflowItemsOne = [2]
 *    - uniqueFruitValue = 3: currentFreqOne=1, currentFreqTwo=1. combinedFreqTotal=2. desiredFreqPerBasket=1. No excess.
 *    - uniqueFruitValue = 4: currentFreqOne=1, currentFreqTwo=1. combinedFreqTotal=2. desiredFreqPerBasket=1. No excess.
 *
 *    Current state: overflowItemsOne = [2], overflowItemsTwo = [1]
 *
 * 4. Sort Excess Fruits:
 *    overflowItemsOne.sort((itemA, itemB) => itemA - itemB) => [2]
 *    overflowItemsTwo.sort((itemA, itemB) => itemB - itemA) => [1]
 *
 * 5. Calculate Minimum Swap Cost:
 *    finalCalculatedCost = 0
 *    Loop (swapIndex = 0):
 *      fruitValueOne = overflowItemsOne[0] = 2
 *      fruitValueTwo = overflowItemsTwo[0] = 1
 *      costDirectSwap = Math.min(2, 1) = 1
 *      costDoubleSwap = 2 * overallMinimumFruitCost = 2 * 1 = 2
 *      finalCalculatedCost += Math.min(1, 2) = 1
 *
 * Return finalCalculatedCost = 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minCost = function (basketOneValues, basketTwoValues) {
  const frequencyMapOne = new Map();
  const frequencyMapTwo = new Map();

  basketOneValues.forEach((currentFruitValue) => {
    frequencyMapOne.set(
      currentFruitValue,
      (frequencyMapOne.get(currentFruitValue) || 0) + 1
    );
  });

  basketTwoValues.forEach((anotherFruitValue) => {
    frequencyMapTwo.set(
      anotherFruitValue,
      (frequencyMapTwo.get(anotherFruitValue) || 0) + 1
    );
  });

  const combinedUniqueFruits = new Set([
    ...basketOneValues,
    ...basketTwoValues,
  ]);
  const overflowItemsOne = [];
  const overflowItemsTwo = [];
  let overallMinimumFruitCost = Infinity;

  const uniqueFruitsArray = Array.from(combinedUniqueFruits);
  for (
    let uniqueIndex = 0;
    uniqueIndex < uniqueFruitsArray.length;
    uniqueIndex++
  ) {
    const itemValue = uniqueFruitsArray[uniqueIndex];
    const currentFreqOne = frequencyMapOne.get(itemValue) || 0;
    const currentFreqTwo = frequencyMapTwo.get(itemValue) || 0;
    const combinedFreqTotal = currentFreqOne + currentFreqTwo;

    if (combinedFreqTotal % 2 !== 0) {
      return -1;
    }

    overallMinimumFruitCost = Math.min(overallMinimumFruitCost, itemValue);
    const desiredFreqPerBasket = combinedFreqTotal / 2;

    let basketOneExcessCount = currentFreqOne - desiredFreqPerBasket;
    let basketTwoExcessCount = currentFreqTwo - desiredFreqPerBasket;

    let fillOneCounter = 0;
    while (fillOneCounter < basketOneExcessCount) {
      overflowItemsOne.push(itemValue);
      fillOneCounter++;
    }

    let fillTwoCounter = 0;
    while (fillTwoCounter < basketTwoExcessCount) {
      overflowItemsTwo.push(itemValue);
      fillTwoCounter++;
    }
  }

  overflowItemsOne.sort((itemA, itemB) => itemA - itemB);
  overflowItemsTwo.sort((itemA, itemB) => itemB - itemA);

  let finalCalculatedCost = 0;
  for (let swapIndex = 0; swapIndex < overflowItemsOne.length; swapIndex++) {
    const fruitValueOne = overflowItemsOne[swapIndex];
    const fruitValueTwo = overflowItemsTwo[swapIndex];
    const costDirectSwap = Math.min(fruitValueOne, fruitValueTwo);
    const costDoubleSwap = 2 * overallMinimumFruitCost;
    finalCalculatedCost += Math.min(costDirectSwap, costDoubleSwap);
  }

  return finalCalculatedCost;
};
