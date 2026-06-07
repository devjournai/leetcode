/**
 * Count Prefixes Of A Given String
 * Intuition: To identify if a string is a prefix of another, we need to check if it matches the beginning sequence of characters in the target string. This involves a character-by-character comparison from the start.
 * Approach: 1. Initialize a numerical variable, `totalPrefixes`, to zero. This variable will store the final count of prefixes found.
 * 2. Store the length of the `words` array in a variable, `wordsLength`, for efficient iteration.
 * 3. Cache the length of the string `s` in `sLength` to avoid redundant calculations.
 * 4. Begin a `for` loop that iterates from `wordIndex = 0` up to, but not including, `wordsLength`. In each iteration, `currentWordCandidate` is the string from the `words` array at `wordIndex`.
 * 5. Inside the loop, check if `currentWordCandidate.length` is greater than `sLength`. If it is, `currentWordCandidate` cannot be a prefix of `s`, so continue to the next iteration using `continue`.
 * 6. Initialize a boolean flag, `isCurrentWordPrefix`, to `true` at the beginning of each word check, assuming it is a prefix until proven otherwise.
 * 7. Start a nested `for` loop with `charComparisonIndex` ranging from `0` up to, but not including, `currentWordCandidate.length`.
 * 8. Within this inner loop, compare `currentWordCandidate[charComparisonIndex]` with `s[charComparisonIndex]`.
 * 9. If the characters do not match, set `isCurrentWordPrefix` to `false` and immediately `break` from the inner loop, as `currentWordCandidate` is definitively not a prefix.
 * 10. After the inner loop completes, if `isCurrentWordPrefix` is still `true`, it means `currentWordCandidate` successfully matched a prefix of `s`. Increment `totalPrefixes` by one.
 * 11. Once the outer loop finishes iterating through all words, return the final value of `totalPrefixes`.
 * Dry Run: words = ["a","ab","abc","def"], s = "abc"
 * 1. `totalPrefixes = 0`.
 * 2. `wordsLength = 4`. `sLength = 3`.
 * 3. `wordIndex = 0`: `currentWordCandidate = "a"`.
 *    - `currentWordCandidate.length` (1) <= `sLength` (3). True.
 *    - `isCurrentWordPrefix = true`.
 *    - `charComparisonIndex = 0`: `currentWordCandidate[0]` ('a') === `s[0]` ('a'). True.
 *    - Inner loop ends.
 *    - `isCurrentWordPrefix` is `true`. `totalPrefixes` becomes 1.
 * 4. `wordIndex = 1`: `currentWordCandidate = "ab"`.
 *    - `currentWordCandidate.length` (2) <= `sLength` (3). True.
 *    - `isCurrentWordPrefix = true`.
 *    - `charComparisonIndex = 0`: `currentWordCandidate[0]` ('a') === `s[0]` ('a'). True.
 *    - `charComparisonIndex = 1`: `currentWordCandidate[1]` ('b') === `s[1]` ('b'). True.
 *    - Inner loop ends.
 *    - `isCurrentWordPrefix` is `true`. `totalPrefixes` becomes 2.
 * 5. `wordIndex = 2`: `currentWordCandidate = "abc"`.
 *    - `currentWordCandidate.length` (3) <= `sLength` (3). True.
 *    - `isCurrentWordPrefix = true`.
 *    - `charComparisonIndex = 0`: `currentWordCandidate[0]` ('a') === `s[0]` ('a'). True.
 *    - `charComparisonIndex = 1`: `currentWordCandidate[1]` ('b') === `s[1]` ('b'). True.
 *    - `charComparisonIndex = 2`: `currentWordCandidate[2]` ('c') === `s[2]` ('c'). True.
 *    - Inner loop ends.
 *    - `isCurrentWordPrefix` is `true`. `totalPrefixes` becomes 3.
 * 6. `wordIndex = 3`: `currentWordCandidate = "def"`.
 *    - `currentWordCandidate.length` (3) <= `sLength` (3). True.
 *    - `isCurrentWordPrefix = true`.
 *    - `charComparisonIndex = 0`: `currentWordCandidate[0]` ('d') === `s[0]` ('a'). False.
 *    - `isCurrentWordPrefix` becomes `false`. Inner loop breaks.
 *    - `isCurrentWordPrefix` is `false`. `totalPrefixes` remains 3.
 * 7. Outer loop ends.
 * 8. Return `totalPrefixes` (3).
 * Time Complexity: O(N * L_s)
 * Space Complexity: O(1)
 */
var countPrefixes = function (words, s) {
  let totalPrefixes = 0;
  let wordsLength = words.length;
  let sLength = s.length;

  for (let wordIndex = 0; wordIndex < wordsLength; wordIndex++) {
    let currentWordCandidate = words[wordIndex];
    let currentWordCandidateLength = currentWordCandidate.length;

    if (currentWordCandidateLength > sLength) {
      continue;
    }

    let isCurrentWordPrefix = true;
    for (
      let charComparisonIndex = 0;
      charComparisonIndex < currentWordCandidateLength;
      charComparisonIndex++
    ) {
      if (
        currentWordCandidate[charComparisonIndex] !== s[charComparisonIndex]
      ) {
        isCurrentWordPrefix = false;
        break;
      }
    }

    if (isCurrentWordPrefix) {
      totalPrefixes++;
    }
  }

  return totalPrefixes;
};
