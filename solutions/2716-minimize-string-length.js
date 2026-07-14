/**
 * Minimize String Length
 * Intuition: The given operations allow us to remove any duplicate occurrences of a character. If a character 'c' appears multiple times, say at positions `i_1, i_2, ..., i_k`, we can always pick any `i_j` (where `j > 1`) and delete `c` at `i_1` using the left operation, or pick `i_j` (where `j < k`) and delete `c` at `i_k` using the right operation. This process effectively allows us to consolidate all occurrences of a character into a single instance. Therefore, to achieve the minimum possible string length, we should eliminate all duplicate characters, leaving exactly one occurrence for each unique character originally present in the string. The length of this minimized string will be the count of unique characters.
 * Approach: 1. Create a data structure (like a Set) to store all unique characters encountered in the input string. 2. Iterate through the input string, adding each character to the Set. Sets automatically handle uniqueness, so duplicate additions have no effect. 3. After processing the entire string, the size of the Set will represent the total number of unique characters, which is the minimized string length.
 * Dry Run: For input s = "abacaba"
 *           1. Initialize an empty Set, `distinctChars`.
 *           2. Process 'a': `distinctChars` becomes `{'a'}`.
 *           3. Process 'b': `distinctChars` becomes `{'a', 'b'}`.
 *           4. Process 'a': `distinctChars` remains `{'a', 'b'}` (no change as 'a' is already present).
 *           5. Process 'c': `distinctChars` becomes `{'a', 'b', 'c'}`.
 *           6. Process 'a': `distinctChars` remains `{'a', 'b', 'c'}`.
 *           7. Process 'b': `distinctChars` remains `{'a', 'b', 'c'}`.
 *           8. Process 'a': `distinctChars` remains `{'a', 'b', 'c'}`.
 *           9. The final size of `distinctChars` is `3`.
 *           10. Return `3`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimizedStringLength = function (s) {
  const uniqueCharsContainer = new Set();
  let currentCharacterIndex = 0;
  const totalLength = s.length;

  while (currentCharacterIndex < totalLength) {
    const charValue = s[currentCharacterIndex];
    uniqueCharsContainer.add(charValue);
    currentCharacterIndex++;
  }

  const resultLength = uniqueCharsContainer.size;
  return resultLength;
};
