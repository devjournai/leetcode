/**
 * To Lower Case
 * Intuition: ASCII uppercase is 65–90; adding 32 yields lowercase. Other chars copy through.
 * Approach: 1. For each char, if charCode in [65,90], push fromCharCode(code+32); else push original. 2. Join `processedChars`.
 * Dry Run: "Hello". H→h, e,l,l,o unchanged → "hello".
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
