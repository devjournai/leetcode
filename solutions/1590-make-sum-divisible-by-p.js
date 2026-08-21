/**
 * Make Sum Divisible By P
 * Intuition: Need a shortest subarray whose sum ≡ total%p (mod p). Prefix remainders find the latest earlier prefix with remainder (cur-need).
 * Approach: 1. need=sum%p; if 0 return 0. 2. Map remainder→index. 3. Track min length; if the whole array, -1.
 * Dry Run: nums = [3,1,4,2], p = 6.
 *   - Sum 10, need 4; remove [4] length 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSubarray = function (nums, p) {
  const totalAggregation = nums.reduce(
    (initialAccumulation, singleElement) => initialAccumulation + singleElement,
    0
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
        desiredPreviousRemainder
      );
      const potentialLength = elementIterator - lastOccurrenceIndex;
      shortestSubarrayFound = Math.min(shortestSubarrayFound, potentialLength);
    }

    prefixRemainderTracker.set(currentModuloSum, elementIterator);
  }

  return shortestSubarrayFound < nums.length ? shortestSubarrayFound : -1;
};
