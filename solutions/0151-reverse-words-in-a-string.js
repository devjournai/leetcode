/**
 * Reverse Words In A String
 * Intuition: Reverse the whole cleaned character array, then reverse each word so word order flips while letters stay in order. Collapse spaces first so leading/trailing/duplicate spaces vanish.
 * Approach: 1. Scan `s` into `processedCharacters`, pushing a space only when leaving a word (`previousCharWasSpace`). 2. Pop a trailing space if present. 3. If empty, return "". 4. Reverse the whole array with `reverseSegment`. 5. Reverse each word between spaces. 6. `join("")`.
 * Dry Run: s = "  hello world  "
 * After collapse: ['h','e','l','l','o',' ','w','o','r','l','d']
 * Reverse all: "dlrow olleh" then reverse words: "world hello"
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
        wordEndCheckIndex - 1
      );
      wordBeginIndex = wordEndCheckIndex + 1;
    }
  }

  return processedCharacters.join("");
};
