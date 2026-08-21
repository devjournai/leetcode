/**
 * Climbing Stairs
 * Intuition: Reaching step n takes the sum of ways to n-1 and n-2 (last step of 1 or 2). That is Fibonacci, which two rolling variables compute in linear time.
 * Approach: 1. If n ≤ 2, return n. 2. Keep ways(n-2) and ways(n-1) starting at 1 and 2. 3. For i from 3 to n, next = those two sums, then shift. 4. Return ways for n.
 * Dry Run: n = 5.
 *   - i=3: 1+2=3. i=4: 2+3=5. i=5: 3+5=8. Return 8.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }

  let previousTwoStepsWays = 1;
  let previousOneStepWays = 2;
  let currentCalculatedWays;

  for (let stepIterator = 3; stepIterator <= n; stepIterator++) {
    currentCalculatedWays = previousTwoStepsWays + previousOneStepWays;
    previousTwoStepsWays = previousOneStepWays;
    previousOneStepWays = currentCalculatedWays;
  }

  return previousOneStepWays;
};
