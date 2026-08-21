/**
 * Valid Word Abbreviation
 * Intuition: Walk `fullWord` and `shortAbbr` together: letters must match, and a number (no leading zero) skips that many word characters.
 * Approach: 1. If the abbr char is a digit, reject `'0'` as a start, parse the full number, add it to `currentWordPosition`. 2. Else require equal characters and advance both. 3. Valid iff both pointers land exactly at the ends.
 * Dry Run: word = "internationalization", abbr = "i12iz4n".
 *   - 'i', skip 12, 'i','z', skip 4, 'n'. Both pointers finish. Return true.
 * Time Complexity: O(W + A)
 * Space Complexity: O(1)
 */
var validWordAbbreviation = function (fullWord, shortAbbr) {
  let currentWordPosition = 0;
  let currentAbbrPosition = 0;

  while (
    currentWordPosition < fullWord.length &&
    currentAbbrPosition < shortAbbr.length
  ) {
    let abbreviationCharacter = shortAbbr[currentAbbrPosition];

    if (abbreviationCharacter >= "0" && abbreviationCharacter <= "9") {
      if (abbreviationCharacter === "0") {
        return false;
      }

      let numericSkipValue = 0;
      let digitParsingPointer = currentAbbrPosition;

      while (
        digitParsingPointer < shortAbbr.length &&
        shortAbbr[digitParsingPointer] >= "0" &&
        shortAbbr[digitParsingPointer] <= "9"
      ) {
        numericSkipValue =
          numericSkipValue * 10 + (shortAbbr[digitParsingPointer] - "0");
        digitParsingPointer++;
      }

      currentAbbrPosition = digitParsingPointer;
      currentWordPosition += numericSkipValue;
    } else {
      if (fullWord[currentWordPosition] === abbreviationCharacter) {
        currentWordPosition++;
        currentAbbrPosition++;
      } else {
        return false;
      }
    }
  }

  return (
    currentWordPosition === fullWord.length &&
    currentAbbrPosition === shortAbbr.length
  );
};
