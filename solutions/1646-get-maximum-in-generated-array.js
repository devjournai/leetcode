/**
 * Get Maximum In Generated Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getMaximumGenerated = function (n) {
  if (n === 0) {
    return 0;
  }

  const numberSequence = new Array(n + 1);
  numberSequence[0] = 0;
  numberSequence[1] = 1;

  let currentTopValue = 1;

  for (let sequenceIndex = 2; sequenceIndex <= n; sequenceIndex++) {
    const halfIndex = Math.floor(sequenceIndex / 2);

    if (sequenceIndex % 2 === 0) {
      numberSequence[sequenceIndex] = numberSequence[halfIndex];
    } else {
      numberSequence[sequenceIndex] =
        numberSequence[halfIndex] + numberSequence[halfIndex + 1];
    }

    currentTopValue = Math.max(currentTopValue, numberSequence[sequenceIndex]);
  }

  return currentTopValue;
};
