/**
 * Three Consecutive Odds
 * Intuition: A window of three odds exists iff some i,i+1,i+2 are all odd.
 * Approach: 1. If n<3 return false. 2. Slide triples checking %2. 3. Return true on the first hit.
 * Dry Run: arr = [2,6,4,1].
 *   - No triple of odds → false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var threeConsecutiveOdds = function (arr) {
  const arraySize = arr.length;
  if (arraySize < 3) {
    return false;
  }

  for (
    let currentPosition = 0;
    currentPosition <= arraySize - 3;
    currentPosition++
  ) {
    const firstValue = arr[currentPosition];
    const secondValue = arr[currentPosition + 1];
    const thirdValue = arr[currentPosition + 2];

    if (firstValue % 2 !== 0 && secondValue % 2 !== 0 && thirdValue % 2 !== 0) {
      return true;
    }
  }

  return false;
};
