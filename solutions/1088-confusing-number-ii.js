/**
 * Confusing Number II
 * Intuition: Only digits 0,1,6,8,9 rotate into a valid number. DFS-build numbers from those digits up to n, then count those whose 180° rotation (mapped digits reversed) differs from the original.
 * Approach: 1. Recurse appending 0/1/6/8/9, skip leading zeros, stop when > n. 2. For each value in (0,n], reverse with the rotation map. 3. Increment if rotated ≠ original.
 * Dry Run: n=20. Confusing: 6,9,10,16,18,19 (10 rotates to 1). 8 and 11 rotate to themselves. Count 6.
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
