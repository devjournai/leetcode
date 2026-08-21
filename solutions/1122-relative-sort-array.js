/**
 * Relative Sort Array
 * Intuition: Values are at most 1000, so counting sort can emit arr2’s order first, then leftover values in numeric order.
 * Approach: 1. Count every arr1 value in a 0..1000 frequency array. 2. For each value in arr2, append it that many times and zero its count. 3. Scan 0..1000 and append any remaining counts in increasing order.
 * Dry Run: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6].
 *   - After arr2: [2,2,2,1,4,3,3,9,6]. Leftovers 7 then 19.
 *   - Result: [2,2,2,1,4,3,3,9,6,7,19].
 * Time Complexity: O(N + K)
 * Space Complexity: O(N + K)
 */
var relativeSortArray = function (arr1, arr2) {
  const maximumPossibleValue = 1000;
  const elementCounts = new Array(maximumPossibleValue + 1).fill(0);

  for (const numCurrent of arr1) {
    elementCounts[numCurrent]++;
  }

  const sortedResult = [];

  for (const targetValue of arr2) {
    while (elementCounts[targetValue] > 0) {
      sortedResult.push(targetValue);
      elementCounts[targetValue]--;
    }
  }

  for (
    let numericTracker = 0;
    numericTracker <= maximumPossibleValue;
    numericTracker++
  ) {
    while (elementCounts[numericTracker] > 0) {
      sortedResult.push(numericTracker);
      elementCounts[numericTracker]--;
    }
  }

  return sortedResult;
};
