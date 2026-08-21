/**
 * Partition To K Equal Sum Subsets
 * Intuition: Total sum must split into k equal target buckets. Sort descending and backtrack assigning unused numbers; finishing a bucket restarts from index 0.
 * Approach: 1. Reject if sum % k ≠ 0 or largest > target. 2. `explorePartitions(pos, completed, sum)`: completed==k true; sum>target false; sum==target recurse next bucket. 3. Try unused indices from pos, mark/unmark; if sum==0 after fail, break.
 * Dry Run: nums=[4,3,2,3,5,2,1], k=4. sum=20, target=5. Sort 5,4,3,3,2,2,1. First bucket 5, then 4+1, then 3+2, then 3+2 → true.
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
    currentPartitionSum
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
            currentPartitionSum + numbersArray[elementSearchIndex]
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
