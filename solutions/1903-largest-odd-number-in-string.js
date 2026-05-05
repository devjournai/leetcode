/**
 * Largest Odd Number In String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var largestOddNumber = function (num) {
  let stringLengthValue = num.length;
  let currentIndex = stringLengthValue - 1;

  while (currentIndex >= 0) {
    let characterAtPosition = num[currentIndex];
    let numericValue = parseInt(characterAtPosition);

    if (numericValue % 2 === 1) {
      let resultSubstring = num.slice(0, currentIndex + 1);
      return resultSubstring;
    }
    currentIndex--;
  }

  let emptyResult = "";
  return emptyResult;
};
