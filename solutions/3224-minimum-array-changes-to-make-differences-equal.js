/**
 * Minimum Array Changes to Make Differences Equal
 * Intuition: Pair nums[i] with nums[n-1-i]. We want every pair's absolute difference equal to some X. Each pair needs 0, 1, or 2 changes depending on current |a-b| and how far X is from the range reachable by changing one value in [0,k].
 * Approach: 1. Count current differences and, for each pair, the max difference achievable with one change (max(a,b,k-a,k-b)). 2. Build a suffix sum of one-change coverage. 3. For each occurring difference X, cost = (pairs that can reach X with one change minus those already equal to X) + 2 * (pairs that cannot). Take the minimum.
 * Dry Run:
 *   nums = [1, 0, 1, 2, 4, 3], k = 4
 *   Pairs (1,3) diff 2, (0,4) diff 4, (1,2) diff 1. Best X can be 1 with two one-changes -> 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minChanges = function (nums, k) {
  const pairCount = nums.length / 2;
  const differenceFrequencies = new Map();
  const oneChangeCount = Array(k + 1).fill(0);

  for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
    const leftValue = nums[pairIndex];
    const rightValue = nums[nums.length - 1 - pairIndex];
    const currentDifference = Math.abs(leftValue - rightValue);
    differenceFrequencies.set(
      currentDifference,
      (differenceFrequencies.get(currentDifference) || 0) + 1
    );
    const maxOneChangeDifference = Math.max(
      leftValue,
      rightValue,
      k - leftValue,
      k - rightValue
    );
    oneChangeCount[maxOneChangeDifference]++;
  }

  const prefixOneChangeCount = oneChangeCount.slice();
  for (let differenceValue = k - 1; differenceValue >= 0; differenceValue--) {
    prefixOneChangeCount[differenceValue] +=
      prefixOneChangeCount[differenceValue + 1];
  }

  let minimumChanges = nums.length;
  for (const [
    targetDifference,
    alreadyMatchingCount,
  ] of differenceFrequencies) {
    const oneChangePairs =
      prefixOneChangeCount[targetDifference] - alreadyMatchingCount;
    const twoChangePairs =
      (pairCount - prefixOneChangeCount[targetDifference]) * 2;
    minimumChanges = Math.min(minimumChanges, oneChangePairs + twoChangePairs);
  }

  return minimumChanges;
};
