/**
 * Maximize Subarrays After Removing One Conflicting Pair
 * Intuition: A subarray is invalid if it covers both ends of any remaining conflicting pair. For each right endpoint the tightest left conflict (maxLeft) cuts valid starts to (maxLeft, right]. Removing one pair only helps if it is currently that tightest cut.
 * Approach: 1. Bucket each pair under max(a,b) with left = min(a,b). 2. Sweep right = 1..n, maintaining maxLeft and secondMaxLeft. 3. Add right - maxLeft valid subarrays. 4. If maxLeft were removed, gain maxLeft - secondMaxLeft extra subarrays ending here. 5. Answer is validSubarrays plus the best gain.
 * Dry Run: n = 4, conflictingPairs = [[2,3],[1,4]].
 *   - right=1: no conflict, +1.
 *   - right=2: no conflict, +2.
 *   - right=3: left 2 becomes maxLeft; +1; gain[2] += 2.
 *   - right=4: left 1 is second; +2; gain[2] += 1. Total valid 6 + max gain 3 = 9.
 * Time Complexity: O(N + P)
 * Space Complexity: O(N)
 */
var maxSubarrays = function (n, conflictingPairs) {
  let validSubarrays = 0;
  let maxLeft = 0;
  let secondMaxLeft = 0;
  const gains = new Array(n + 1).fill(0);
  const conflicts = Array.from({ length: n + 1 }, () => []);

  for (const pair of conflictingPairs) {
    const a = pair[0];
    const b = pair[1];
    conflicts[Math.max(a, b)].push(Math.min(a, b));
  }

  for (let right = 1; right <= n; right++) {
    for (const left of conflicts[right]) {
      if (left > maxLeft) {
        secondMaxLeft = maxLeft;
        maxLeft = left;
      } else if (left > secondMaxLeft) {
        secondMaxLeft = left;
      }
    }
    validSubarrays += right - maxLeft;
    gains[maxLeft] += maxLeft - secondMaxLeft;
  }

  let bestGain = 0;
  for (const gain of gains) {
    bestGain = Math.max(bestGain, gain);
  }

  return validSubarrays + bestGain;
};
