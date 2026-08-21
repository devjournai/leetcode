/**
 * Number Of Ways To Stay In The Same Place After Some Steps
 * Intuition: You cannot go farther than min(steps, arrLen-1). DP[pos] is ways to be there after the current step, combining stay/left/right from the previous row, mod 1e9+7.
 * Approach: 1. Cap positions at maxAllowedPosition. 2. waysAtCurrentStep[0]=1. 3. For each step rebuild nextWaysArray: from i-1, i, i+1. 4. Return ways at index 0.
 * Dry Run: steps=3, arrLen=2
 *   pos 0,1. After 1 step: pos0=1 (stay), pos1=1 (right). After 2: pos0=2, pos1=2. After 3: pos0=4. Return 4.
 * Time Complexity: O(steps * min(steps, arrLen))
 * Space Complexity: O(min(steps, arrLen))
 */
var numWays = function (steps, arrLen) {
  const moduloValue = 1e9 + 7;
  const maxAllowedPosition = Math.min(steps, arrLen - 1);

  let waysAtCurrentStep = new Array(maxAllowedPosition + 1).fill(0);
  waysAtCurrentStep[0] = 1;

  for (let stepCounter = 1; stepCounter <= steps; stepCounter++) {
    const waysAtPreviousStep = waysAtCurrentStep;
    let nextWaysArray = new Array(maxAllowedPosition + 1).fill(0);

    for (
      let positionIndex = 0;
      positionIndex <= maxAllowedPosition;
      positionIndex++
    ) {
      let totalWaysAtPosition = waysAtPreviousStep[positionIndex];

      if (positionIndex > 0) {
        totalWaysAtPosition =
          (totalWaysAtPosition + waysAtPreviousStep[positionIndex - 1]) %
          moduloValue;
      }

      if (positionIndex < maxAllowedPosition) {
        totalWaysAtPosition =
          (totalWaysAtPosition + waysAtPreviousStep[positionIndex + 1]) %
          moduloValue;
      }
      nextWaysArray[positionIndex] = totalWaysAtPosition;
    }
    waysAtCurrentStep = nextWaysArray;
  }

  return waysAtCurrentStep[0];
};
