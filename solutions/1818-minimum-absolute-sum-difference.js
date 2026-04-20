/**
 * Minimum Absolute Sum Difference
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
      nums1[outerLoopIndex] - nums2[outerLoopIndex],
    );
    cumulativeDifference =
      (cumulativeDifference + currentElementDifference) % modulusConstant;

    let searchRangeStart = 0;
    let searchRangeEnd = arrayLength - 1;

    while (searchRangeStart <= searchRangeEnd) {
      const middleElementIndex = Math.floor(
        (searchRangeStart + searchRangeEnd) / 2,
      );
      const newElementDifference = Math.abs(
        sortedFirstArray[middleElementIndex] - nums2[outerLoopIndex],
      );
      const currentCalculatedReduction =
        currentElementDifference - newElementDifference;
      greatestReduction = Math.max(
        greatestReduction,
        currentCalculatedReduction,
      );

      if (sortedFirstArray[middleElementIndex] < nums2[outerLoopIndex]) {
        searchRangeStart = middleElementIndex + 1;
      } else {
        searchRangeEnd = middleElementIndex - 1;
      }
    }

    if (searchRangeStart < arrayLength) {
      const candidateDifferenceLow = Math.abs(
        sortedFirstArray[searchRangeStart] - nums2[outerLoopIndex],
      );
      const candidateReductionLow =
        currentElementDifference - candidateDifferenceLow;
      greatestReduction = Math.max(greatestReduction, candidateReductionLow);
    }

    if (searchRangeEnd >= 0) {
      const candidateDifferenceHigh = Math.abs(
        sortedFirstArray[searchRangeEnd] - nums2[outerLoopIndex],
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
