/**
 * Optimal Division
 * Intuition: With only division, maximizing a0/a1/.../an-1 means minimizing the divisor of a0. Parenthesizing a1/.../an-1 as one group does that (each later divide becomes multiply in the divisor's reciprocal).
 * Approach: 1. Length 1: return the number as a string. 2. Length 2: return `a/b`. 3. Otherwise return `a0/(a1/a2/.../an-1)` by joining the slice after index 0 with "/".
 * Dry Run: nums = [1000,100,10,2].
 *   - Not 1 or 2 elements, so "1000/(100/10/2)" which evaluates to 200.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var optimalDivision = function (nums) {
  let arrayLength = nums.length;

  if (arrayLength === 1) {
    return nums[0].toString();
  }

  if (arrayLength === 2) {
    let firstNum = nums[0];
    let secondNum = nums[1];
    return `${firstNum}/${secondNum}`;
  }

  let initialNumber = nums[0];
  let remainingNumbers = nums.slice(1);
  let joinedRemaining = remainingNumbers.join("/");

  return `${initialNumber}/(${joinedRemaining})`;
};
