/**
 * Check If A String Can Break Another String
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var checkIfCanBreak = function (s1, s2) {
  const totalLength = s1.length;

  const sortedCharsFirst = s1.split("").sort();
  const sortedCharsSecond = s2.split("").sort();

  let isBreakableOne = true;
  for (let checkIndexA = 0; checkIndexA < totalLength; checkIndexA++) {
    const charFromFirstStringA = sortedCharsFirst[checkIndexA];
    const charFromSecondStringA = sortedCharsSecond[checkIndexA];
    if (charFromFirstStringA < charFromSecondStringA) {
      isBreakableOne = false;
      break;
    }
  }

  let isBreakableTwo = true;
  for (let checkIndexB = 0; checkIndexB < totalLength; checkIndexB++) {
    const charFromFirstStringB = sortedCharsFirst[checkIndexB];
    const charFromSecondStringB = sortedCharsSecond[checkIndexB];
    if (charFromSecondStringB < charFromFirstStringB) {
      isBreakableTwo = false;
      break;
    }
  }

  return isBreakableOne || isBreakableTwo;
};
