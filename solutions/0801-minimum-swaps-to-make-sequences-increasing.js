/**
 * Minimum Swaps To Make Sequences Increasing
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSwap = function (nums1, nums2) {
  let currentNoSwapCount = 0;
  let currentSwapCount = 1;

  for (let currentIdx = 1; currentIdx < nums1.length; currentIdx++) {
    let nextIterationNoSwap = Infinity;
    let nextIterationSwap = Infinity;

    const previousFirstValue = nums1[currentIdx - 1];
    const previousSecondValue = nums2[currentIdx - 1];
    const currentFirstValue = nums1[currentIdx];
    const currentSecondValue = nums2[currentIdx];

    const canMaintainOrder =
      currentFirstValue > previousFirstValue &&
      currentSecondValue > previousSecondValue;
    const canSwapOrder =
      currentFirstValue > previousSecondValue &&
      currentSecondValue > previousFirstValue;

    if (canMaintainOrder) {
      nextIterationNoSwap = Math.min(nextIterationNoSwap, currentNoSwapCount);
    }
    if (canSwapOrder) {
      nextIterationNoSwap = Math.min(nextIterationNoSwap, currentSwapCount);
    }

    if (canMaintainOrder) {
      nextIterationSwap = Math.min(nextIterationSwap, currentSwapCount + 1);
    }
    if (canSwapOrder) {
      nextIterationSwap = Math.min(nextIterationSwap, currentNoSwapCount + 1);
    }

    currentNoSwapCount = nextIterationNoSwap;
    currentSwapCount = nextIterationSwap;
  }

  return Math.min(currentNoSwapCount, currentSwapCount);
};
