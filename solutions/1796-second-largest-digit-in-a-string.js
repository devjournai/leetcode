/**
 * Second Largest Digit In A String
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var secondHighest = function (s) {
  const uniqueDigitsSet = new Set();
  const inputStringLength = s.length;

  for (let charIndex = 0; charIndex < inputStringLength; charIndex++) {
    const currentCharacter = s[charIndex];
    const characterCode = currentCharacter.charCodeAt(0);

    if (characterCode >= 48 && characterCode <= 57) {
      const digitValue = parseInt(currentCharacter, 10);
      uniqueDigitsSet.add(digitValue);
    }
  }

  const collectedDigits = Array.from(uniqueDigitsSet);

  collectedDigits.sort((valueOne, valueTwo) => valueTwo - valueOne);

  const digitArraySize = collectedDigits.length;
  if (digitArraySize >= 2) {
    return collectedDigits[1];
  } else {
    return -1;
  }
};
