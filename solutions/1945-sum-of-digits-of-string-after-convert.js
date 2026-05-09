/**
 * Sum Of Digits Of String After Convert
 * Time Complexity: O(N + k)
 * Space Complexity: O(N)
 */
var getLucky = function (s, k) {
  let assembledNumberString = "";
  for (const characterOfS of s) {
    let charCodeValue = characterOfS.charCodeAt(0);
    let charPosition = (charCodeValue - 96).toString();
    assembledNumberString += charPosition;
  }

  let currentWorkingString = assembledNumberString;
  let finalOutcome = 0;
  let transformCounter = 0;

  while (transformCounter < k) {
    let currentSummingValue = 0;
    for (
      let digitIndex = 0;
      digitIndex < currentWorkingString.length;
      digitIndex++
    ) {
      let digitCharacter = currentWorkingString[digitIndex];
      let parsedDigit = parseInt(digitCharacter);
      currentSummingValue += parsedDigit;
    }

    currentWorkingString = currentSummingValue.toString();
    finalOutcome = currentSummingValue;
    transformCounter++;
  }

  return finalOutcome;
};
