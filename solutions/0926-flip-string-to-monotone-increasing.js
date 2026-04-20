/**
 * Flip String To Monotone Increasing
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minFlipsMonoIncr = function (s) {
  let initialStringLength = s.length;
  let totalZerosAccumulator = 0;

  for (const charItem of s) {
    if (charItem === "0") {
      totalZerosAccumulator++;
    }
  }

  let currentMinimumFlips = totalZerosAccumulator;
  let prefixOnesCount = 0;
  let prefixZerosCount = 0;

  for (
    let charIterationIndex = 0;
    charIterationIndex < initialStringLength;
    charIterationIndex++
  ) {
    let currentCharacterValue = s[charIterationIndex];

    if (currentCharacterValue === "1") {
      prefixOnesCount++;
    } else {
      prefixZerosCount++;
    }

    let currentCostCalculation =
      prefixOnesCount + (totalZerosAccumulator - prefixZerosCount);
    currentMinimumFlips = Math.min(currentMinimumFlips, currentCostCalculation);
  }

  return currentMinimumFlips;
};
