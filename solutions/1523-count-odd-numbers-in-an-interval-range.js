/**
 * Count Odd Numbers In An Interval Range
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var countOdds = function (low, high) {
  let currentLowerBound = low;
  let currentUpperBound = high;

  if (currentLowerBound % 2 === 0) {
    currentLowerBound++;
  }

  if (currentUpperBound % 2 === 0) {
    currentUpperBound--;
  }

  if (currentLowerBound > currentUpperBound) {
    return 0;
  }

  let adjustedRangeLength = currentUpperBound - currentLowerBound;
  let numberPairs = adjustedRangeLength / 2;
  let finalOddCount = numberPairs + 1;

  return finalOddCount;
};
