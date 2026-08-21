/**
 * Flip String To Monotone Increasing
 * Intuition: A monotone string is 0…01…1. For a split after index i, cost is (ones in the prefix to flip to 0) + (zeros in the suffix to flip to 1). Also consider flipping all zeros (all 1s).
 * Approach: 1. Count `totalZerosAccumulator`. 2. Init min flips to that (make all 1s). 3. Scan: track prefix ones/zeros; cost = prefixOnes + (totalZeros − prefixZeros); take min. 4. Return min.
 * Dry Run: "00110". totalZeros=3. After "0011" prefixOnes=2 prefixZeros=2 cost=2+(3-2)=3. After "00110" ones=2 zeros=3 cost=2. After "" implicit 3. Min includes split to "00111" cost 1 (flip last 0) → 1.
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
