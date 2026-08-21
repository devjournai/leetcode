/**
 * Create Sorted Array Through Instructions
 * Intuition: Cost of inserting x is min(#strictly smaller, #strictly greater) already in the stream. A Fenwick tree of frequencies answers those counts in log M.
 * Approach: 1. Size a BIT up to max(instructions). 2. For each value, smaller = query(x-1), larger = i - query(x). 3. Add min of those to cost (mod 1e9+7). 4. update(x).
 * Dry Run: [1,5,6,2].
 *   - Insert 1 cost 0; 5 cost 0; 6 cost 0; 2 cost min(1,2)=1. Total 1.
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
