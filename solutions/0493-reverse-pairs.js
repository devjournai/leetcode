/**
 * Reverse Pairs
 * Intuition: A reverse pair is i < j with nums[i] > 2*nums[j]. Merge sort counts them while the halves are sorted: for each left value, advance a right pointer while the inequality holds, then merge.
 * Approach: 1. `sortAndCountPairs(arr, lo, hi)` returns after sorting that range. 2. Recurse on mid. 3. For each left index, while `arr[left] > 2*arr[right]` increment right; add `right-(mid+1)` to `totalReversePairs`. 4. Merge the two sorted halves through `temporaryMergedArray` back into `arr`. 5. Run on `[0, n-1]`.
 * Dry Run: nums = [1,3,2,3,1].
 *   - Pairs with i < j and nums[i] > 2*nums[j]: (3,1) at indices (1,4) and (3,4) only. Merge-sort counting adds those two → return 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var reversePairs = function (nums) {
  let totalReversePairs = 0;

  function sortAndCountPairs(workingArray, startIndex, endIndex) {
    if (startIndex >= endIndex) {
      return;
    }

    const midPoint = Math.floor((startIndex + endIndex) / 2);

    sortAndCountPairs(workingArray, startIndex, midPoint);
    sortAndCountPairs(workingArray, midPoint + 1, endIndex);

    let rightPointerForCounting = midPoint + 1;
    for (
      let leftPointerForCounting = startIndex;
      leftPointerForCounting <= midPoint;
      leftPointerForCounting++
    ) {
      while (
        rightPointerForCounting <= endIndex &&
        workingArray[leftPointerForCounting] >
          2 * workingArray[rightPointerForCounting]
      ) {
        rightPointerForCounting++;
      }
      totalReversePairs += rightPointerForCounting - (midPoint + 1);
    }

    const temporaryMergedArray = [];
    let leftHalfCursor = startIndex;
    let rightHalfCursor = midPoint + 1;

    while (leftHalfCursor <= midPoint || rightHalfCursor <= endIndex) {
      if (
        leftHalfCursor <= midPoint &&
        (rightHalfCursor > endIndex ||
          workingArray[leftHalfCursor] <= workingArray[rightHalfCursor])
      ) {
        temporaryMergedArray.push(workingArray[leftHalfCursor++]);
      } else if (rightHalfCursor <= endIndex) {
        temporaryMergedArray.push(workingArray[rightHalfCursor++]);
      }
    }

    for (
      let currentCopyIndex = 0;
      currentCopyIndex < temporaryMergedArray.length;
      currentCopyIndex++
    ) {
      workingArray[startIndex + currentCopyIndex] =
        temporaryMergedArray[currentCopyIndex];
    }
  }

  sortAndCountPairs(nums, 0, nums.length - 1);
  return totalReversePairs;
};
