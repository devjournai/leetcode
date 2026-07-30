/**
 * Check if Strings Can be Made Equal With Operations I
 *
 * Intuition:
 * The allowed operation lets us swap:
 *
 *      • index 0 with index 2
 *      • index 1 with index 3
 *
 * Therefore:
 *
 * • Characters at even indices can only move among even indices.
 * • Characters at odd indices can only move among odd indices.
 *
 * So, two strings can be made equal if and only if:
 *
 *      • Their even-index characters are the same (ignoring order).
 *      • Their odd-index characters are the same (ignoring order).
 *
 * Sorting the characters from each group allows us to compare them easily.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Extract characters at even indices:
 *
 *      [0, 2]
 *
 * 2. Sort and compare the even-index characters of both strings.
 *
 * 3. Extract characters at odd indices:
 *
 *      [1, 3]
 *
 * 4. Sort and compare the odd-index characters of both strings.
 *
 * 5. If both groups match, return true; otherwise return false.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s1 = "abcd"
 * s2 = "cdab"
 *
 * Even indices:
 *
 *      s1 -> ['a', 'c']
 *      s2 -> ['c', 'a']
 *
 * After sorting:
 *
 *      "ac" == "ac"
 *
 * Odd indices:
 *
 *      s1 -> ['b', 'd']
 *      s2 -> ['d', 'b']
 *
 * After sorting:
 *
 *      "bd" == "bd"
 *
 * Both groups match.
 *
 * Answer:
 *
 *      true
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

var canBeEqual = function (s1, s2) {
  const charactersS1EvenIndices = [s1[0], s1[2]];
  const charactersS2EvenIndices = [s2[0], s2[2]];

  const sortedCharsS1Even = charactersS1EvenIndices.sort();
  const sortedCharsS2Even = charactersS2EvenIndices.sort();

  const joinedS1Even = sortedCharsS1Even.join("");
  const joinedS2Even = sortedCharsS2Even.join("");

  const evenPositionsMatch = joinedS1Even === joinedS2Even;

  const charactersS1OddIndices = [s1[1], s1[3]];
  const charactersS2OddIndices = [s2[1], s2[3]];

  const sortedCharsS1Odd = charactersS1OddIndices.sort();
  const sortedCharsS2Odd = charactersS2OddIndices.sort();

  const joinedS1Odd = sortedCharsS1Odd.join("");
  const joinedS2Odd = sortedCharsS2Odd.join("");

  const oddPositionsMatch = joinedS1Odd === joinedS2Odd;

  const overallEqualityPossible = evenPositionsMatch && oddPositionsMatch;
  return overallEqualityPossible;
};
