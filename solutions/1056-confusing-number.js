/**
 * Confusing Number
 * Intuition: Only 0,1,6,8,9 rotate to valid digits (6<->9). Reverse-rotate the digits; it is confusing if the new number differs from n.
 * Approach: 1. Map rotatable digits. 2. Walk n's digits right to left; fail if a digit is unmapped. 3. Append the rotated digit. 4. Parse and compare to n.
 * Dry Run: n = 6.
 *   - Rotate reverse "9" != 6 -> true.
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var confusingNumber = function (n) {
  const mappingForRotation = { 0: "0", 1: "1", 6: "9", 8: "8", 9: "6" };
  const inputDigitsString = n.toString();

  const reversedRotatedChars = [];
  for (
    let loopIndex = inputDigitsString.length - 1;
    loopIndex >= 0;
    loopIndex--
  ) {
    const currentInputChar = inputDigitsString[loopIndex];
    if (!(currentInputChar in mappingForRotation)) {
      return false;
    }
    reversedRotatedChars.push(mappingForRotation[currentInputChar]);
  }

  const finalRotatedNumString = reversedRotatedChars.join("");
  const parsedRotatedValue = parseInt(finalRotatedNumString, 10);

  return parsedRotatedValue !== n;
};
