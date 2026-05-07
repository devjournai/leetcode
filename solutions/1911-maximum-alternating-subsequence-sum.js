/**
 * Maximum Alternating Subsequence Sum
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxAlternatingSum = function (nums) {
  let maximumEvenSum = 0;
  let maximumOddSum = 0;

  for (const currentNumber of nums) {
    let temporaryEvenSum = Math.max(
      maximumEvenSum,
      maximumOddSum + currentNumber,
    );
    let temporaryOddSum = Math.max(
      maximumOddSum,
      maximumEvenSum - currentNumber,
    );

    maximumEvenSum = temporaryEvenSum;
    maximumOddSum = temporaryOddSum;
  }

  return maximumEvenSum;
};
