/**
 * Maximize Happiness of Selected Children
 * Intuition: Each pick reduces remaining happiness by 1, so always pick the currently largest remaining value first.
 * Approach: Sort descending and take k values as happiness[i] - i while positive, stopping early if a pick would be <= 0.
 * Dry Run: happiness = [1,2,3], k = 2 -> pick 3 then 2-1=1, sum 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maximumHappinessSum = function (happiness, k) {
  happiness.sort((firstValue, secondValue) => secondValue - firstValue);

  let totalHappinessAccumulator = 0;
  let childrenPickedCount = 0;

  while (childrenPickedCount < k) {
    const originalChildHappiness = happiness[childrenPickedCount];
    const adjustedHappinessValue = originalChildHappiness - childrenPickedCount;

    if (adjustedHappinessValue <= 0) {
      break;
    }

    totalHappinessAccumulator += adjustedHappinessValue;
    childrenPickedCount++;
  }

  return totalHappinessAccumulator;
};
