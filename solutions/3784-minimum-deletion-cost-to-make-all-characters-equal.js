/**
 * Minimum Deletion Cost to Make All Characters Equal
 * Intuition: We calculate the total deletion cost for each character in the string and store it in a hash table g, where the key is the character and the value is the corresponding total deletion cost. We also calculate the total cost \textit{tot} of deleting all characters.
 * Approach: Next, we iterate through the hash table g. For each character c, we calculate the minimum deletion cost required to keep that character, which is \textit{tot} - g[c]. The final answer is the minimum of all the minimum deletion costs corresponding to each character. The time complexity is O(n) and the space complexity is O(|\Sigma|), where n is the length of the string s, and \Sigma is the set of distinct characters in the string.
 * Dry Run: Input s = "aabaac", cost = [1,2,3,4,1,10]. Output 11.
 * Time Complexity: O(n)
 * Space Complexity: O(|\Sigma|)
 */
var minCost = function (s, cost) {
  let tot = 0;
  const g = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const v = cost[i];
    tot += v;
    g.set(c, (g.get(c) ?? 0) + v);
  }
  let ans = tot;
  for (const x of g.values()) {
    ans = Math.min(ans, tot - x);
  }
  return ans;
};
