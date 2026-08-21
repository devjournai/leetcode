/**
 * Convert Integer To The Sum Of Two No Zero Integers
 * Intuition: Search A from 1 upward so B = n-A, and both numbers have no digit 0.
 * Approach: 1. Digit-scan a number for zeros. 2. Increment A until A and n-A are both zero-free. 3. Return [A, B].
 * Dry Run: n = 11. A=1 B=10 has a 0; A=2 B=9 works → [2,9].
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var getNoZeroIntegers = function (n) {
  const checkZeroOccurrence = function (numericValue) {
    let currentNumberToCheck = numericValue;
    while (currentNumberToCheck > 0) {
      let digitExtracted = currentNumberToCheck % 10;
      if (digitExtracted === 0) {
        return false;
      }
      currentNumberToCheck = Math.floor(currentNumberToCheck / 10);
    }
    return true;
  };

  let initialInput = n;
  let componentA = 1;
  while (true) {
    let componentB = initialInput - componentA;
    if (checkZeroOccurrence(componentA) && checkZeroOccurrence(componentB)) {
      return [componentA, componentB];
    }
    componentA++;
  }
};
