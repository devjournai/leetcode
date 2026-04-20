/**
 * Thousand Separator
 * Time Complexity: O(logN)
 * Space Complexity: O(logN)
 */
var thousandSeparator = function (n) {
  const numberStringRepresentation = n.toString();
  const stringLength = numberStringRepresentation.length;
  const separatedParts = [];
  let currentDigitCounter = 0;

  for (
    let currentPosition = stringLength - 1;
    currentPosition >= 0;
    currentPosition--
  ) {
    separatedParts.push(numberStringRepresentation[currentPosition]);
    currentDigitCounter++;

    if (currentDigitCounter % 3 === 0 && currentPosition > 0) {
      separatedParts.push(".");
      currentDigitCounter = 0;
    }
  }

  return separatedParts.reverse().join("");
};
