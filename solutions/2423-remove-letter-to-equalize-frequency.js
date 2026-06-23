/**
 * Remove Letter To Equalize Frequency
 *
 * Intuition: We must remove exactly one character and check whether all remaining characters have the same frequency. Since there are only 26 lowercase English letters, we can try removing one occurrence of every existing character and verify whether the remaining non-zero frequencies become equal. If any removal produces equal frequencies, return true. Otherwise return false.
 * Approach:
 * 1. Create a frequency array of size 26.
 * 2. Count occurrences of each character.
 * 3. Iterate through all 26 characters:
 *      - Skip characters whose frequency is 0.
 *      - Temporarily decrease frequency by 1.
 *      - Check whether all non-zero frequencies are equal.
 *      - Restore frequency.
 * 4. If any valid configuration is found, return true.
 * 5. Otherwise return false.
 *
 * Dry Run:
 * word = "abcc"
 *
 * Frequency:
 * a -> 1
 * b -> 1
 * c -> 2
 *
 * Try removing one 'a':
 * a -> 0
 * b -> 1
 * c -> 2
 *
 * Remaining frequencies:
 * [1, 2]
 *
 * Not equal.
 *
 * Restore frequency.
 *
 * Try removing one 'b':
 * a -> 1
 * b -> 0
 * c -> 2
 *
 * Remaining frequencies:
 * [1, 2]
 *
 * Not equal.
 *
 * Restore frequency.
 *
 * Try removing one 'c':
 * a -> 1
 * b -> 1
 * c -> 1
 *
 * Remaining frequencies:
 * [1, 1, 1]
 *
 * All equal.
 *
 * Return true.
 *
 * Example 2:
 * word = "aazz"
 *
 * Frequency:
 * a -> 2
 * z -> 2
 *
 * Remove one 'a':
 * a -> 1
 * z -> 2
 *
 * Not equal.
 *
 * Remove one 'z':
 * a -> 2
 * z -> 1
 *
 * Not equal.
 *
 * Return false.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var equalFrequency = function (word) {
  const freq = new Array(26).fill(0);

  for (const ch of word) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  for (let i = 0; i < 26; i++) {
    if (freq[i] === 0) continue;

    freq[i]--;

    let target = 0;
    let valid = true;

    for (const count of freq) {
      if (count === 0) continue;

      if (target === 0) {
        target = count;
      } else if (target !== count) {
        valid = false;
        break;
      }
    }

    if (valid) return true;

    freq[i]++;
  }

  return false;
};
