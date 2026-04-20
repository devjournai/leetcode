/**
 * Repeated String Match
 * Time Complexity: O(A.length + B.length)
 * Space Complexity: O(A.length + B.length)
 */
var repeatedStringMatch = function (A, B) {
  let baseRepetitions = Math.ceil(B.length / A.length);

  for (
    let currentRepetitionCount = baseRepetitions;
    currentRepetitionCount <= baseRepetitions + 1;
    currentRepetitionCount++
  ) {
    let constructedString = A.repeat(currentRepetitionCount);
    if (constructedString.includes(B)) {
      return currentRepetitionCount;
    }
  }

  return -1;
};
