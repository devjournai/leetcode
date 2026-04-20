/**
 * Split Array Into Fibonacci Sequence
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
        numInput.substring(
          currentStartIndex,
          currentStartIndex + segmentLength,
        ),
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
