/**
 * Valid Perfect Square
 * Intuition: Perfect squares are spaced far enough that binary search on the integer range [1, num] can test whether some mid squared equals num without enumerating every candidate.
 * Approach: 1. num < 1 is false. 2. low = 1, high = num. 3. Mid = floor(low + (high-low)/2); compare mid*mid to num and shrink high or raise low. 4. Return true on equality, false when the range empties.
 * Dry Run: num = 16. mid 8 → 64>16 high=7; mid 4 → 16==16 true.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var isPerfectSquare = function (num) {
  if (num < 1) {
    return false;
  }

  let lowBoundary = 1;
  let highBoundary = num;

  while (lowBoundary <= highBoundary) {
    let currentMid = Math.floor(lowBoundary + (highBoundary - lowBoundary) / 2);
    let squaredProduct = currentMid * currentMid;

    if (squaredProduct === num) {
      return true;
    } else if (squaredProduct < num) {
      lowBoundary = currentMid + 1;
    } else {
      highBoundary = currentMid - 1;
    }
  }

  return false;
};
