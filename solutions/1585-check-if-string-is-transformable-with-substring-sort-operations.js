/**
 * Check If String Is Transformable With Substring Sort Operations
 * Intuition: Sorting a substring can only move a digit left past larger digits, never past a smaller one still in front. Consume target digits from source positions if no smaller digit remains to the left.
 * Approach: 1. Queues of indices per digit in source. 2. For each target digit, take the next occurrence; if any smaller digit still has an earlier index, false. 3. Advance the pointer.
 * Dry Run: s = "84532", t = "34852".
 *   - Prefix sorts can rearrange to t → true.
 * Time Complexity: O(sourceString.length + targetString.length)
 * Space Complexity: O(sourceString.length)
 */
var isTransformable = function (sourceString, targetString) {
  const digitOccurrences = Array.from({ length: 10 }, () => []);
  for (let sourceIndex = 0; sourceIndex < sourceString.length; sourceIndex++) {
    const currentDigitChar = sourceString[sourceIndex];
    const currentDigitValue = parseInt(currentDigitChar, 10);
    digitOccurrences[currentDigitValue].push(sourceIndex);
  }

  const nextPointers = new Array(10).fill(0);

  for (const targetCharDigit of targetString) {
    const desiredDigitVal = parseInt(targetCharDigit, 10);

    const currentDigitPointer = nextPointers[desiredDigitVal];
    if (currentDigitPointer >= digitOccurrences[desiredDigitVal].length) {
      return false;
    }

    const originalLocation =
      digitOccurrences[desiredDigitVal][currentDigitPointer];

    for (
      let blockingDigit = 0;
      blockingDigit < desiredDigitVal;
      blockingDigit++
    ) {
      const blockingPointer = nextPointers[blockingDigit];
      if (blockingPointer < digitOccurrences[blockingDigit].length) {
        const blockingLocation =
          digitOccurrences[blockingDigit][blockingPointer];
        if (blockingLocation < originalLocation) {
          return false;
        }
      }
    }

    nextPointers[desiredDigitVal]++;
  }

  return true;
};
