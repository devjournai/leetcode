/**
 * Minimum Swaps To Make Sequences Increasing
 * Intuition: At each index keep two costs: no-swap vs swap at i. A pair is valid if both sequences stay strictly increasing, either unswapped or with a cross (one of the two positions swapped).
 * Approach: 1. Start `currentNoSwapCount=0`, `currentSwapCount=1`. 2. `canMaintainOrder` if both current > previous same array; `canSwapOrder` if current crosses previous. 3. Next no-swap from previous no-swap (maintain) or previous swap (cross). Next swap similarly +1. 4. Return min of the two finals.
 * Dry Run: nums1 = [1,3,5,4], nums2 = [1,2,3,7]. After i=3, min of no-swap/swap is 1.
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
