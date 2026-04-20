/**
 * Distribute Repeating Integers
 * Time Complexity: O(U^M)
 * Space Complexity: O(U + M)
 */
var canDistribute = function (inputNumbers, customerRequirements) {
  const itemFrequencies = new Map();
  for (const itemValue of inputNumbers) {
    itemFrequencies.set(itemValue, (itemFrequencies.get(itemValue) || 0) + 1);
  }

  const sortedFrequencies = Array.from(itemFrequencies.values()).sort(
    (firstFreq, secondFreq) => secondFreq - firstFreq,
  );
  const sortedRequirements = customerRequirements.sort(
    (firstReq, secondReq) => secondReq - firstReq,
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
          availableItemCounts,
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
