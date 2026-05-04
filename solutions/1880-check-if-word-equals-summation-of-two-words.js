/**
 * Check If Word Equals Summation Of Two Words
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var isSumEqual = function (firstWord, secondWord, targetWord) {
  function buildNumericalValue(inputString) {
    let currentNumericalSum = 0;
    for (let charIndex = 0; charIndex < inputString.length; charIndex++) {
      let currentChar = inputString[charIndex];
      let digitValue = currentChar.charCodeAt(0) - "a".charCodeAt(0);
      currentNumericalSum = currentNumericalSum * 10 + digitValue;
    }
    return currentNumericalSum;
  }

  let firstWordValue = buildNumericalValue(firstWord);
  let secondWordValue = buildNumericalValue(secondWord);
  let targetWordValue = buildNumericalValue(targetWord);

  let calculatedSum = firstWordValue + secondWordValue;
  return calculatedSum === targetWordValue;
};
