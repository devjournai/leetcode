/**
 * Weighted Word Mapping
 * Intuition: The core idea is to process each word individually: calculate its total character weight, then apply a modulo operation to this sum. The resulting index is then mapped to a specific lowercase letter using a reverse alphabetical lookup, which can be derived by offsetting from 'a' based on the calculated index. Finally, these mapped characters are concatenated in order.
 * Approach:
 * 1. Initialize an empty array `mappedCharacters` to store the character result for each word.
 * 2. Pre-calculate the ASCII value for 'a' (`aCharCode`) once for efficiency.
 * 3. Iterate through each `word` in the input `words` array.
 *    a. For each `word`, initialize a `currentWordWeight` to 0.
 *    b. Iterate through each `char` in the `word`.
 *       i. Determine the 0-indexed position of the character by subtracting `aCharCode` from its own ASCII value (`char.charCodeAt(0) - aCharCode`).
 *       ii. Add the corresponding weight from the `weights` array to `currentWordWeight`.
 *    c. After processing all characters in the `word`, calculate the `mappedIndex` by taking `currentWordWeight` modulo 26 (`currentWordWeight % 26`).
 *    d. Convert `mappedIndex` to its corresponding character in reverse alphabetical order (0 -> 'z', 1 -> 'y', ..., 25 -> 'a'). This can be done by calculating the ASCII value: `aCharCode + (25 - mappedIndex)`, and then converting it back to a character using `String.fromCharCode()`.
 *    e. Append this calculated character to the `mappedCharacters` array.
 * 4. After iterating through all words, join the characters in the `mappedCharacters` array to form the final result string.
 * Dry Run: words = ["abcd"], weights = [7,5,3,4,...]
 * 1. `mappedCharacters = []`, `aCharCode = 97`.
 * 2. Process "abcd":
 *    a. `currentWordWeight = 0`.
 *    b. 'a': `charIndex = 0`. `currentWordWeight += weights[0] = 7`. `currentWordWeight = 7`.
 *    c. 'b': `charIndex = 1`. `currentWordWeight += weights[1] = 5`. `currentWordWeight = 12`.
 *    d. 'c': `charIndex = 2`. `currentWordWeight += weights[2] = 3`. `currentWordWeight = 15`.
 *    e. 'd': `charIndex = 3`. `currentWordWeight += weights[3] = 4`. `currentWordWeight = 19`.
 *    f. `mappedIndex = 19 % 26 = 19`.
 *    g. `targetCharCode = aCharCode + (25 - 19) = 97 + 6 = 103`.
 *    h. `String.fromCharCode(103)` is 'g'.
 *    i. `mappedCharacters.push('g')`. `mappedCharacters = ['g']`.
 * 3. All words processed. `mappedCharacters.join('')` returns "g".
 * Time Complexity: O(N * L)
 * Space Complexity: O(N)
 */
var mapWordWeights = function (words, weights) {
  const mappedCharacters = [];
  const aCharCode = "a".charCodeAt(0);

  for (const word of words) {
    let currentWordWeight = 0;
    for (const char of word) {
      const charIndex = char.charCodeAt(0) - aCharCode;
      currentWordWeight += weights[charIndex];
    }

    const mappedIndex = currentWordWeight % 26;
    const targetCharCode = aCharCode + (25 - mappedIndex);
    mappedCharacters.push(String.fromCharCode(targetCharCode));
  }

  return mappedCharacters.join("");
};
