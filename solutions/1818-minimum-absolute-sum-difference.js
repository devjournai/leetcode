/**
 * Minimum Absolute Sum Difference
 * Intuition: The sum of |nums1[i]-nums2[i]| can drop by replacing one nums1[i] with the nums1 value closest to nums2[i]. Binary search on a sorted copy finds that replacement’s best saving.
 * Approach: 1. Sort a copy `sortedFirstArray`. 2. Accumulate original differences modulo 1e9+7. 3. For each i binary-search the closest nums1 value to nums2[i] and track `greatestReduction`. 4. Subtract that reduction modulo.
 * Dry Run: nums1 = [1,7,5], nums2 = [2,3,5].
 *   - Diffs 1+4+0=5. Replace 7 with 1 or 5: |5-3|=2 saves 2. Result 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minAbsoluteSumDiff = function (nums1, nums2) {
  const modulusConstant = 1000000007;
  const sortedFirstArray = [...nums1].sort((valueA, valueB) => valueA - valueB);

  let cumulativeDifference = 0;
  let greatestReduction = 0;
  const arrayLength = nums1.length;

  for (let outerLoopIndex = 0; outerLoopIndex < arrayLength; outerLoopIndex++) {
    const currentElementDifference = Math.abs(
      nums1[outerLoopIndex] - nums2[outerLoopIndex]
    );
    cumulativeDifference =
      (cumulativeDifference + currentElementDifference) % modulusConstant;

    let searchRangeStart = 0;
    let searchRangeEnd = arrayLength - 1;

    while (searchRangeStart <= searchRangeEnd) {
      const middleElementIndex = Math.floor(
        (searchRangeStart + searchRangeEnd) / 2
      );
      const newElementDifference = Math.abs(
        sortedFirstArray[middleElementIndex] - nums2[outerLoopIndex]
      );
      const currentCalculatedReduction =
        currentElementDifference - newElementDifference;
      greatestReduction = Math.max(
        greatestReduction,
        currentCalculatedReduction
      );

      if (sortedFirstArray[middleElementIndex] < nums2[outerLoopIndex]) {
        searchRangeStart = middleElementIndex + 1;
      } else {
        searchRangeEnd = middleElementIndex - 1;
      }
    }

    if (searchRangeStart < arrayLength) {
      const candidateDifferenceLow = Math.abs(
        sortedFirstArray[searchRangeStart] - nums2[outerLoopIndex]
      );
      const candidateReductionLow =
        currentElementDifference - candidateDifferenceLow;
      greatestReduction = Math.max(greatestReduction, candidateReductionLow);
    }

    if (searchRangeEnd >= 0) {
      const candidateDifferenceHigh = Math.abs(
        sortedFirstArray[searchRangeEnd] - nums2[outerLoopIndex]
      );
      const candidateReductionHigh =
        currentElementDifference - candidateDifferenceHigh;
      greatestReduction = Math.max(greatestReduction, candidateReductionHigh);
    }
  }

  const finalResult =
    (cumulativeDifference - greatestReduction + modulusConstant) %
    modulusConstant;
  return finalResult;
};
