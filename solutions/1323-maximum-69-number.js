/**
 * Maximum 69 Number
 * Intuition: One change 6→9 at the highest place value maximizes the number.
 * Approach: 1. Find the highest power of 10 in num. 2. Scan digits left to right for the first 6. 3. Add 3 * that place (6+3=9). 4. If none, return num.
 * Dry Run: num = 9669. First 6 is hundreds → 9669+300=9969.
 * Time Complexity: O(log N) where N is the input number.
 * Space Complexity: O(1)
 */
var maximum69Number = function (num) {
  let originalNumber = num;
  let placeValue = 1;
  let temporaryNumber = num;

  while (temporaryNumber >= 10) {
    temporaryNumber = Math.floor(temporaryNumber / 10);
    placeValue *= 10;
  }

  let significantChangePosition = -1;
  let currentPlacePower = placeValue;

  while (currentPlacePower >= 1) {
    let extractedDigit = Math.floor(originalNumber / currentPlacePower) % 10;
    if (extractedDigit === 6) {
      significantChangePosition = currentPlacePower;
      break;
    }
    currentPlacePower = Math.floor(currentPlacePower / 10);
  }

  if (significantChangePosition !== -1) {
    let finalResult = originalNumber + 3 * significantChangePosition;
    return finalResult;
  } else {
    return originalNumber;
  }
};
