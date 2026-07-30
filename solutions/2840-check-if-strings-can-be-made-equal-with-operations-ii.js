/**
 * Check if Strings Can be Made Equal With Operations II
 *
 * Intuition:
 * The allowed operation lets us swap characters only between indices that
 * have the same parity.
 *
 * Therefore:
 *
 * • Characters at even indices can only move to other even indices.
 * • Characters at odd indices can only move to other odd indices.
 *
 * This means the set of characters at even positions and the set of
 * characters at odd positions remain unchanged.
 *
 * So, two strings can be made equal if and only if:
 *
 *      • Their even-index characters are identical (ignoring order).
 *      • Their odd-index characters are identical (ignoring order).
 *
 * Sorting each group provides a simple way to compare them.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Traverse both strings simultaneously.
 *
 * 2. Store characters at:
 *
 *      • Even indices in separate arrays.
 *      • Odd indices in separate arrays.
 *
 * 3. Sort each array.
 *
 * 4. Join the sorted arrays into strings.
 *
 * 5. Compare:
 *
 *      • Even groups.
 *      • Odd groups.
 *
 * 6. Return true if both comparisons match; otherwise return false.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s1 = "abcdba"
 * s2 = "cabdab"
 *
 * Even indices:
 *
 *      s1 -> ['a', 'c', 'b']
 *      s2 -> ['c', 'b', 'a']
 *
 * After sorting:
 *
 *      "abc" == "abc"
 *
 * Odd indices:
 *
 *      s1 -> ['b', 'd', 'a']
 *      s2 -> ['a', 'd', 'b']
 *
 * After sorting:
 *
 *      "abd" == "abd"
 *
 * Both groups match.
 *
 * Answer:
 *
 *      true
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var checkStrings = function (s1, s2) {
  const s1EvenContainer = [];
  const s1OddContainer = [];
  const s2EvenContainer = [];
  const s2OddContainer = [];

  const stringLength = s1.length;
  let indexCounter = 0;

  while (indexCounter < stringLength) {
    if (indexCounter % 2 === 0) {
      s1EvenContainer.push(s1[indexCounter]);
      s2EvenContainer.push(s2[indexCounter]);
    } else {
      s1OddContainer.push(s1[indexCounter]);
      s2OddContainer.push(s2[indexCounter]);
    }

    indexCounter++;
  }

  const sortedS1Even = s1EvenContainer.sort().join("");
  const sortedS2Even = s2EvenContainer.sort().join("");
  const sortedS1Odd = s1OddContainer.sort().join("");
  const sortedS2Odd = s2OddContainer.sort().join("");

  return sortedS1Even === sortedS2Even && sortedS1Odd === sortedS2Odd;
};
