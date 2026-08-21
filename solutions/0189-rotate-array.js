/**
 * Rotate Array
 * Intuition: Rotating right by k is the same as reversing the whole array, then reversing the first k elements and the rest. Reduce k modulo n first.
 * Approach: 1. Return immediately if length is 0 or 1. 2. k %= n; if k is 0, return. 3. Reverse [0..n-1], then [0..k-1], then [k..n-1] via in-place two-pointer swaps.
 * Dry Run: nums = [1,2,3,4,5,6,7], k = 3.
 *   - Reverse all: [7,6,5,4,3,2,1].
 *   - Reverse first 3: [5,6,7,4,3,2,1]. Reverse rest: [5,6,7,1,2,3,4].
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var rotate = function (nums, k) {
  const arraySize = nums.length;

  if (arraySize === 0 || arraySize === 1) {
    return;
  }

  const rotationsCount = k % arraySize;

  if (rotationsCount === 0) {
    return;
  }

  const swapElements = (startIdx, endIdx) => {
    let leftBoundary = startIdx;
    let rightBoundary = endIdx;
    while (leftBoundary < rightBoundary) {
      const temporaryStorage = nums[leftBoundary];
      nums[leftBoundary] = nums[rightBoundary];
      nums[rightBoundary] = temporaryStorage;
      leftBoundary++;
      rightBoundary--;
    }
  };

  swapElements(0, arraySize - 1);
  swapElements(0, rotationsCount - 1);
  swapElements(rotationsCount, arraySize - 1);
};
