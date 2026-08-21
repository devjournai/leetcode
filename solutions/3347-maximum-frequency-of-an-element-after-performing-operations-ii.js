/**
 * Maximum Frequency of an Element After Performing Operations II
 * Intuition: Same as part I: values may be arbitrarily large, so we still only evaluate coverage at original numbers and interval endpoints rather than scanning the full numeric range.
 * Approach: Difference array on [num-k, num+k]. Sweep sorted candidate points. Frequency at t is existing count[t] plus up to numOperations conversions from the covering interval.
 * Dry Run: nums = [1,90], k = 2, numOperations = 1. Candidates include 1 and 90; converting 1 toward 90 is impossible, so answer stays 1 unless they already overlap.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var maxFrequency = function (nums, k, numOperations) {
  let answer = 1;
  let adjustable = 0;
  const count = new Map();
  const line = new Map();
  const candidates = new Set();

  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
    line.set(num - k, (line.get(num - k) || 0) + 1);
    line.set(num + k + 1, (line.get(num + k + 1) || 0) - 1);
    candidates.add(num);
    candidates.add(num - k);
    candidates.add(num + k + 1);
  }

  const sortedCandidates = [...candidates].sort((a, b) => a - b);
  for (const value of sortedCandidates) {
    adjustable += line.get(value) || 0;
    const alreadyEqual = count.get(value) || 0;
    const convertible = adjustable - alreadyEqual;
    answer = Math.max(
      answer,
      alreadyEqual + Math.min(numOperations, convertible)
    );
  }

  return answer;
};
