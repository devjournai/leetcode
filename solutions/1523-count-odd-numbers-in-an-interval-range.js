/**
 * Count Odd Numbers In An Interval Range
 * Intuition: Odds in [low,high] form an arithmetic sequence; snap low up and high down to odds, then count (high-low)/2+1.
 * Approach: 1. If low even, low++. 2. If high even, high--. 3. If low>high return 0. 4. Return (high-low)/2+1.
 * Dry Run: low = 3, high = 7.
 *   - Both odd; (7-3)/2+1 = 3.
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
