/**
 * Determine The Minimum Sum Of A K Avoiding Array
 * Intuition: To achieve the minimum sum, we should always pick the smallest available positive integer that does not violate the k-avoiding condition.
 * Approach: 1. Initialize an empty set to store selected numbers and a sum accumulator to zero. Start with the smallest positive integer, 1, as the candidate. 2. Iterate until 'n' distinct numbers are collected. 3. In each step, check if adding the current candidate number would create a pair that sums to 'k' with any already selected number (i.e., if 'k - candidate' is in the set). 4. If a conflict exists, increment the candidate number and try again. 5. If no conflict, add the candidate number to the sum and the set, increment the count of collected numbers, and then increment the candidate number for the next check.
 * Dry Run: n = 3, k = 4
 *   Initialize: selectedElementsContainer = {}, totalAccumulatedSum = 0, currentConsideration = 1, elementsAddedCount = 0
 *   Loop 1 (elementsAddedCount < 3):
 *     requiredComplement = 4 - 1 = 3. selectedElementsContainer.has(3) is false.
 *     totalAccumulatedSum = 0 + 1 = 1.
 *     selectedElementsContainer.add(1). (Set: {1})
 *     elementsAddedCount = 1.
 *     currentConsideration = 2.
 *   Loop 2 (elementsAddedCount < 3):
 *     requiredComplement = 4 - 2 = 2. selectedElementsContainer.has(2) is false.
 *     totalAccumulatedSum = 1 + 2 = 3.
 *     selectedElementsContainer.add(2). (Set: {1, 2})
 *     elementsAddedCount = 2.
 *     currentConsideration = 3.
 *   Loop 3 (elementsAddedCount < 3):
 *     requiredComplement = 4 - 3 = 1. selectedElementsContainer.has(1) is true. (Conflict!)
 *     currentConsideration = 4. (Skip 3)
 *   Loop 4 (elementsAddedCount < 3):
 *     requiredComplement = 4 - 4 = 0. selectedElementsContainer.has(0) is false.
 *     totalAccumulatedSum = 3 + 4 = 7.
 *     selectedElementsContainer.add(4). (Set: {1, 2, 4})
 *     elementsAddedCount = 3.
 *     currentConsideration = 5.
 *   Loop 5 (elementsAddedCount < 3) is false.
 *   Return totalAccumulatedSum = 7.
 * Time Complexity: O(n + k)
 * Space Complexity: O(n)
 */
var minimumSum = function (n, k) {
  const selectedElementsContainer = new Set();
  let totalAccumulatedSum = 0;
  let currentConsideration = 1;
  let elementsAddedCount = 0;

  while (elementsAddedCount < n) {
    const requiredComplement = k - currentConsideration;
    if (selectedElementsContainer.has(requiredComplement)) {
      currentConsideration++;
    } else {
      totalAccumulatedSum += currentConsideration;
      selectedElementsContainer.add(currentConsideration);
      elementsAddedCount++;
      currentConsideration++;
    }
  }

  return totalAccumulatedSum;
};
