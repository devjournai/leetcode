/**
 * Bitwise Xor Of All Pairings
 * Intuition: The bitwise XOR sum of all pairings between two arrays `nums1` and `nums2` can be simplified by analyzing how many times each element from `nums1` and `nums2` contributes to the final XOR sum. If an element `x` from `nums1` is paired with all `nums2` elements, it appears `nums2.length` times in the XOR sum for that row. If `nums2.length` is even, `x` XORed with itself an even number of times results in `0`. If `nums2.length` is odd, `x` XORed with itself an odd number of times results in `x`. The same logic applies to elements from `nums2` based on `nums1.length`. Thus, the final XOR sum depends solely on the parities of the array lengths and the individual XOR sums of `nums1` and `nums2`.
 * Approach: 1. Calculate the length of `nums1` as `firstArrayLength` and `nums2` as `secondArrayLength`. 2. Compute the bitwise XOR sum of all elements in `nums1` using a `for...of` loop, storing it in `xorValueOne`. 3. Compute the bitwise XOR sum of all elements in `nums2` using the `reduce` method, storing it in `xorValueTwo`. 4. Initialize a variable `overallXorResult` to `0`. 5. If `secondArrayLength` is odd, XOR `overallXorResult` with `xorValueOne`. 6. If `firstArrayLength` is odd, XOR `overallXorResult` with `xorValueTwo`. 7. Return the final `overallXorResult`.
 * Dry Run: nums1 = [2, 1, 3], nums2 = [10, 2, 5]
 *   firstArrayLength = 3
 *   secondArrayLength = 3
 *   xorValueOne initialized to 0. Loop through nums1:
 *     currentNumberInNums1 = 2: xorValueOne = 0 ^ 2 = 2
 *     currentNumberInNums1 = 1: xorValueOne = 2 ^ 1 = 3
 *     currentNumberInNums1 = 3: xorValueOne = 3 ^ 3 = 0
 *   xorValueOne is now 0.
 *   xorValueTwo = nums2.reduce((accumulatorForNums2, currentValueFromNums2) => accumulatorForNums2 ^ currentValueFromNums2, 0)
 *               = (0 ^ 10) ^ 2 ^ 5
 *               = 10 ^ 2 ^ 5
 *               = (1010b ^ 0010b) ^ 0101b
 *               = 1000b ^ 0101b
 *               = 1101b
 *               = 13
 *   xorValueTwo is now 13.
 *   overallXorResult initialized to 0.
 *   Check condition: secondArrayLength (3) is odd (3 % 2 === 1 is true).
 *     overallXorResult = overallXorResult ^ xorValueOne = 0 ^ 0 = 0
 *   Check condition: firstArrayLength (3) is odd (3 % 2 === 1 is true).
 *     overallXorResult = overallXorResult ^ xorValueTwo = 0 ^ 13 = 13
 *   Return overallXorResult (13).
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var xorAllNums = function (nums1, nums2) {
  const firstArrayLength = nums1.length;
  const secondArrayLength = nums2.length;

  let xorValueOne = 0;
  for (let currentNumberInNums1 of nums1) {
    xorValueOne ^= currentNumberInNums1;
  }

  const xorValueTwo = nums2.reduce(
    (accumulatorForNums2, currentValueFromNums2) =>
      accumulatorForNums2 ^ currentValueFromNums2,
    0,
  );

  let overallXorResult = 0;

  if (secondArrayLength % 2 === 1) {
    overallXorResult ^= xorValueOne;
  }

  if (firstArrayLength % 2 === 1) {
    overallXorResult ^= xorValueTwo;
  }

  return overallXorResult;
};
