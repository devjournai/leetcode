/**
 * Word Pattern
 * Intuition: Pattern characters and words must be a bijection: same letter always the same word, and no two letters share a word.
 * Approach: 1. Split s on spaces; lengths must match. 2. Map char→word and word→char. 3. On a seen key, reject mismatches; otherwise insert. 4. Return true if the loop finishes.
 * Dry Run: pattern="abba", s="dog cat cat dog".
 *   - a↔dog, b↔cat, then b/cat and a/dog match.
 *   - Return true.
 * Time Complexity: O(M)
 * Space Complexity: O(M)
 */
var wordPattern = function (pattern, s) {
  const stringWords = s.split(" ");
  const patternLength = pattern.length;
  const stringWordCount = stringWords.length;

  if (patternLength !== stringWordCount) {
    return false;
  }

  const patternCharacterToWordMap = new Map();
  const wordToStringCharacterMap = new Map();

  for (let charIndex = 0; charIndex < patternLength; charIndex++) {
    const currentPatternChar = pattern[charIndex];
    const currentStringWord = stringWords[charIndex];

    if (patternCharacterToWordMap.has(currentPatternChar)) {
      const mappedWord = patternCharacterToWordMap.get(currentPatternChar);
      if (mappedWord !== currentStringWord) {
        return false;
      }
    } else {
      patternCharacterToWordMap.set(currentPatternChar, currentStringWord);
    }

    if (wordToStringCharacterMap.has(currentStringWord)) {
      const mappedCharacter = wordToStringCharacterMap.get(currentStringWord);
      if (mappedCharacter !== currentPatternChar) {
        return false;
      }
    } else {
      wordToStringCharacterMap.set(currentStringWord, currentPatternChar);
    }
  }

  return true;
};
