/**
 * Sqrtx
 * Intuition: The integer square root is the largest m with m*m ≤ x. Binary search on [0, x] using m <= x/m to avoid overflow finds that m.
 * Approach: 1. If x < 2, return x. 2. Search left=0, right=x. 3. Mid = floor((left+right)/2); if mid <= x/mid, record mid and search higher, else search lower. 4. Return the last valid mid.
 * Dry Run: x = 8.
 *   - mid=4: 4 > 8/4 → right=3. mid=1: 1 <= 8/1 → result=1, left=2. mid=2: 2 <= 8/2 → result=2, left=3. mid=3: 3 > 8/3 → right=2. Return 2.
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
var mySqrt = function (x) {
  if (x < 2) {
    return x;
  }

  let searchLeft = 0;
  let searchRight = x;
  let resultValue = 0;

  while (searchLeft <= searchRight) {
    let middlePoint = Math.floor(searchLeft + (searchRight - searchLeft) / 2);
    if (middlePoint <= x / middlePoint) {
      resultValue = middlePoint;
      searchLeft = middlePoint + 1;
    } else {
      searchRight = middlePoint - 1;
    }
  }

  return resultValue;
};
