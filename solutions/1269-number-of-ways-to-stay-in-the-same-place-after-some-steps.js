/**
 * Number Of Ways To Stay In The Same Place After Some Steps
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
