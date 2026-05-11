/**
 * Check If String Is A Prefix Of Array
 * Intuition: To check if a string `s` is a prefix of an array of words, we can sequentially append words from the array and verify if the resulting concatenated string exactly matches `s` at any point. Alternatively, we can verify segments of `s` against individual words from the array.
 * Approach: 1. Initialize a pointer `stringMatchPosition` to 0, representing the current character index in `s` that needs to be matched. 2. Iterate through the `words` array using an integer index `arrayWordIndex`. 3. For each `currentWordElement` from `words`: 4. Calculate the `nextMatchPosition` in `s` if `currentWordElement` were to match the segment starting at `stringMatchPosition`. 5. If `nextMatchPosition` exceeds the total length of `s`, or if the substring of `s` from `stringMatchPosition` up to `nextMatchPosition` does not exactly match `currentWordElement`, then `s` cannot be a prefix, so return `false`. 6. Otherwise, update `stringMatchPosition` to `nextMatchPosition`. 7. If `stringMatchPosition` becomes equal to the total length of `s`, it signifies that `s` has been fully matched by a prefix of the `words` array, so return `true`. 8. If the loop completes without `stringMatchPosition` reaching `s.length`, it means `s` was not fully matched by any prefix of `words`, so return `false`.
 * Dry Run: s = "applepie", words = ["apple", "pie", "banana"]
 *   1. `stringMatchPosition = 0`, `fullStringLength = 8`, `totalWordCount = 3`
 *   2. `arrayWordIndex = 0`, `currentWordElement = "apple"`
 *      `wordElementLength = 5`
 *      `nextMatchPosition = 0 + 5 = 5`
 *      `nextMatchPosition <= fullStringLength` (5 <= 8) is true
 *      `s.substring(0, 5)` is "apple"
 *      `"apple" === "apple"` is true
 *      `stringMatchPosition` becomes 5
 *      `stringMatchPosition !== fullStringLength` (5 !== 8) is true
 *   3. `arrayWordIndex = 1`, `currentWordElement = "pie"`
 *      `wordElementLength = 3`
 *      `nextMatchPosition = 5 + 3 = 8`
 *      `nextMatchPosition <= fullStringLength` (8 <= 8) is true
 *      `s.substring(5, 8)` is "pie"
 *      `"pie" === "pie"` is true
 *      `stringMatchPosition` becomes 8
 *      `stringMatchPosition === fullStringLength` (8 === 8) is true -> Return `true`
 * Time Complexity: O(N) where N is the length of the string `s`. In the worst case, we iterate through a portion of `words` whose total character length adds up to `s.length`. Each substring operation and comparison takes time proportional to the length of the substring. The sum of lengths of all substrings processed will not exceed N.
 * Space Complexity: O(1) as we only use a few constant-space variables.
 */
var isPrefixString = function (s, words) {
  let stringMatchPosition = 0;
  let fullStringLength = s.length;
  let totalWordCount = words.length;

  for (
    let arrayWordIndex = 0;
    arrayWordIndex < totalWordCount;
    arrayWordIndex++
  ) {
    let currentWordElement = words[arrayWordIndex];
    let wordElementLength = currentWordElement.length;
    let nextMatchPosition = stringMatchPosition + wordElementLength;

    if (nextMatchPosition > fullStringLength) {
      return false;
    }

    let segmentOfOriginal = s.substring(stringMatchPosition, nextMatchPosition);
    if (segmentOfOriginal !== currentWordElement) {
      return false;
    }

    stringMatchPosition = nextMatchPosition;

    if (stringMatchPosition === fullStringLength) {
      return true;
    }
  }

  return false;
};
