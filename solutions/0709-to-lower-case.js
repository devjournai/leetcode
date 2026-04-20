/**
 * To Lower Case
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var toLowerCase = function (inputString) {
  const stringLength = inputString.length;
  const processedChars = [];
  const lowerCaseOffset = 32;

  for (let currentIndex = 0; currentIndex < stringLength; currentIndex++) {
    const currentChar = inputString[currentIndex];
    const charNumericalValue = currentChar.charCodeAt(0);

    if (charNumericalValue >= 65 && charNumericalValue <= 90) {
      const transformedCharValue = charNumericalValue + lowerCaseOffset;
      const finalCharacter = String.fromCharCode(transformedCharValue);
      processedChars.push(finalCharacter);
    } else {
      processedChars.push(currentChar);
    }
  }

  return processedChars.join("");
};
