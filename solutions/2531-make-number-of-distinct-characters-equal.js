/**
 * Make Number of Distinct Characters Equal
 *
 * Intuition:
 * There are only 26 lowercase English letters. Therefore, instead of trying every
 * possible index pair (which is too expensive), we can try every possible pair of
 * characters ('a' to 'z') to swap.
 *
 * For each possible swap:
 * - Simulate removing one occurrence of the chosen character from each word.
 * - Simulate adding the other character.
 * - Compute the new number of distinct characters.
 * - If they become equal, return true.
 *
 * Since there are only 26 × 26 = 676 possible swaps, this brute-force simulation
 * is efficient.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count the frequency of every character in both words.
 *
 * 2. Compute:
 *      distinct1 = number of distinct characters in word1.
 *      distinct2 = number of distinct characters in word2.
 *
 * 3. Try every pair of characters:
 *
 *      c1 from 'a' to 'z'
 *      c2 from 'a' to 'z'
 *
 *      Skip if:
 *          c1 doesn't exist in word1
 *          OR
 *          c2 doesn't exist in word2.
 *
 * 4. Simulate swapping c1 and c2.
 *
 *      Update the distinct counts based on:
 *      - removing one occurrence
 *      - adding one occurrence
 *
 * 5. If after the swap:
 *
 *      newDistinct1 == newDistinct2
 *
 *      return true.
 *
 * 6. If every possible swap fails,
 *      return false.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * word1 = "abcc"
 * word2 = "aab"
 *
 * Frequencies:
 *
 * word1:
 * a ->1
 * b ->1
 * c ->2
 *
 * distinct1 = 3
 *
 * word2:
 * a ->2
 * b ->1
 *
 * distinct2 = 2
 *
 * Try swap:
 *
 * c ↔ a
 *
 * word1:
 * remove c
 * add a
 *
 * Still:
 * {a,b,c}
 *
 * distinct1 = 3
 *
 * word2:
 * remove a
 * add c
 *
 * {a,b,c}
 *
 * distinct2 = 3
 *
 * Equal.
 *
 * Return true.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N + 26²) = O(N)
 * Space Complexity: O(26)
 */

var isItPossible = function (word1, word2) {
  const freq1 = Array(26).fill(0);
  const freq2 = Array(26).fill(0);

  for (const ch of word1) {
    freq1[ch.charCodeAt(0) - 97]++;
  }

  for (const ch of word2) {
    freq2[ch.charCodeAt(0) - 97]++;
  }

  const distinct1 = freq1.filter((x) => x > 0).length;
  const distinct2 = freq2.filter((x) => x > 0).length;

  for (let c1 = 0; c1 < 26; c1++) {
    if (freq1[c1] === 0) continue;

    for (let c2 = 0; c2 < 26; c2++) {
      if (freq2[c2] === 0) continue;

      let d1 = distinct1;
      let d2 = distinct2;

      if (c1 === c2) {
        if (d1 === d2) return true;
        continue;
      }

      if (freq1[c1] === 1) d1--;
      if (freq1[c2] === 0) d1++;
      if (freq2[c2] === 1) d2--;
      if (freq2[c1] === 0) d2++;

      if (d1 === d2) {
        return true;
      }
    }
  }

  return false;
};
