/**
 * Encode And Decode Strings
 * Intuition: Length-prefix each string as `len#payload` so `#` inside the payload cannot confuse the decoder: it always reads an integer length then that many characters.
 * Approach: 1. `encode`: for each piece append length, then `#`, then the piece. 2. `decode`: from `headPointer`, find the next `#`, parse the length, slice that many chars after `#`, push, and advance the pointer past the slice. 3. Repeat until the encoded text is consumed.
 * Dry Run: ["ab", "#c"].
 *   - Encoded "2#ab2##c". Decode: len 2 → "ab"; len 2 → "#c". Round-trip matches.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */

var encode = function (stringList) {
  let builtString = "";
  for (let currentPiece of stringList) {
    let lengthValue = currentPiece.length;
    builtString += `${lengthValue}#${currentPiece}`;
  }
  return builtString;
};

var decode = function (encodedText) {
  const resultContainer = [];
  let headPointer = 0;

  for (; headPointer < encodedText.length;) {
    let hashDelimiterPosition = encodedText.indexOf("#", headPointer);
    let currentSegmentLength = parseInt(
      encodedText.slice(headPointer, hashDelimiterPosition)
    );

    let extractedString = encodedText.slice(
      hashDelimiterPosition + 1,
      hashDelimiterPosition + 1 + currentSegmentLength
    );
    resultContainer.push(extractedString);

    headPointer = hashDelimiterPosition + 1 + currentSegmentLength;
  }
  return resultContainer;
};
