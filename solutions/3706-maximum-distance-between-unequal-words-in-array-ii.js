/**
 * Maximum Distance Between Unequal Words In Array II
 * Intuition: Same as part I: the maximum distance between unequal words is realized by pairing an endpoint with the farthest different word.
 * Approach: For each index i, if words[i] != words[0] take i+1; if != words[n-1] take n-i. Keep the max.
 * Dry Run: If first and last differ, the array length wins.
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
