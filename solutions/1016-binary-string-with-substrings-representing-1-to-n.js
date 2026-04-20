/**
 * Binary String With Substrings Representing 1 To N
 * Time Complexity: O(n * s.length * log n)
 * Space Complexity: O(log n)
 */
var queryString = function (inputString, targetNumber) {
  for (
    let currentIntegerToCheck = 1;
    currentIntegerToCheck <= targetNumber;
    currentIntegerToCheck++
  ) {
    const binaryRepresentation = currentIntegerToCheck.toString(2);
    if (!inputString.includes(binaryRepresentation)) {
      return false;
    }
  }
  return true;
};
