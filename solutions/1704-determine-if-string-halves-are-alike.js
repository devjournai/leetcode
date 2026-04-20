/**
 * Determine If String Halves Are Alike
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
