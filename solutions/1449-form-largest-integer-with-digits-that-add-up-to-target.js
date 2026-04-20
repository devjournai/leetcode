/**
 * Form Largest Integer With Digits That Add Up To Target
 * Time Complexity: O(target^2)
 * Space Complexity: O(target^2)
 */
var largestNumber = function (cost, target) {
  const dpValues = new Array(target + 1).fill("0");
  dpValues[0] = "";

  for (let currentCostSum = 1; currentCostSum <= target; currentCostSum++) {
    for (let digitOption = 1; digitOption <= 9; digitOption++) {
      const costForDigit = cost[digitOption - 1];
      const previousCostRequired = currentCostSum - costForDigit;

      if (previousCostRequired >= 0 && dpValues[previousCostRequired] !== "0") {
        const candidateNumString =
          digitOption.toString() + dpValues[previousCostRequired];
        const existingBestNumString = dpValues[currentCostSum];

        const candidateLength = candidateNumString.length;
        const existingLength = existingBestNumString.length;

        if (
          candidateLength > existingLength ||
          (candidateLength === existingLength &&
            candidateNumString > existingBestNumString)
        ) {
          dpValues[currentCostSum] = candidateNumString;
        }
      }
    }
  }

  return dpValues[target];
};
