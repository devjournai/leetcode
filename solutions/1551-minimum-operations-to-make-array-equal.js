/**
 * Minimum Operations To Make Array Equal
 * Intuition: arr[i]=2i+1 should become n. Each of the n/2 left values needs n-(2i+1) increments.
 * Approach: 1. For i in 0..floor(n/2)-1 add n-(2i+1). 2. Return the sum.
 * Dry Run: n = 3.
 *   - Array 1,3,5 toward 3 → 2 operations.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (n) {
  let operationsCount = 0;
  const requiredValue = n;

  const iterationLimit = Math.floor(n / 2);

  for (let currentIndex = 0; currentIndex < iterationLimit; currentIndex++) {
    const currentValue = 2 * currentIndex + 1;
    const neededDifference = requiredValue - currentValue;
    operationsCount += neededDifference;
  }

  return operationsCount;
};
