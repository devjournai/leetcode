/**
 * Maximum 69 Number
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
