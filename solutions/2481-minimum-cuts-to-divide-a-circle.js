/**
 * Minimum Cuts To Divide A Circle
 * Intuition: To divide a circle into `n` equal slices, we effectively need `n` radial lines originating from the center. If `n=1`, no cuts are needed as the circle is already a single slice. For `n > 1`, if `n` is an even number, each diameter cut creates two radial lines (forming two equal slices), so `n/2` diameter cuts are sufficient. If `n` is an odd number, diameter cuts always produce an even number of slices and thus cannot directly form an odd count; instead, `n` individual radius cuts are required, each defining one edge of a slice.
 * Approach: 1. First, check if the input number `n` is equal to 1. If it is, no cuts are needed, so the function returns 0. 2. Next, if `n` is not 1, determine if `n` is an even number by checking its remainder when divided by 2. 3. If `n` is an even number, the minimum cuts required is `n` divided by 2, as each diameter cut forms two equal slices. 4. If `n` is neither 1 nor an even number (implying it is an odd number greater than 1), then `n` individual radius cuts are necessary to form `n` equal slices.
 * Dry Run:
 *   Input: n = 5
 *   1. Check if `n` (which is 5) equals 1: The condition `5 === 1` is false.
 *   2. Proceed to the next condition. Check if `n` (which is 5) is even: The condition `5 % 2 === 0` is false.
 *   3. Since neither of the above conditions was met, the `else` block is executed. `requiredCuts` is assigned the value of `n`, which is 5.
 *   4. The function returns `requiredCuts`, which is 5.
 *   Output: 5
 *
 *   Input: n = 4
 *   1. Check if `n` (which is 4) equals 1: The condition `4 === 1` is false.
 *   2. Proceed to the next condition. Check if `n` (which is 4) is even: The condition `4 % 2 === 0` is true.
 *   3. The `else if` block is executed. `requiredCuts` is assigned the value of `n / 2`, which is `4 / 2 = 2`.
 *   4. The function returns `requiredCuts`, which is 2.
 *   Output: 2
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numberOfCuts = function (n) {
  let requiredCuts;

  if (n === 1) {
    requiredCuts = 0;
  } else if (n % 2 === 0) {
    requiredCuts = n / 2;
  } else {
    requiredCuts = n;
  }

  return requiredCuts;
};
