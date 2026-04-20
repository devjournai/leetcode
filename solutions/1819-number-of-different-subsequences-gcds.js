/**
 * Number Of Different Subsequence Gcds
 * Time Complexity: O(N + M * (log M)^2)
 * Space Complexity: O(M)
 */
var countDifferentSubsequenceGCDs = function (nums) {
  let maximumElementValue = 0;
  for (const currentNumber of nums) {
    if (currentNumber > maximumElementValue) {
      maximumElementValue = currentNumber;
    }
  }

  const valuePresenceTracker = new Array(maximumElementValue + 1).fill(false);

  let totalUniqueGcds = 0;

  function computeGreatestCommonDivisor(valueA, valueB) {
    while (valueB) {
      let remainderCalculation = valueA % valueB;
      valueA = valueB;
      valueB = remainderCalculation;
    }
    return valueA;
  }

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    valuePresenceTracker[nums[elementIndex]] = true;
  }

  for (
    let currentPotentialGcd = 1;
    currentPotentialGcd <= maximumElementValue;
    currentPotentialGcd++
  ) {
    let discoveredGcdForThisCandidate = 0;
    for (
      let multipleToCheck = currentPotentialGcd;
      multipleToCheck <= maximumElementValue;
      multipleToCheck += currentPotentialGcd
    ) {
      if (valuePresenceTracker[multipleToCheck]) {
        discoveredGcdForThisCandidate = discoveredGcdForThisCandidate
          ? computeGreatestCommonDivisor(
              discoveredGcdForThisCandidate,
              multipleToCheck,
            )
          : multipleToCheck;
      }
    }
    if (discoveredGcdForThisCandidate === currentPotentialGcd) {
      totalUniqueGcds++;
    }
  }

  return totalUniqueGcds;
};
