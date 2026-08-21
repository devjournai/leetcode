/**
 * Partition Equal Subset Sum
 * Intuition: Equal partition exists iff some subset sums to `entireArraySum/2`. 0/1 knapsack on `possibleSumsTracker[s]` means sum `s` is reachable.
 * Approach: 1. Sum the array; odd sum → false. 2. Boolean DP of size `target+1`, `possibleSumsTracker[0]=true`. 3. For each num, iterate sums downward, OR in `tracker[s-num]`. 4. Return `possibleSumsTracker[target]`.
 * Dry Run: nums = [1,5,11,5], sum=22, target=11.
 *   - 1→ {0,1}; 5→ {0,1,5,6}; 11→ includes 11; 5 keeps 11. Return true.
 * Time Complexity: O(n * s)
 * Space Complexity: O(s)
 */
var canPartition = function (nums) {
  let entireArraySum = 0;
  for (let currentNumberValue of nums) {
    entireArraySum += currentNumberValue;
  }

  if (entireArraySum % 2 !== 0) {
    return false;
  }

  let targetSubsetSum = entireArraySum / 2;
  let possibleSumsTracker = new Array(targetSubsetSum + 1).fill(false);
  possibleSumsTracker[0] = true;

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < nums.length;
    currentNumberIndex++
  ) {
    let currentArrayElement = nums[currentNumberIndex];
    for (
      let currentSumPossibility = targetSubsetSum;
      currentSumPossibility >= currentArrayElement;
      currentSumPossibility--
    ) {
      possibleSumsTracker[currentSumPossibility] =
        possibleSumsTracker[currentSumPossibility] ||
        possibleSumsTracker[currentSumPossibility - currentArrayElement];
    }
  }

  return possibleSumsTracker[targetSubsetSum];
};
