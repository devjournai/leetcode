/**
 * Put Marbles In Bags
 * Intuition: The total score for any distribution is the sum of the weights of the first and last marbles (which are always `weights[0]` and `weights[n-1]`), plus the sum of `k-1` chosen "split costs". Each split point between `weights[i]` and `weights[i+1]` adds `weights[i] + weights[i+1]` to the total score. To find the minimum total score, we select the `k-1` smallest split costs. To find the maximum total score, we select the `k-1` largest split costs. The difference between maximum and minimum scores is simply the difference between the sum of the `k-1` largest split costs and the sum of the `k-1` smallest split costs, as the `weights[0] + weights[n-1]` component cancels out.
 * Approach: 1. Handle the edge case where the number of bags `k` is equal to the number of marbles `n`, in which case the difference is 0. 2. Create an array of all possible adjacent marble weight sums `weights[i] + weights[i+1]`. This array will have `n-1` elements. 3. Sort this array of sums in ascending order. 4. Calculate the sum of the `k-1` smallest elements from the sorted array. This contributes to the minimum possible total score. 5. Calculate the sum of the `k-1` largest elements from the sorted array. This contributes to the maximum possible total score. 6. Return the difference between the sum of the largest `k-1` elements and the sum of the smallest `k-1` elements.
 * Dry Run: weights = [1,3,5,7], k = 3
 *   1. totalMarbles = 4, bagCount = 3. bagCount !== totalMarbles, proceed.
 *   2. adjacentPairCosts = []:
 *      indexForCurrentPair = 0: 1 + 3 = 4. adjacentPairCosts = [4].
 *      indexForCurrentPair = 1: 3 + 5 = 8. adjacentPairCosts = [4, 8].
 *      indexForCurrentPair = 2: 5 + 7 = 12. adjacentPairCosts = [4, 8, 12]. Loop ends.
 *   3. Sort adjacentPairCosts: [4, 8, 12] (already sorted).
 *   4. minimumSelectionsCount = bagCount - 1 = 2.
 *      minimumTotalCost = adjacentPairCosts.slice(0, 2).reduce((accum, val) => accum + val, 0).
 *      slice(0, 2) results in [4, 8]. Reduce sums to 12. minimumTotalCost = 12.
 *   5. maximumSelectionsCount = bagCount - 1 = 2.
 *      totalCostPairs = adjacentPairCosts.length = 3.
 *      startSliceIndex = totalCostPairs - maximumSelectionsCount = 3 - 2 = 1.
 *      maximumTotalCost = adjacentPairCosts.slice(1).reduce((accumTwo, valTwo) => accumTwo + valTwo, 0).
 *      slice(1) results in [8, 12]. Reduce sums to 20. maximumTotalCost = 20.
 *   6. Return maximumTotalCost - minimumTotalCost = 20 - 12 = 8.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var putMarbles = function (weights, k) {
  const totalMarbles = weights.length;

  if (k === totalMarbles) {
    return 0;
  }

  const adjacentPairCosts = [];
  for (
    let indexForCurrentPair = 0;
    indexForCurrentPair < totalMarbles - 1;
    indexForCurrentPair++
  ) {
    const currentPairSum =
      weights[indexForCurrentPair] + weights[indexForCurrentPair + 1];
    adjacentPairCosts.push(currentPairSum);
  }

  adjacentPairCosts.sort((valueA, valueB) => valueA - valueB);

  let minimumTotalCost = 0;
  const minimumSelectionsCount = k - 1;
  const minCostElements = adjacentPairCosts.slice(0, minimumSelectionsCount);
  minimumTotalCost = minCostElements.reduce((accum, val) => accum + val, 0);

  let maximumTotalCost = 0;
  const maximumSelectionsCount = k - 1;
  const totalCostPairs = adjacentPairCosts.length;
  const startSliceIndex = totalCostPairs - maximumSelectionsCount;
  const maxCostElements = adjacentPairCosts.slice(startSliceIndex);
  maximumTotalCost = maxCostElements.reduce(
    (accumTwo, valTwo) => accumTwo + valTwo,
    0
  );

  return maximumTotalCost - minimumTotalCost;
};
