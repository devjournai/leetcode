/**
 * Count And Say
 * Time Complexity: O(L_n)
 * Space Complexity: O(L_n)
 */
var countAndSay = function (n) {
  let currentSequence = "1";

  for (let iterationsCounter = 1; iterationsCounter < n; iterationsCounter++) {
    let nextSequenceBuffer = "";
    let readPointer = 0;

    while (readPointer < currentSequence.length) {
      let currentCharacter = currentSequence[readPointer];
      let characterCount = 0;
      let scanPointer = readPointer;

      while (
        scanPointer < currentSequence.length &&
        currentSequence[scanPointer] === currentCharacter
      ) {
        characterCount++;
        scanPointer++;
      }

      nextSequenceBuffer += characterCount.toString() + currentCharacter;
      readPointer = scanPointer;
    }
    currentSequence = nextSequenceBuffer;
  }

  return currentSequence;
};
