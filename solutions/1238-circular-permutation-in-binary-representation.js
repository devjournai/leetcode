/**
 * Circular Permutation In Binary Representation
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
var circularPermutation = function (n, start) {
  let baseGrayCode = [0];

  for (let iterationIndex = 0; iterationIndex < n; iterationIndex++) {
    let currentPower = 1 << iterationIndex;
    let temporaryReversedPart = [];

    let currentSequenceLength = baseGrayCode.length;
    for (
      let reversePointer = currentSequenceLength - 1;
      reversePointer >= 0;
      reversePointer--
    ) {
      temporaryReversedPart.push(baseGrayCode[reversePointer]);
    }

    let reversedSegmentLength = temporaryReversedPart.length;
    for (
      let appendPointer = 0;
      appendPointer < reversedSegmentLength;
      appendPointer++
    ) {
      let originalValue = temporaryReversedPart[appendPointer];
      let transformedValue = originalValue + currentPower;
      baseGrayCode.push(transformedValue);
    }
  }

  let finalPermutation = [];
  let baseCodeSize = baseGrayCode.length;
  for (
    let sequenceElementPointer = 0;
    sequenceElementPointer < baseCodeSize;
    sequenceElementPointer++
  ) {
    let elementFromBase = baseGrayCode[sequenceElementPointer];
    let xorAdjustedValue = elementFromBase ^ start;
    finalPermutation.push(xorAdjustedValue);
  }

  return finalPermutation;
};
