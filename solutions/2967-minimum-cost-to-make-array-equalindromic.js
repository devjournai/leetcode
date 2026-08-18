/**
 * Minimum Cost to Make Array Equalindromic
 *
 * Intuition:
 *
 * We need to change every element of nums to the SAME number,
 * and that number must be a palindrome.
 *
 * For a fixed target `x`, the total cost is:
 *
 *     |nums[0] - x| +
 *     |nums[1] - x| + ...
 *
 * For an arbitrary integer, this sum is minimized at the MEDIAN
 * of the array.
 *
 * Therefore, the best palindromic target must be close to the
 * median.
 *
 * ------------------------------------------------------------
 *
 * Since nums[i] <= 10^9, we can generate all palindromic
 * numbers up to 10^9.
 *
 * However, we do not need to generate all of them.
 *
 * We only need the palindrome immediately below the median and
 * the palindrome immediately above the median.
 *
 * Why?
 *
 * The sum of absolute differences is a convex function.
 *
 * As we move away from the median, the cost cannot decrease.
 *
 * Therefore, among all palindromic numbers, the optimal one must
 * be one of the closest palindromes around the median.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * nums = [1,2,3,4,5]
 *
 * Sorted:
 *
 *     [1,2,3,4,5]
 *
 * Median:
 *
 *     3
 *
 * 3 is already a palindrome.
 *
 * Target = 3
 *
 * Cost:
 *
 *     |1-3| + |2-3| + |3-3| + |4-3| + |5-3|
 *
 *     = 2 + 1 + 0 + 1 + 2
 *
 *     = 6
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * nums = [10,12,13,14,15]
 *
 * Median:
 *
 *     13
 *
 * Nearby palindromes:
 *
 *     11
 *     22
 *
 * Target 11 gives:
 *
 *     |10-11| + |12-11| + |13-11|
 *     + |14-11| + |15-11|
 *
 *     = 1 + 1 + 2 + 3 + 4
 *
 *     = 11
 *
 * ------------------------------------------------------------
 *
 * How to find the nearest palindrome?
 *
 * Convert the left half of the number into a palindrome.
 *
 * For example:
 *
 *     12345
 *
 * Left half:
 *
 *     123
 *
 * Mirror it:
 *
 *     12321
 *
 * This gives the palindrome closest to the original number
 * from one direction.
 *
 * We also consider:
 *
 *     leftHalf - 1
 *     leftHalf
 *     leftHalf + 1
 *
 * and generate palindromes from them.
 *
 * We also handle boundary palindromes such as:
 *
 *     9
 *     99
 *     999
 *     ...
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

var minimumCost = function (nums) {
  nums.sort((a, b) => a - b);
  const median = nums[Math.floor(nums.length / 2)];
  const lowerPalindrome = findPalindrome(median, false);
  const upperPalindrome = findPalindrome(median, true);
  const lowerCost = calculateCost(nums, lowerPalindrome);
  const upperCost = calculateCost(nums, upperPalindrome);
  return Math.min(lowerCost, upperCost);
};

function findPalindrome(num, findHigher) {
  const str = String(num);
  const length = str.length;

  const halfLength = Math.ceil(length / 2);
  const leftPart = Number(str.slice(0, halfLength));

  const candidates = [
    createPalindrome(leftPart - 1, length),
    createPalindrome(leftPart, length),
    createPalindrome(leftPart + 1, length),
    Math.pow(10, length - 1) - 1,
    Math.pow(10, length) + 1,
  ];

  let best = findHigher ? Infinity : -Infinity;

  for (const candidate of candidates) {
    if (candidate <= 0) {
      continue;
    }

    if (findHigher) {
      if (candidate >= num && candidate < best) {
        best = candidate;
      }
    } else {
      if (candidate <= num && candidate > best) {
        best = candidate;
      }
    }
  }

  return best;
}

function createPalindrome(leftPart, length) {
  if (leftPart <= 0) {
    return 0;
  }

  const leftString = String(leftPart);

  if (leftString.length > Math.ceil(length / 2)) {
    return Number("1" + "0".repeat(length - 1) + "1");
  }

  const rightPart =
    length % 2 === 0
      ? leftString.split("").reverse().join("")
      : leftString.slice(0, -1).split("").reverse().join("");

  return Number(leftString + rightPart);
}

function calculateCost(nums, target) {
  let cost = 0;

  for (const value of nums) {
    cost += Math.abs(value - target);
  }

  return cost;
}
