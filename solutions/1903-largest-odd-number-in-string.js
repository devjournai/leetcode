/**
 * Largest Odd Number In String
 * Intuition: The largest odd-valued prefix is the number ending at the rightmost odd digit.
 * Approach: 1. Scan `currentIndex` from the end. 2. If digit % 2 === 1, return `num.slice(0, currentIndex+1)`. 3. Else return "".
 * Dry Run: num="52". '2' even, '5' odd → "5".
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
