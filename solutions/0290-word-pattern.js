/**
 * Word Pattern
 * Time Complexity: O(M)
 * Space Complexity: O(M)
 */
var wordPattern = function (pattern, s) {
    const stringWords = s.split(' ');
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