/**
 * Maximum Number of Equal Length Runs
 * Intuition: We can use a hash table \textit{cnt} to record the number of occurrences of each run length. We traverse the string s, and for each run, we calculate its length m and increment \textit{cnt}[m] by 1. Finally, the answer is the maximum value in \textit{cnt}.
 * Approach: The time complexity is O(n), and the space complexity is O(n). Where n is the length of the string s.
 * Dry Run: Input s = "hello". Output 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxSameLengthRuns = function (s) {
  const cnt = {};
  const n = s.length;
  let ans = 0;
  for (let i = 0; i < n;) {
    let j = i + 1;
    while (j < n && s[j] === s[i]) {
      ++j;
    }
    const m = j - i;
    cnt[m] = (cnt[m] || 0) + 1;
    ans = Math.max(ans, cnt[m]);
    i = j;
  }
  return ans;
};
