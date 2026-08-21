/**
 * Maximum Distance Between Unequal Words In Array I
 * Intuition: The farthest unequal pair always uses an endpoint: either words[0] vs the farthest different word, or words[n-1] vs the farthest different word.
 * Approach: For each index i, if words[i] != words[0] take i+1; if != words[n-1] take n-i. Keep the max (0 if all equal).
 * Dry Run: If the first and last words differ, the whole array length is a candidate.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxDistance = function (words) {
  const n = words.length;
  let maxDist = 0;
  for (let index = 0; index < n; index++) {
    if (words[index] !== words[0]) {
      maxDist = Math.max(maxDist, index + 1);
    }
    if (words[index] !== words[n - 1]) {
      maxDist = Math.max(maxDist, n - index);
    }
  }
  return maxDist;
};
