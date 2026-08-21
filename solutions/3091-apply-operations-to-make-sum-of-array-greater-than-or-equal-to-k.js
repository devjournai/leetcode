/**
 * Apply Operations To Make Sum Of Array Greater Than Or Equal To K
 * Intuition: To minimize operations, we must balance increasing the initial element's value and duplicating elements. If we increment the initial '1' to a value 'X' (costing X-1 increments), we then need ceil(K/X) copies of 'X' to reach a sum of at least K. This requires ceil(K/X) - 1 duplicate operations. The total operations for a chosen 'X' (or 'X-1' increments) is (X-1) + (ceil(K/X) - 1). This sum tends to be minimized when 'X' is close to sqrt(K), guiding our search space.
 * Approach: 1. Handle the edge case where k is 1, returning 0 operations. 2. Initialize a variable `minimumOperationsFound` to a very large number (e.g., `Infinity`). 3. Iterate a `currentIncrementCount` from 0 up to `Math.ceil(Math.sqrt(k))` to explore optimal balances between increments and duplications. 4. In each iteration, calculate the `baseElementValue` as `1 + currentIncrementCount`. 5. Determine the `totalElementsNeeded` by calculating `Math.ceil(k / baseElementValue)`. 6. Calculate `duplicationCount` as `totalElementsNeeded - 1` (since one element is already present and incremented). 7. Sum `currentIncrementCount` and `duplicationCount` to get `operationsForCurrentStrategy`. 8. Update `minimumOperationsFound` with the minimum of its current value and `operationsForCurrentStrategy`. 9. After the loop completes, return `minimumOperationsFound`.
 * Dry Run: k = 7
 *   - k is not 1.
 *   - `minimumOperationsFound` = Infinity.
 *   - `searchUpperLimit` = `Math.ceil(Math.sqrt(7))` = `Math.ceil(2.64)` = 3.
 *   - Loop `currentIncrementCount` from 0 to 3:
 *     - `currentIncrementCount` = 0:
 *       - `baseElementValue` = 1 + 0 = 1.
 *       - `totalElementsNeeded` = `Math.ceil(7 / 1)` = 7.
 *       - `duplicationCount` = 7 - 1 = 6.
 *       - `operationsForCurrentStrategy` = 0 + 6 = 6.
 *       - `minimumOperationsFound` = `Math.min(Infinity, 6)` = 6.
 *     - `currentIncrementCount` = 1:
 *       - `baseElementValue` = 1 + 1 = 2.
 *       - `totalElementsNeeded` = `Math.ceil(7 / 2)` = 4.
 *       - `duplicationCount` = 4 - 1 = 3.
 *       - `operationsForCurrentStrategy` = 1 + 3 = 4.
 *       - `minimumOperationsFound` = `Math.min(6, 4)` = 4.
 *     - `currentIncrementCount` = 2:
 *       - `baseElementValue` = 1 + 2 = 3.
 *       - `totalElementsNeeded` = `Math.ceil(7 / 3)` = 3.
 *       - `duplicationCount` = 3 - 1 = 2.
 *       - `operationsForCurrentStrategy` = 2 + 2 = 4.
 *       - `minimumOperationsFound` = `Math.min(4, 4)` = 4.
 *     - `currentIncrementCount` = 3:
 *       - `baseElementValue` = 1 + 3 = 4.
 *       - `totalElementsNeeded` = `Math.ceil(7 / 4)` = 2.
 *       - `duplicationCount` = 2 - 1 = 1.
 *       - `operationsForCurrentStrategy` = 3 + 1 = 4.
 *       - `minimumOperationsFound` = `Math.min(4, 4)` = 4.
 *   - Loop finishes.
 *   - Return `minimumOperationsFound` (4).
 * Time Complexity: O(sqrt(k))
 * Space Complexity: O(1)
 */
var minOperations = function (k) {
  if (k === 1) {
    return 0;
  }

  let minimumOperationsFound = Infinity;
  let searchUpperLimit = Math.ceil(Math.sqrt(k));

  for (
    let currentIncrementCount = 0;
    currentIncrementCount <= searchUpperLimit;
    currentIncrementCount++
  ) {
    let baseElementValue = 1 + currentIncrementCount;
    let totalElementsNeeded = Math.ceil(k / baseElementValue);
    let duplicationCount = totalElementsNeeded - 1;
    let operationsForCurrentStrategy = currentIncrementCount + duplicationCount;
    minimumOperationsFound = Math.min(
      minimumOperationsFound,
      operationsForCurrentStrategy
    );
  }

  return minimumOperationsFound;
};
