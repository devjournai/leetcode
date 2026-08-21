/**
 * Check If Word Equals Summation Of Two Words
 * Intuition: Map a→0 … j→9 and interpret each word as a base-10 number, then test first+second === target.
 * Approach: 1. `buildNumericalValue` folds charCode-'a' into `currentNumericalSum`. 2. Compare the three values.
 * Dry Run: firstWord="acb", secondWord="cba", targetWord="cdb" → 021 + 210 = 231. True.
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
