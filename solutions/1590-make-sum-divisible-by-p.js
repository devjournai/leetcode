/**
 * Make Sum Divisible By P
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSubarray = function (nums, p) {
  const totalAggregation = nums.reduce(
    (initialAccumulation, singleElement) => initialAccumulation + singleElement,
    0,
  );
  const targetModuloValue = totalAggregation % p;

  if (targetModuloValue === 0) {
    return 0;
  }

  const prefixRemainderTracker = new Map([[0, -1]]);
  let currentModuloSum = 0;
  let shortestSubarrayFound = nums.length;

  for (
    let elementIterator = 0;
    elementIterator < nums.length;
    elementIterator++
  ) {
    currentModuloSum = (currentModuloSum + nums[elementIterator]) % p;
    const desiredPreviousRemainder =
      (currentModuloSum - targetModuloValue + p) % p;

    if (prefixRemainderTracker.has(desiredPreviousRemainder)) {
      const lastOccurrenceIndex = prefixRemainderTracker.get(
        desiredPreviousRemainder,
      );
      const potentialLength = elementIterator - lastOccurrenceIndex;
      shortestSubarrayFound = Math.min(shortestSubarrayFound, potentialLength);
    }

    prefixRemainderTracker.set(currentModuloSum, elementIterator);
  }

  return shortestSubarrayFound < nums.length ? shortestSubarrayFound : -1;
};
