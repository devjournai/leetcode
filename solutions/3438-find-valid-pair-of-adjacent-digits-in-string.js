/**
 * Find Valid Pair of Adjacent Digits in String
 * Intuition: A valid pair is two different adjacent digits whose global frequencies equal their numeric values.
 * Approach: 1. Count digit frequencies. 2. Scan adjacent pairs and return the first pair where a !== b, count[a]===a, and count[b]===b.
 * Dry Run: s = "2523533". Counts: 2→2, 5→2, 3→3. Pair "23" at the end: 2 appears twice and 3 appears three times.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var findValidPair = function (s) {
  const count = new Array(10).fill(0);
  for (const character of s) {
    count[Number(character)]++;
  }

  for (let index = 0; index < s.length - 1; index++) {
    const first = Number(s[index]);
    const second = Number(s[index + 1]);
    if (
      first !== second &&
      count[first] === first &&
      count[second] === second
    ) {
      return s.slice(index, index + 2);
    }
  }
  return "";
};
