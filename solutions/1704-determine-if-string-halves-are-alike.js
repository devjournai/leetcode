/**
 * Determine If String Halves Are Alike
 * Intuition: Split `s` in half and count vowels (case-insensitive) in each half; they are alike iff the counts match.
 * Approach: 1. Build `vowelCharactersSet`. 2. For `characterIndex` in `[0, halfwayPoint)`, increment `firstHalfVowelCount` / `secondHalfVowelCount` when the corresponding chars are vowels. 3. Return whether the two counts are equal.
 * Dry Run: s = "book"
 * halves "bo"/"ok": first 1 vowel (o), second 1 (o) → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var halvesAreAlike = function (s) {
  const vowelCharactersSet = new Set([
    "a",
    "e",
    "i",
    "o",
    "u",
    "A",
    "E",
    "I",
    "O",
    "U",
  ]);
  let firstHalfVowelCount = 0;
  let secondHalfVowelCount = 0;
  const stringLength = s.length;
  const halfwayPoint = stringLength / 2;

  for (
    let characterIndex = 0;
    characterIndex < halfwayPoint;
    characterIndex++
  ) {
    if (vowelCharactersSet.has(s[characterIndex])) {
      firstHalfVowelCount++;
    }
    if (vowelCharactersSet.has(s[characterIndex + halfwayPoint])) {
      secondHalfVowelCount++;
    }
  }

  return firstHalfVowelCount === secondHalfVowelCount;
};
