/**
 * Confusing Number II
 * Time Complexity: O(5^L * L)
 * Space Complexity: O(L)
 */
var confusingNumberII = function (n) {
  const validRotationalDigits = [0, 1, 6, 8, 9];
  const digitRotationMapping = { 0: 0, 1: 1, 6: 9, 8: 8, 9: 6 };
  let confusingNumbersCount = 0;

  function checkRotationAndDifference(numberValue) {
    const originalNumber = numberValue;
    let reversedRotation = 0;
    let temporaryNumberForRotation = numberValue;

    while (temporaryNumberForRotation > 0) {
      const currentDigitForRotation = temporaryNumberForRotation % 10;
      reversedRotation =
        reversedRotation * 10 + digitRotationMapping[currentDigitForRotation];
      temporaryNumberForRotation = Math.floor(temporaryNumberForRotation / 10);
    }
    return originalNumber !== reversedRotation;
  }

  function generateAndEvaluateNumbers(currentBuiltNumber) {
    if (currentBuiltNumber > 0 && currentBuiltNumber <= n) {
      if (checkRotationAndDifference(currentBuiltNumber)) {
        confusingNumbersCount++;
      }
    }

    for (const nextDigitOption of validRotationalDigits) {
      if (currentBuiltNumber === 0 && nextDigitOption === 0) {
        continue;
      }

      const nextPotentialNumber = currentBuiltNumber * 10 + nextDigitOption;

      if (nextPotentialNumber > n) {
        break;
      }

      generateAndEvaluateNumbers(nextPotentialNumber);
    }
  }

  generateAndEvaluateNumbers(0);

  return confusingNumbersCount;
};
