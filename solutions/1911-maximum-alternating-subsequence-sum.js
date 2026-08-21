/**
 * Maximum Alternating Subsequence Sum
 * Intuition: Even-index subsequence positions add, odd subtract. DP: best even-length (ending add) vs odd-length (ending subtract) as you scan.
 * Approach: 1. `maximumEvenSum` / `maximumOddSum` start at 0. 2. even = max(even, odd+x); odd = max(odd, even−x) using temps. 3. Return even (empty-even is 0, nonnegative).
 * Dry Run: nums=[4,2,5,3]. Best 4-2+5=7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxAlternatingSum = function (nums) {
  let maximumEvenSum = 0;
  let maximumOddSum = 0;

  for (const currentNumber of nums) {
    let temporaryEvenSum = Math.max(
      maximumEvenSum,
      maximumOddSum + currentNumber
    );
    let temporaryOddSum = Math.max(
      maximumOddSum,
      maximumEvenSum - currentNumber
    );

    maximumEvenSum = temporaryEvenSum;
    maximumOddSum = temporaryOddSum;
  }

  return maximumEvenSum;
};
