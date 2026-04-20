/**
 * Reverse Words In A String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reverseWords = function (s) {
  const reverseSegment = (characterArray, segmentStart, segmentEnd) => {
    let leftPointer = segmentStart;
    let rightPointer = segmentEnd;
    while (leftPointer < rightPointer) {
      let temporaryHolder = characterArray[leftPointer];
      characterArray[leftPointer] = characterArray[rightPointer];
      characterArray[rightPointer] = temporaryHolder;
      leftPointer++;
      rightPointer--;
    }
  };

  let processedCharacters = [];
  let previousCharWasSpace = true;

  for (let charScanIndex = 0; charScanIndex < s.length; charScanIndex++) {
    let currentCharacter = s[charScanIndex];
    if (currentCharacter === " ") {
      if (!previousCharWasSpace) {
        processedCharacters.push(" ");
        previousCharWasSpace = true;
      }
    } else {
      processedCharacters.push(currentCharacter);
      previousCharWasSpace = false;
    }
  }

  if (
    processedCharacters.length > 0 &&
    processedCharacters[processedCharacters.length - 1] === " "
  ) {
    processedCharacters.pop();
  }

  if (processedCharacters.length === 0) {
    return "";
  }

  let cleanedLength = processedCharacters.length;

  reverseSegment(processedCharacters, 0, cleanedLength - 1);

  let wordBeginIndex = 0;
  for (
    let wordEndCheckIndex = 0;
    wordEndCheckIndex <= cleanedLength;
    wordEndCheckIndex++
  ) {
    if (
      wordEndCheckIndex === cleanedLength ||
      processedCharacters[wordEndCheckIndex] === " "
    ) {
      reverseSegment(
        processedCharacters,
        wordBeginIndex,
        wordEndCheckIndex - 1,
      );
      wordBeginIndex = wordEndCheckIndex + 1;
    }
  }

  return processedCharacters.join("");
};
