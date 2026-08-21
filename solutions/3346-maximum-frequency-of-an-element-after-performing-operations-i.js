/**
 * Maximum Frequency of an Element After Performing Operations I
 * Intuition: Each value x can be converted into any target in [x-k, x+k] using one operation. For a candidate target t, already-equal elements need no op; others inside [t-k, t+k] can be converted, limited by numOperations.
 * Approach: Sweep: +1 at num-k, -1 at num+k+1. Candidates are those event points plus original values. Scan in order, tracking how many nums cover the current point, then ans = count[t] + min(ops, cover - count[t]).
 * Dry Run: nums = [1,4,5], k = 1, numOperations = 2. Target 4: one already 4, 5 can convert, frequency 2.
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
