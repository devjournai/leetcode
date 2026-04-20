/**
 * Valid Parenthesis String
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkValidString = function (s) {
  let lowerBound = 0;
  let upperBound = 0;

  for (const charItem of s) {
    if (charItem === "(") {
      lowerBound++;
      upperBound++;
    } else if (charItem === ")") {
      lowerBound--;
      upperBound--;
    } else {
      lowerBound--;
      upperBound++;
    }

    lowerBound = Math.max(0, lowerBound);
    if (upperBound < 0) {
      return false;
    }
  }

  return lowerBound === 0;
};
