/**
 * Count Vowel Substrings Of A String
 * Intuition: The problem requires counting substrings that exclusively contain vowels and have exactly five distinct vowels ('a', 'e', 'i', 'o', 'u'). This can be solved using a variation of the sliding window technique for "exactly K distinct characters". We define a helper function `calcSubstringsWithAtMostKDistinctVowels` which counts all vowel-only substrings with at most `k` distinct vowels. By subtracting the count of substrings with at most 4 distinct vowels from the count of substrings with at most 5 distinct vowels, we obtain the count of substrings with exactly 5 distinct vowels.
 * Approach:
 * 1. Initialize a `vowelCharacterCollection` (Set) containing 'a', 'e', 'i', 'o', 'u'.
 * 2. Define a helper function `calcSubstringsWithAtMostKDistinctVowels(targetWord, maxAllowedDistinctVowels, vowelReferenceSet)`:
 *    a. Initialize `subtotalResult = 0`, `distinctVowelTracker = new Map()`, `windowLeft = 0`.
 *    b. Iterate `windowRight` from `0` to `targetWord.length - 1`.
 *    c. Let `currentWordCharacter = targetWord[windowRight]`.
 *    d. If `currentWordCharacter` is NOT in `vowelReferenceSet`:
 *       i. Clear `distinctVowelTracker`.
 *       ii. Reset `windowLeft = windowRight + 1`.
 *       iii. Continue to the next `windowRight`.
 *    e. If `currentWordCharacter` IS a vowel:
 *       i. Add `currentWordCharacter` to `distinctVowelTracker`, incrementing its count.
 *       ii. While `distinctVowelTracker.size` is greater than `maxAllowedDistinctVowels`:
 *          1. Let `leftmostWindowCharacter = targetWord[windowLeft]`.
 *          2. Decrement count of `leftmostWindowCharacter` in `distinctVowelTracker`.
 *          3. If its count becomes 0, delete `leftmostWindowCharacter` from `distinctVowelTracker`.
 *          4. Increment `windowLeft`.
 *       iii. Add `(windowRight - windowLeft + 1)` to `subtotalResult`. This accounts for all valid substrings ending at `windowRight` and starting from `windowLeft` up to `windowRight`.
 *    f. Return `subtotalResult`.
 * 3. In the main function `countVowelSubstrings`:
 *    a. Call `calcSubstringsWithAtMostKDistinctVowels` with `maxAllowedDistinctVowels = 5` to get `countAtMostFive`.
 *    b. Call `calcSubstringsWithAtMostKDistinctVowels` with `maxAllowedDistinctVowels = 4` to get `countAtMostFour`.
 *    c. The `finalCount` is `countAtMostFive - countAtMostFour`.
 *    d. Return `finalCount`.
 * Dry Run:
 * Input: `word = "aeioua"`
 * `vowelCharacterCollection = {'a', 'e', 'i', 'o', 'u'}`
 *
 * `calcSubstringsWithAtMostKDistinctVowels("aeioua", 5, vowelCharacterCollection)`:
 *   - `subtotalResult = 0`, `distinctVowelTracker = {}`, `windowLeft = 0`
 *   - `windowRight = 0`, `char = 'a'`: `distinctVowelTracker = {'a':1}`, `subtotalResult += (0-0+1) = 1`
 *   - `windowRight = 1`, `char = 'e'`: `distinctVowelTracker = {'a':1, 'e':1}`, `subtotalResult += (1-0+1) = 2`. `subtotalResult = 1+2=3`
 *   - `windowRight = 2`, `char = 'i'`: `distinctVowelTracker = {'a':1, 'e':1, 'i':1}`, `subtotalResult += (2-0+1) = 3`. `subtotalResult = 3+3=6`
 *   - `windowRight = 3`, `char = 'o'`: `distinctVowelTracker = {'a':1, 'e':1, 'i':1, 'o':1}`, `subtotalResult += (3-0+1) = 4`. `subtotalResult = 6+4=10`
 *   - `windowRight = 4`, `char = 'u'`: `distinctVowelTracker = {'a':1, 'e':1, 'i':1, 'o':1, 'u':1}`, `subtotalResult += (4-0+1) = 5`. `subtotalResult = 10+5=15`
 *   - `windowRight = 5`, `char = 'a'`: `distinctVowelTracker = {'a':2, 'e':1, 'i':1, 'o':1, 'u':1}`, `subtotalResult += (5-0+1) = 6`. `subtotalResult = 15+6=21`
 *   - Returns `21`. This is `countAtMostFive`.
 *
 * `calcSubstringsWithAtMostKDistinctVowels("aeioua", 4, vowelCharacterCollection)`:
 *   - `subtotalResult = 0`, `distinctVowelTracker = {}`, `windowLeft = 0`
 *   - `windowRight = 0`, `char = 'a'`: `distinctVowelTracker = {'a':1}`, `subtotalResult += (0-0+1) = 1`
 *   - `windowRight = 1`, `char = 'e'`: `distinctVowelTracker = {'a':1, 'e':1}`, `subtotalResult += (1-0+1) = 2`. `subtotalResult = 1+2=3`
 *   - `windowRight = 2`, `char = 'i'`: `distinctVowelTracker = {'a':1, 'e':1, 'i':1}`, `subtotalResult += (2-0+1) = 3`. `subtotalResult = 3+3=6`
 *   - `windowRight = 3`, `char = 'o'`: `distinctVowelTracker = {'a':1, 'e':1, 'i':1, 'o':1}`, `subtotalResult += (3-0+1) = 4`. `subtotalResult = 6+4=10`
 *   - `windowRight = 4`, `char = 'u'`: `distinctVowelTracker = {'a':1, 'e':1, 'i':1, 'o':1, 'u':1}`. Size is 5, > 4.
 *     - Shrink: `leftmost = 'a'`, `distinctVowelTracker = {'e':1, 'i':1, 'o':1, 'u':1}`, `windowLeft = 1`. Size is 4.
 *     - `subtotalResult += (4-1+1) = 4`. `subtotalResult = 10+4=14`
 *   - `windowRight = 5`, `char = 'a'`: `distinctVowelTracker = {'e':1, 'i':1, 'o':1, 'u':1, 'a':1}`. Size is 5, > 4.
 *     - Shrink: `leftmost = 'e'`, `distinctVowelTracker = {'i':1, 'o':1, 'u':1, 'a':1}`, `windowLeft = 2`. Size is 4.
 *     - `subtotalResult += (5-2+1) = 4`. `subtotalResult = 14+4=18`
 *   - Returns `18`. This is `countAtMostFour`.
 *
 * `finalCount = 21 - 18 = 3`. (Substrings: "aeiou", "aeioua", "eioua")
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var countVowelSubstrings = function (word) {
  const vowelCharacterCollection = new Set(['a', 'e', 'i', 'o', 'u']);

  const calcSubstringsWithAtMostKDistinctVowels = (targetWord, maxAllowedDistinctVowels, vowelReferenceSet) => {
    let subtotalResult = 0;
    const distinctVowelTracker = new Map();
    let windowLeft = 0;

    for (let windowRight = 0; windowRight < targetWord.length; windowRight++) {
      const currentWordCharacter = targetWord[windowRight];

      if (!vowelReferenceSet.has(currentWordCharacter)) {
        distinctVowelTracker.clear();
        windowLeft = windowRight + 1;
        continue;
      }

      distinctVowelTracker.set(currentWordCharacter, (distinctVowelTracker.get(currentWordCharacter) || 0) + 1);

      while (distinctVowelTracker.size > maxAllowedDistinctVowels) {
        const leftmostWindowCharacter = targetWord[windowLeft];
        distinctVowelTracker.set(leftmostWindowCharacter, distinctVowelTracker.get(leftmostWindowCharacter) - 1);
        if (distinctVowelTracker.get(leftmostWindowCharacter) === 0) {
          distinctVowelTracker.delete(leftmostWindowCharacter);
        }
        windowLeft++;
      }

      subtotalResult += (windowRight - windowLeft + 1);
    }
    return subtotalResult;
  };

  const countAtMostFive = calcSubstringsWithAtMostKDistinctVowels(word, 5, vowelCharacterCollection);
  const countAtMostFour = calcSubstringsWithAtMostKDistinctVowels(word, 4, vowelCharacterCollection);

  const finalCount = countAtMostFive - countAtMostFour;
  return finalCount;
};