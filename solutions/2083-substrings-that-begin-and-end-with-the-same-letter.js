/**
 * Substrings That Begin And End With The Same Letter
 * Intuition: Each character contributes to substrings starting and ending with itself. If a character 'x' appears 'k' times in the string, any pair of these 'x's (including an 'x' with itself) forms a valid substring. The total number of ways to choose two positions (or one position for a single-character substring) from 'k' occurrences is given by the sum 1 + 2 + ... + k, which simplifies to k * (k + 1) / 2. By summing this value for each unique character in the string, we get the total count of such substrings.
 * Approach: 1. Initialize a frequency map to store the count of each character present in the input string. 2. Iterate through the input string, updating the frequency map for each character encountered. 3. Initialize a variable to accumulate the total count of valid substrings. 4. Iterate through the values (frequencies) stored in the frequency map. For each frequency 'k', calculate k * (k + 1) / 2 and add it to the total count. 5. Return the accumulated total count.
 * Dry Run: s = "aba"
 *   1. Initialize `charFrequencies` as an empty Map. `totalMatchingSubstrings = 0`.
 *   2. First loop (counting frequencies):
 *      - `charIndex = 0`, `currentCharacter = 'a'`: `charFrequencies = {'a': 1}`
 *      - `charIndex = 1`, `currentCharacter = 'b'`: `charFrequencies = {'a': 1, 'b': 1}`
 *      - `charIndex = 2`, `currentCharacter = 'a'`: `charFrequencies = {'a': 2, 'b': 1}`
 *   3. Second loop (calculating total):
 *      - For `currentCount = 2` (from 'a'): `totalMatchingSubstrings += (2 * (2 + 1)) / 2 = 3`. So, `totalMatchingSubstrings = 3`.
 *      - For `currentCount = 1` (from 'b'): `totalMatchingSubstrings += (1 * (1 + 1)) / 2 = 1`. So, `totalMatchingSubstrings = 3 + 1 = 4`.
 *   4. Return `totalMatchingSubstrings` which is 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSubstrings = function (s) {
  const charFrequencies = new Map();

  for (let charIndex = 0; charIndex < s.length; charIndex++) {
    const currentCharacter = s[charIndex];
    charFrequencies.set(
      currentCharacter,
      (charFrequencies.get(currentCharacter) || 0) + 1
    );
  }

  let totalMatchingSubstrings = 0;

  for (const currentCount of charFrequencies.values()) {
    totalMatchingSubstrings += (currentCount * (currentCount + 1)) / 2;
  }

  return totalMatchingSubstrings;
};
