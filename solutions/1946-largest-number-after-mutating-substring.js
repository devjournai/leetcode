/**
 * Largest Number After Mutating Substring
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumNumber = function (inputNumberString, digitMapArray) {
  const characterArray = inputNumberString.split("");
  let hasMutationStarted = false;

  for (
    let processingIndex = 0;
    processingIndex < characterArray.length;
    processingIndex++
  ) {
    const currentParsedDigit = parseInt(characterArray[processingIndex]);
    const mappedReplacementDigit = digitMapArray[currentParsedDigit];

    if (mappedReplacementDigit > currentParsedDigit) {
      characterArray[processingIndex] = mappedReplacementDigit.toString();
      hasMutationStarted = true;
    } else if (
      mappedReplacementDigit < currentParsedDigit &&
      hasMutationStarted
    ) {
      break;
    }
  }

  return characterArray.join("");
};
