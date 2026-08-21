/**
 * Special Array With X Elements Greater Than Or Equal X
 * Intuition: X can only be 0..n, so try each candidate and count how many values are ≥ X; the array is special when that count equals X.
 * Approach: 1. For possibleX from 0 to n, scan the array and count values ≥ possibleX. 2. If the count equals possibleX, return it. 3. If none match, return -1.
 * Dry Run: nums = [3,5].
 *   - X=0 count=2; X=1 count=2; X=2 count=2 → return 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var specialArray = function (numbers) {
  const arraySize = numbers.length;

  for (let possibleX = 0; possibleX <= arraySize; possibleX++) {
    let countGreaterOrEqual = 0;
    for (let elementValue of numbers) {
      if (elementValue >= possibleX) {
        countGreaterOrEqual++;
      }
    }
    if (countGreaterOrEqual === possibleX) {
      return possibleX;
    }
  }

  return -1;
};
