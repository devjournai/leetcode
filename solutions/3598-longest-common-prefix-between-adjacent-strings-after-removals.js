/**
 * Longest Common Prefix Between Adjacent Strings After Removals
 * Intuition: Removing words[i] only changes LCP of the new neighbors words[i-1] and words[i+1]. The answer is the max remaining adjacent LCP (or the new pair).
 * Approach: 1. Precompute LCP of every adjacent pair. 2. For each i, take max of LCPs not involving i, plus LCP(words[i-1], words[i+1]) if both exist. 3. If that max is 0, write 0.
 * Dry Run: words = ["jump","run","run","jump","run"]. Adjacent LCPs 0,3,0,0. Remove index 1: neighbors "jump"/"run" LCP 0, remaining include 0. Remove a "run" next to "run" keeps 3.
 * Time Complexity: O(N * L)
 * Space Complexity: O(N)
 */
var longestCommonPrefix = function (words) {
  const n = words.length;
  const lcp = (a, b) => {
    const limit = Math.min(a.length, b.length);
    let k = 0;
    while (k < limit && a[k] === b[k]) {
      k++;
    }
    return k;
  };

  const adj = [];
  for (let i = 0; i < n - 1; i++) {
    adj.push(lcp(words[i], words[i + 1]));
  }

  const prefixMax = new Array(adj.length + 1).fill(0);
  const suffixMax = new Array(adj.length + 1).fill(0);
  for (let i = 0; i < adj.length; i++) {
    prefixMax[i + 1] = Math.max(prefixMax[i], adj[i]);
  }
  for (let i = adj.length - 1; i >= 0; i--) {
    suffixMax[i] = Math.max(suffixMax[i + 1], adj[i]);
  }

  const answer = [];
  for (let i = 0; i < n; i++) {
    let best = 0;
    if (i >= 1) {
      best = Math.max(best, prefixMax[i - 1]);
    }
    if (i + 1 < adj.length) {
      best = Math.max(best, suffixMax[i + 1]);
    }
    if (i > 0 && i + 1 < n) {
      best = Math.max(best, lcp(words[i - 1], words[i + 1]));
    }
    answer.push(best);
  }
  return answer;
};
