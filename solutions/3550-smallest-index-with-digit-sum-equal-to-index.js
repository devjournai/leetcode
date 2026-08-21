/**
 * Smallest Index With Digit Sum Equal to Index
 * Intuition: Check indices from the left and return the first whose decimal digit sum equals the index.
 * Approach: 1. For each index i, sum the digits of nums[i]. 2. Return i on a match. 3. Return -1 if none match.
 * Dry Run: nums = [1, 3, 2]. Digit sums 1, 3, 2. Index 1 has 3 ≠ 1; index 2 has 2 = 2 → return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var smallestIndex = function (nums) {
  const getDigitSum = (num) => {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  };

  for (let i = 0; i < nums.length; i++) {
    if (getDigitSum(nums[i]) === i) {
      return i;
    }
  }
  return -1;
};
