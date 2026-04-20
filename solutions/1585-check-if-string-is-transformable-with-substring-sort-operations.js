/**
 * Check If String Is Transformable With Substring Sort Operations
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
