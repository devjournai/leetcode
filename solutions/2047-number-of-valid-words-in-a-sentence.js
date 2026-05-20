/**
 * Number Of Valid Words In A Sentence
 * Intuition: Break the problem into identifying tokens and then validating each token based on specific rules for digits, hyphens, and punctuation. Helper functions can make the validation logic clear and maintainable.
 * Approach: 1. Define helper functions to classify characters (lowercase letter, digit, punctuation). 2. Create a `validateToken` function that iterates through a given word token, applying all three validation rules: no digits, at most one hyphen (surrounded by lowercase letters if present), and at most one punctuation mark (at the very end if present). 3. In the main function, `trim` the input sentence to remove leading/trailing spaces and then `split` it by one or more spaces to get individual word tokens. 4. Iterate through these tokens, calling `validateToken` for each. 5. Count the number of tokens that `validateToken` returns true for.
 * Dry Run: Input: sentence = "a-b. c 123"
 *   1. `sentence.trim()` -> "a-b. c 123"
 *   2. `wordTokens = sentence.trim().split(/\s+/)` -> ["a-b.", "c", "123"]
 *   3. `validWordCounter = 0`
 *   4. First token: `currentWord = "a-b."`
 *      - `validateToken("a-b.")` called:
 *        - 'a': lowercase. OK.
 *        - '-': `hyphenCountIndicator` becomes 1. Not at start/end. 'a' and 'b' are lowercase. OK.
 *        - 'b': lowercase. OK.
 *        - '.': `isPunctuationMark` is true. `foundPunctuationFlag` is false. Is at end (`characterIndex = 3`, `tokenValue.length - 1 = 3`). `foundPunctuationFlag` becomes true. OK.
 *        - Loop completes. Returns `true`.
 *      - `validWordCounter` becomes 1.
 *   5. Second token: `currentWord = "c"`
 *      - `validateToken("c")` called:
 *        - 'c': lowercase. OK.
 *        - Loop completes. Returns `true`.
 *      - `validWordCounter` becomes 2.
 *   6. Third token: `currentWord = "123"`
 *      - `validateToken("123")` called:
 *        - '1': `isNumericDigit` is true. Returns `false` immediately.
 *      - `validWordCounter` remains 2.
 *   7. Loop finishes.
 *   8. Return `validWordCounter` (which is 2).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countValidWords = function (sentence) {
  const isLowerCaseLetter = (characterSymbol) => {
    const symbolCode = characterSymbol.charCodeAt(0);
    return symbolCode >= 97 && symbolCode <= 122;
  };

  const isNumericDigit = (characterValue) => {
    const valueCode = characterValue.charCodeAt(0);
    return valueCode >= 48 && valueCode <= 57;
  };

  const isPunctuationMark = (characterElement) => {
    return (
      characterElement === "!" ||
      characterElement === "." ||
      characterElement === ","
    );
  };

  const validateIndividualToken = (tokenString) => {
    if (tokenString.length === 0) {
      return false;
    }

    let hyphenOccurrenceCount = 0;
    let punctuationEncounteredFlag = false;

    for (
      let tokenCharacterIndex = 0;
      tokenCharacterIndex < tokenString.length;
      tokenCharacterIndex++
    ) {
      const currentTokenCharacter = tokenString[tokenCharacterIndex];

      if (isNumericDigit(currentTokenCharacter)) {
        return false;
      }

      if (currentTokenCharacter === "-") {
        hyphenOccurrenceCount++;
        if (hyphenOccurrenceCount > 1) {
          return false;
        }
        if (
          tokenCharacterIndex === 0 ||
          tokenCharacterIndex === tokenString.length - 1
        ) {
          return false;
        }
        const precedingCharacter = tokenString[tokenCharacterIndex - 1];
        const succeedingCharacter = tokenString[tokenCharacterIndex + 1];
        if (
          !isLowerCaseLetter(precedingCharacter) ||
          !isLowerCaseLetter(succeedingCharacter)
        ) {
          return false;
        }
      }

      if (isPunctuationMark(currentTokenCharacter)) {
        if (punctuationEncounteredFlag) {
          return false;
        }
        if (tokenCharacterIndex !== tokenString.length - 1) {
          return false;
        }
        punctuationEncounteredFlag = true;
      }
    }
    return true;
  };

  let totalValidWordCount = 0;
  const sentenceTokens = sentence.trim().split(/\s+/);

  for (
    let currentWordIndex = 0;
    currentWordIndex < sentenceTokens.length;
    currentWordIndex++
  ) {
    const currentToken = sentenceTokens[currentWordIndex];
    if (validateIndividualToken(currentToken)) {
      totalValidWordCount++;
    }
  }

  return totalValidWordCount;
};
