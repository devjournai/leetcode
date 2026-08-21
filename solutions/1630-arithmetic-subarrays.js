/**
 * Arithmetic Subarrays
 * Intuition: A subarray can be rearranged into an arithmetic sequence iff, after sorting, consecutive differences are constant.
 * Approach: 1. For each query [l[i], r[i]], copy nums[l..r]. 2. Sort the copy. 3. Check that every adjacent gap equals the first gap (length < 2 is false). 4. Push the boolean.
 * Dry Run: nums=[4,6,5,9,3,7], l=[0], r=[2] → [4,6,5] sorted [4,5,6] gaps 1,1 → true.
 * Time Complexity: O(M * K log K)
 * Space Complexity: O(K + M)
 */
var checkArithmeticSubarrays = function (nums, l, r) {
  const finalResults = [];

  const determineArithmeticPossibility = (candidateArray) => {
    const arrayLength = candidateArray.length;

    if (arrayLength < 2) {
      return false;
    }

    const orderedElements = [...candidateArray].sort(
      (valueA, valueB) => valueA - valueB
    );

    const commonDifference = orderedElements[1] - orderedElements[0];

    for (
      let comparisonIndex = 2;
      comparisonIndex < arrayLength;
      comparisonIndex++
    ) {
      const currentTerm = orderedElements[comparisonIndex];
      const previousTerm = orderedElements[comparisonIndex - 1];
      if (currentTerm - previousTerm !== commonDifference) {
        return false;
      }
    }

    return true;
  };

  l.forEach((currentLeft, queryIterator) => {
    const currentRight = r[queryIterator];
    const extractedSubarray = nums.slice(currentLeft, currentRight + 1);
    const isCurrentSubarrayArithmetic =
      determineArithmeticPossibility(extractedSubarray);
    finalResults.push(isCurrentSubarrayArithmetic);
  });

  return finalResults;
};
