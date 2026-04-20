/**
 * Create Sorted Array Through Instructions
 * Time Complexity: O(N log M)
 * Space Complexity: O(M)
 */
var createSortedArray = function (instructions) {
  const modulusValue = 1e9 + 7;
  let maximumPossibleValue = 0;
  for (
    let instructionIterator = 0;
    instructionIterator < instructions.length;
    instructionIterator++
  ) {
    if (instructions[instructionIterator] > maximumPossibleValue) {
      maximumPossibleValue = instructions[instructionIterator];
    }
  }

  const bitArray = new Array(maximumPossibleValue + 1).fill(0);
  let overallCost = 0;

  function updateBit(targetIndex) {
    for (
      let fenwickIndex = targetIndex;
      fenwickIndex <= maximumPossibleValue;
      fenwickIndex += fenwickIndex & -fenwickIndex
    ) {
      bitArray[fenwickIndex]++;
    }
  }

  function queryBit(limitIndex) {
    let currentSum = 0;
    for (
      let queryIndex = limitIndex;
      queryIndex > 0;
      queryIndex -= queryIndex & -queryIndex
    ) {
      currentSum += bitArray[queryIndex];
    }
    return currentSum;
  }

  for (
    let currentInstructionIndex = 0;
    currentInstructionIndex < instructions.length;
    currentInstructionIndex++
  ) {
    const currentValue = instructions[currentInstructionIndex];
    const smallerCount = queryBit(currentValue - 1);
    const largerCount = currentInstructionIndex - queryBit(currentValue);
    overallCost =
      (overallCost + Math.min(smallerCount, largerCount)) % modulusValue;
    updateBit(currentValue);
  }

  return overallCost;
};
