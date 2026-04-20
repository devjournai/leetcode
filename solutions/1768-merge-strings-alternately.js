/**
 * Merge Strings Alternately
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m)
 */
var mergeAlternately = function (word1, word2) {
  let stringOne = word1;
  let stringTwo = word2;
  let firstLength = stringOne.length;
  let secondLength = stringTwo.length;
  let resultContainer = [];
  let indexOne = 0;
  let indexTwo = 0;

  while (indexOne < firstLength && indexTwo < secondLength) {
    resultContainer.push(stringOne[indexOne]);
    resultContainer.push(stringTwo[indexTwo]);
    indexOne++;
    indexTwo++;
  }

  while (indexOne < firstLength) {
    resultContainer.push(stringOne[indexOne]);
    indexOne++;
  }

  while (indexTwo < secondLength) {
    resultContainer.push(stringTwo[indexTwo]);
    indexTwo++;
  }

  return resultContainer.join("");
};
