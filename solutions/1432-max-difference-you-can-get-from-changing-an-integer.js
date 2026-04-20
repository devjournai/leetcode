/**
 * Max Difference You Can Get From Changing An Integer
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var maxDiff = function (num) {
  const numberAsStringValue = String(num);
  const initialDigitCharacters = Array.from(numberAsStringValue);

  const maxNumberDigitCollection = initialDigitCharacters.slice();
  let targetDigitForMax = "";
  let foundTargetForMaximization = false;

  for (
    let currentPosition = 0;
    currentPosition < maxNumberDigitCollection.length;
    currentPosition++
  ) {
    if (maxNumberDigitCollection[currentPosition] !== "9") {
      targetDigitForMax = maxNumberDigitCollection[currentPosition];
      foundTargetForMaximization = true;
      break;
    }
  }

  if (foundTargetForMaximization) {
    for (
      let scanIndexForMax = 0;
      scanIndexForMax < maxNumberDigitCollection.length;
      scanIndexForMax++
    ) {
      if (maxNumberDigitCollection[scanIndexForMax] === targetDigitForMax) {
        maxNumberDigitCollection[scanIndexForMax] = "9";
      }
    }
  }

  const calculatedMaxValue = parseInt(maxNumberDigitCollection.join(""));

  const minNumberDigitCollection = initialDigitCharacters.slice();
  let digitToModifyForMin = "";
  let desiredReplacementDigit = "";
  let modificationNecessary = false;

  if (minNumberDigitCollection[0] !== "1") {
    digitToModifyForMin = minNumberDigitCollection[0];
    desiredReplacementDigit = "1";
    modificationNecessary = true;
  } else {
    for (
      let checkingIndexForMin = 1;
      checkingIndexForMin < minNumberDigitCollection.length;
      checkingIndexForMin++
    ) {
      if (
        minNumberDigitCollection[checkingIndexForMin] !== "0" &&
        minNumberDigitCollection[checkingIndexForMin] !== "1"
      ) {
        digitToModifyForMin = minNumberDigitCollection[checkingIndexForMin];
        desiredReplacementDigit = "0";
        modificationNecessary = true;
        break;
      }
    }
  }

  if (modificationNecessary) {
    for (
      let replacementLoopIndex = 0;
      replacementLoopIndex < minNumberDigitCollection.length;
      replacementLoopIndex++
    ) {
      if (
        minNumberDigitCollection[replacementLoopIndex] === digitToModifyForMin
      ) {
        minNumberDigitCollection[replacementLoopIndex] =
          desiredReplacementDigit;
      }
    }
  }

  const calculatedMinValue = parseInt(minNumberDigitCollection.join(""));

  return calculatedMaxValue - calculatedMinValue;
};
