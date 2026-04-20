/**
 * Encode And Decode Strings
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
    let hashDelimiterPosition = encodedText.indexOf('#', headPointer);
    let currentSegmentLength = parseInt(encodedText.slice(headPointer, hashDelimiterPosition));

    let extractedString = encodedText.slice(hashDelimiterPosition + 1, hashDelimiterPosition + 1 + currentSegmentLength);
    resultContainer.push(extractedString);

    headPointer = hashDelimiterPosition + 1 + currentSegmentLength;
  }
  return resultContainer;
};