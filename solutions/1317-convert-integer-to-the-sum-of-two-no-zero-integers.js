/**
 * Convert Integer To The Sum Of Two No Zero Integers
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
