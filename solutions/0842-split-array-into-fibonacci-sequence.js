/**
 * Split Array Into Fibonacci Sequence
 * Intuition: Backtrack over digit cuts. Reject leading zeros and values > 2^31-1. Once two numbers exist, the next cut must equal their sum. Success needs ≥3 numbers covering the string.
 * Approach: 1. `exploreCombinations(start)`: if start==len and length≥3 return true. 2. Try segment lengths; parseInt; skip if > expected sum, continue if smaller, push if equal or <2 nums. 3. Recurse then pop. 4. Return `foundSequence`.
 * Dry Run: "123456579". Try 1,2 then 3 matches; 12,34,56 no; 123,456,579 works → [123,456,579].
 * Time Complexity: O(N * M^2)
 * Space Complexity: O(K)
 */
var splitIntoFibonacci = function (numInput) {
  const foundSequence = [];
  const maximumValue = 2 ** 31 - 1;

  const exploreCombinations = (currentStartIndex) => {
    if (currentStartIndex === numInput.length && foundSequence.length >= 3) {
      return true;
    }

    for (
      let segmentLength = 1;
      segmentLength <= numInput.length - currentStartIndex;
      segmentLength++
    ) {
      if (numInput[currentStartIndex] === "0" && segmentLength > 1) {
        break;
      }

      const currentSegmentValue = parseInt(
        numInput.substring(currentStartIndex, currentStartIndex + segmentLength)
      );

      if (currentSegmentValue > maximumValue) {
        break;
      }

      if (foundSequence.length >= 2) {
        const secondPreviousElement = foundSequence[foundSequence.length - 2];
        const previousElement = foundSequence[foundSequence.length - 1];
        const expectedSum = secondPreviousElement + previousElement;

        if (currentSegmentValue > expectedSum) {
          break;
        }
        if (currentSegmentValue < expectedSum) {
          continue;
        }
      }

      foundSequence.push(currentSegmentValue);

      if (exploreCombinations(currentStartIndex + segmentLength)) {
        return true;
      }

      foundSequence.pop();
    }

    return false;
  };

  exploreCombinations(0);

  return foundSequence;
};
