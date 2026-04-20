/**
 * Confusing Number
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
