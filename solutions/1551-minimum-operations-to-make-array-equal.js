/**
 * Minimum Operations To Make Array Equal
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
