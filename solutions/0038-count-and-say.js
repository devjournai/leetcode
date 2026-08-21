/**
 * Count And Say
 * Intuition: Start from `"1"` and for `n-1` iterations run-length encode `currentSequence` by counting consecutive equal characters and appending `count + char` into `nextSequenceBuffer`.
 * Approach: 1. `currentSequence = "1"`. 2. Repeat `iterationsCounter` from 1 to n-1. 3. Walk `readPointer`; from `scanPointer` count how many times `currentCharacter` repeats. 4. Append `characterCount.toString() + currentCharacter`. 5. Assign the buffer back. Return `currentSequence`.
 * Dry Run: n = 4.
 *   - "1" → "11" → "21" → "1211". Return "1211".
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
