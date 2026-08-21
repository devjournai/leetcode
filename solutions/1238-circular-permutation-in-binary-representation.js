/**
 * Circular Permutation In Binary Representation
 * Intuition: Standard binary-reflected Gray code visits every n-bit number with one-bit steps, including wrap-around; XOR with start rotates it to begin at start.
 * Approach: 1. Build Gray code: for bit b, append the reverse of the current list with 2^b added. 2. XOR every codeword with start.
 * Dry Run: n=2, start=3. Gray [0,1,3,2] XOR 3 → [3,2,0,1].
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
