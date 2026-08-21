/**
 * Thousand Separator
 * Intuition: Insert a dot every three digits from the right.
 * Approach: 1. Walk the decimal string backward. 2. After every 3 digits (except at the start) push '.'. 3. Reverse-join.
 * Dry Run: n = 123456789.
 *   - Groups 123, 456, 789 → "123.456.789".
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
