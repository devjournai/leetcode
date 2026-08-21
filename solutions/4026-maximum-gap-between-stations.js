/**
 * Maximum Gap Between Stations
 * Intuition: The maximum gap must occur between some pair of consecutive workers (i, i+1). To maximize this pair's gap, workers 0, 1, ldots, i should be assigned as far left as possible, and workers i+1, ldots, n-1 as far right as possible.
 * Approach: The maximum gap must occur between some pair of consecutive workers (i, i+1). To maximize this pair's gap, workers 0, 1, ldots, i should be assigned as far left as possible, and workers i+1, ldots, n-1 as far right as possible. Thus, we scan from right to left and precompute suf[i]: the rightmost station worker i can take, assuming workers i+1, ldots, n-1 occupy even righter stations. Then we scan from left to right, assign worker i to the current leftmost matching station pre, and update the answer with suf[i+1] - pre. We take the maximum over all consecutive pairs. If there is only one worker, the answer is 0.
 * Dry Run: Input: skill = "aa", station = "aaaa". Output: 3.
 * Time Complexity: O(n+m)
 * Space Complexity: O(n)
 */
var maximumGap = function (skill, station) {
  const n = skill.length;
  const m = station.length;

  const suf = Array(n).fill(0);
  let j = m - 1;

  for (let i = n - 1; i > 0; i--) {
    while (station[j] !== skill[i]) {
      j--;
    }

    suf[i] = j;
    j--;
  }

  let ans = 0;
  let pre = 0;

  for (let i = 0; i < n - 1; i++) {
    while (station[pre] !== skill[i]) {
      pre++;
    }

    ans = Math.max(ans, suf[i + 1] - pre);
    pre++;
  }

  return ans;
};
