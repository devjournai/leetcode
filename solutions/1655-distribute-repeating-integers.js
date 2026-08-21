/**
 * Distribute Repeating Integers
 * Intuition: Each unique number's count is a bin that can satisfy at most one customer (a customer wants quantity[i] copies of one number). Backtrack customers onto bins, trying largest bins/needs first.
 * Approach: 1. Count frequencies, sort them descending, sort quantity descending. 2. Recurse on customer index: assign them to any remaining bin with count ≥ need, subtract, recurse; backtrack on failure. 3. Success when all customers are assigned.
 * Dry Run: nums=[1,2,3,4], quantity=[2] → no frequency ≥ 2 → false.
 * Time Complexity: O(U^M)
 * Space Complexity: O(U + M)
 */
var canDistribute = function (inputNumbers, customerRequirements) {
  const itemFrequencies = new Map();
  for (const itemValue of inputNumbers) {
    itemFrequencies.set(itemValue, (itemFrequencies.get(itemValue) || 0) + 1);
  }

  const sortedFrequencies = Array.from(itemFrequencies.values()).sort(
    (firstFreq, secondFreq) => secondFreq - firstFreq
  );
  const sortedRequirements = customerRequirements.sort(
    (firstReq, secondReq) => secondReq - firstReq
  );

  function evaluateDistribution(currentRequirementIndex, availableItemCounts) {
    if (currentRequirementIndex === sortedRequirements.length) {
      return true;
    }

    const singleRequirement = sortedRequirements[currentRequirementIndex];

    for (
      let stockIterator = 0;
      stockIterator < availableItemCounts.length;
      stockIterator++
    ) {
      if (availableItemCounts[stockIterator] >= singleRequirement) {
        availableItemCounts[stockIterator] -= singleRequirement;
        const distributionPossible = evaluateDistribution(
          currentRequirementIndex + 1,
          availableItemCounts
        );
        if (distributionPossible) {
          return true;
        }
        availableItemCounts[stockIterator] += singleRequirement;
      }
    }

    return false;
  }

  return evaluateDistribution(0, sortedFrequencies);
};
