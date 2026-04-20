/**
 * Partition To K Equal Sum Subsets
 * Time Complexity: O(k * N * 2^N)
 * Space Complexity: O(N)
 */
var canPartitionKSubsets = function (numbersArray, desiredSubsetCount) {
  const totalArraySum = numbersArray.reduce((acc, curr) => acc + curr, 0);

  if (totalArraySum % desiredSubsetCount !== 0) {
    return false;
  }

  const targetSubsetSum = totalArraySum / desiredSubsetCount;

  numbersArray.sort((valA, valB) => valB - valA);

  if (numbersArray[0] > targetSubsetSum) {
    return false;
  }

  const elementUsageTracker = new Array(numbersArray.length).fill(false);

  const explorePartitions = (
    currentElementPosition,
    completedSubsetsCount,
    currentPartitionSum,
  ) => {
    if (completedSubsetsCount === desiredSubsetCount) {
      return true;
    }

    if (currentPartitionSum > targetSubsetSum) {
      return false;
    }

    if (currentPartitionSum === targetSubsetSum) {
      return explorePartitions(0, completedSubsetsCount + 1, 0);
    }

    for (
      let elementSearchIndex = currentElementPosition;
      elementSearchIndex < numbersArray.length;
      elementSearchIndex++
    ) {
      if (!elementUsageTracker[elementSearchIndex]) {
        elementUsageTracker[elementSearchIndex] = true;

        if (
          explorePartitions(
            elementSearchIndex + 1,
            completedSubsetsCount,
            currentPartitionSum + numbersArray[elementSearchIndex],
          )
        ) {
          return true;
        }

        elementUsageTracker[elementSearchIndex] = false;

        if (currentPartitionSum === 0) {
          break;
        }
      }
    }

    return false;
  };

  return explorePartitions(0, 0, 0);
};
