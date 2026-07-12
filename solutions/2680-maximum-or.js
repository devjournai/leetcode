/**
 * Maximum Or
 * Intuition: To maximize the bitwise OR of all numbers by applying `k` multiplications by 2 to a single element, we should iterate through each element. For each element, we simulate applying the `k` multiplications (left shift by `k`) to it, then calculate the total bitwise OR with all other unmodified elements. The maximum of these total ORs will be the answer.
 * Approach: 1. Precompute cumulative bitwise ORs from the beginning of the array (prefix ORs). 2. Precompute cumulative bitwise ORs from the end of the array (suffix ORs). 3. Iterate through each number in the input array. For each number at index `i`, calculate the OR of: a. The prefix OR up to `i-1`. b. The current number `nums[i]` left-shifted by `k` (multiplied by `2^k`). c. The suffix OR from `i+1` to the end. 4. Keep track of the maximum OR value found across all iterations. Return this maximum.
 * Dry Run: nums = [1, 2, 3], k = 1
 * arrayLength = 3
 *
 * 1. cumulativePrefixOr initialization: [0n, 0n, 0n, 0n]
 *    cumulativeSuffixOr initialization: [0n, 0n, 0n, 0n]
 *
 * 2. Populate cumulativePrefixOr:
 *    firstIndex = 0: cumulativePrefixOr[1] = cumulativePrefixOr[0] | BigInt(1) = 0n | 1n = 1n
 *    firstIndex = 1: cumulativePrefixOr[2] = cumulativePrefixOr[1] | BigInt(2) = 1n | 2n = 3n
 *    firstIndex = 2: cumulativePrefixOr[3] = cumulativePrefixOr[2] | BigInt(3) = 3n | 3n = 3n
 *    cumulativePrefixOr: [0n, 1n, 3n, 3n]
 *
 * 3. Populate cumulativeSuffixOr:
 *    lastIndex = 2: cumulativeSuffixOr[2] = cumulativeSuffixOr[3] | BigInt(3) = 0n | 3n = 3n
 *    lastIndex = 1: cumulativeSuffixOr[1] = cumulativeSuffixOr[2] | BigInt(2) = 3n | 2n = 3n
 *    lastIndex = 0: cumulativeSuffixOr[0] = cumulativeSuffixOr[1] | BigInt(1) = 3n | 1n = 3n
 *    cumulativeSuffixOr: [3n, 3n, 3n, 0n]
 *
 * 4. currentMaximumOr = 0n, shiftAmount = 1n
 *
 * 5. Main loop:
 *    elementIndex = 0 (inputNumbers[0] = 1):
 *      currentNumberBig = 1n
 *      modifiedNumberOr = 1n << 1n = 2n
 *      totalOrCandidate = cumulativePrefixOr[0] | modifiedNumberOr | cumulativeSuffixOr[1] = 0n | 2n | 3n = 3n
 *      currentMaximumOr = 3n
 *    elementIndex = 1 (inputNumbers[1] = 2):
 *      currentNumberBig = 2n
 *      modifiedNumberOr = 2n << 1n = 4n
 *      totalOrCandidate = cumulativePrefixOr[1] | modifiedNumberOr | cumulativeSuffixOr[2] = 1n | 4n | 3n = 7n
 *      currentMaximumOr = 7n
 *    elementIndex = 2 (inputNumbers[2] = 3):
 *      currentNumberBig = 3n
 *      modifiedNumberOr = 3n << 1n = 6n
 *      totalOrCandidate = cumulativePrefixOr[2] | modifiedNumberOr | cumulativeSuffixOr[3] = 3n | 6n | 0n = 7n
 *      currentMaximumOr = 7n
 *
 * 6. Return Number(7n) = 7.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumOr = function (nums, k) {
  const arrayLength = nums.length;
  const cumulativePrefixOr = new Array(arrayLength + 1).fill(0n);
  const cumulativeSuffixOr = new Array(arrayLength + 1).fill(0n);

  for (let firstIndex = 0; firstIndex < arrayLength; firstIndex++) {
    cumulativePrefixOr[firstIndex + 1] =
      cumulativePrefixOr[firstIndex] | BigInt(nums[firstIndex]);
  }

  for (let lastIndex = arrayLength - 1; lastIndex >= 0; lastIndex--) {
    cumulativeSuffixOr[lastIndex] =
      cumulativeSuffixOr[lastIndex + 1] | BigInt(nums[lastIndex]);
  }

  let currentMaximumOr = 0n;
  const shiftAmount = BigInt(k);

  for (let elementIndex = 0; elementIndex < arrayLength; elementIndex++) {
    const currentNumberBig = BigInt(nums[elementIndex]);
    const modifiedNumberOr = currentNumberBig << shiftAmount;
    const totalOrCandidate =
      cumulativePrefixOr[elementIndex] |
      modifiedNumberOr |
      cumulativeSuffixOr[elementIndex + 1];

    currentMaximumOr =
      totalOrCandidate > currentMaximumOr ? totalOrCandidate : currentMaximumOr;
  }

  return Number(currentMaximumOr);
};
