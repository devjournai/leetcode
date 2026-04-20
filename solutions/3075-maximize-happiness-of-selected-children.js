/**
 * Maximize Happiness of Selected Children
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