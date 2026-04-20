/**
 * Arithmetic Subarrays
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
      (valueA, valueB) => valueA - valueB,
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
