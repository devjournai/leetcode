/**
 * Number Of Different Subsequence Gcds
 * Intuition: A number g is a subsequence GCD iff the GCD of all multiples of g present in nums equals g. Checking each candidate g by walking its multiples finds every such g.
 * Approach: 1. Find max(nums) and mark `valuePresenceTracker`. 2. For each candidate g, GCD together all present multiples. 3. If that GCD equals g, increment `totalUniqueGcds`. 4. Return the count.
 * Dry Run: nums = [6,10,3].
 *   - g=1: gcd(6,10,3)=1. g=2: gcd(6,10)=2. g=3: gcd(6,3)=3. g=5: 10. g=6,10 present. Count 5.
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
              multipleToCheck
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
