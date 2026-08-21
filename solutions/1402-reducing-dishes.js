/**
 * Reducing Dishes
 * Intuition: Cook the tastiest dishes last (highest time multipliers). Scanning from largest satisfaction, adding a dish is worthwhile while the running prefix of those dishes stays positive.
 * Approach: 1. Sort satisfaction ascending. 2. Walk from the end: add the dish to a running sum, add that sum into the like-time coefficient, and track the max coefficient (never below 0).
 * Dry Run: satisfaction = [-1,-8,0,5,-9].
 *   - Sorted, take from the end: 5 → coeff 5; +0 → 10; +-1 → 14. Next negatives drop the coeff. Return 14.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxSatisfaction = function (satisfaction) {
  satisfaction.sort((valueOne, valueTwo) => valueOne - valueTwo);

  let maximumLikeTimeCoefficient = 0;
  let currentSatisfactionSum = 0;
  let runningLikeTimeCoefficient = 0;

  for (
    let dishIterator = satisfaction.length - 1;
    dishIterator >= 0;
    dishIterator--
  ) {
    let currentDishSatisfaction = satisfaction[dishIterator];
    currentSatisfactionSum += currentDishSatisfaction;
    runningLikeTimeCoefficient += currentSatisfactionSum;
    maximumLikeTimeCoefficient = Math.max(
      maximumLikeTimeCoefficient,
      runningLikeTimeCoefficient
    );
  }

  return maximumLikeTimeCoefficient;
};
