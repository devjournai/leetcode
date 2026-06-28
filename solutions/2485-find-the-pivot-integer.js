/**
 * Find The Pivot Integer
 * Intuition: The problem requires finding an integer 'x' where the sum of numbers from 1 to 'x' equals the sum of numbers from 'x' to 'n'. The sum from 1 to 'x' is `x * (x + 1) / 2`. The sum from 'x' to 'n' can be expressed as the total sum from 1 to 'n' minus the sum from 1 to `(x-1)`. Setting these two expressions equal and simplifying algebraically reveals that `x^2` must be equal to the total sum of numbers from 1 to 'n'. Therefore, 'x' must be the square root of the total sum.
 * Approach: 1. Calculate the full sum of integers from 1 to 'n' using the formula for the sum of an arithmetic series: `n * (n + 1) / 2`. 2. Compute the square root of this full sum. This value represents the potential pivot integer. 3. Verify if this potential pivot is indeed an integer and also if it falls within the valid range of 1 to 'n' (inclusive). 4. If both conditions are met, return the potential pivot; otherwise, return -1.
 * Dry Run: n = 8
 * 1. The input value `n` is 8.
 * 2. Calculate `sumAllElements`: `8 * (8 + 1) / 2 = 8 * 9 / 2 = 72 / 2 = 36`.
 * 3. Calculate `potentialPivot`: `Math.sqrt(36) = 6`.
 * 4. Evaluate conditions for `potentialPivot`:
 *    - `Number.isInteger(6)` is `true`.
 *    - `6 >= 1` is `true`.
 *    - `6 <= 8` is `true`.
 * 5. All conditions are true. `resultValue` is assigned `6`.
 * 6. The function returns `6`.
 * Dry Run: n = 4
 * 1. The input value `n` is 4.
 * 2. Calculate `sumAllElements`: `4 * (4 + 1) / 2 = 4 * 5 / 2 = 20 / 2 = 10`.
 * 3. Calculate `potentialPivot`: `Math.sqrt(10) ≈ 3.162`.
 * 4. Evaluate conditions for `potentialPivot`:
 *    - `Number.isInteger(3.162)` is `false`.
 * 5. The first condition fails. `resultValue` is assigned `-1`.
 * 6. The function returns `-1`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var pivotInteger = function (n) {
  const sumAllElements = (n * (n + 1)) / 2;
  const potentialPivot = Math.sqrt(sumAllElements);

  let resultValue;

  if (
    Number.isInteger(potentialPivot) &&
    potentialPivot >= 1 &&
    potentialPivot <= n
  ) {
    resultValue = potentialPivot;
  } else {
    resultValue = -1;
  }
  return resultValue;
};
