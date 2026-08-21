/**
 * Check If A String Can Break Another String
 * Intuition: After sorting both strings, one permutation can break the other iff every character is >= the other string's character at the same rank.
 * Approach: 1. Sort both strings' characters. 2. Check whether sorted s1 is pairwise >= sorted s2. 3. Check the opposite direction. 4. Return true if either check succeeds.
 * Dry Run: s1 = "abc", s2 = "xya"
 *   - sorted: "abc" vs "axy"
 *   - s1 >= s2? a<x fails
 *   - s2 >= s1? a>=a, x>=b, y>=c. Return true.
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
