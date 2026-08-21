/**
 * Transform Binary String Using Subsequence Sort
 * Intuition: Sorting a binary subsequence moves 0s left of 1s in chosen positions. You can arbitrarily reorder 0/1 on a subset into sorted order, i.e. push 0s leftward within chosen slots. Overall, s can become t iff the 1s of t are a subsequence of a string obtainable by moving 0s left... For binary, sorting subsequences can move any 0 left past 1s. You cannot move 1 left past 0 except by sorting a subsequence that includes them (which would put 0 first). So 0s can only move left relative to 1s. t must have the same counts, and prefix 1-count(t) <= prefix 1-count(s) after some... Example 101 -> 011 by sorting whole string. So 1s can move right. Counts of 0 and 1 must match. Supersequence condition: t is reachable iff count same and we never need more 0s than we can supply by moving. Standard: same number of 0/1, and t's 1-positions are to the right of s's 1-positions when matched.
 * Approach: For each pattern, try replacing ? to match a reachable binary with same 0/1 counts as s. Reachable iff #0 and #1 match and for every prefix, #0(t) >= 0 that can be... Match 0s left-greedy.
 * Dry Run: Input: s=101, strs=[1?1,0?1,0?0]. Output: [true,true,false].
 * Time Complexity: O(N * |strs|)
 * Space Complexity: O(N)
 */
var canTransform = function (s, strs) {
  const n = s.length;
  let z = 0,
    o = 0;
  for (const c of s)
    if (c === "0") z++;
    else o++;
  const reachable = (t) => {
    let tz = 0,
      to = 0;
    for (const c of t)
      if (c === "0") tz++;
      else to++;
    if (tz !== z || to !== o) return false;
    let i = 0;
    for (let j = 0; j < n; j++) {
      if (t[j] === "1") {
        while (i < n && s[i] !== "1") i++;
        if (i === n) return false;
        i++;
      }
    }
    return true;
  };
  const dfs = (p, i, arr) => {
    if (i === n) return reachable(arr.join(""));
    if (p[i] !== "?") {
      arr[i] = p[i];
      return dfs(p, i + 1, arr);
    }
    arr[i] = "0";
    if (dfs(p, i + 1, arr)) return true;
    arr[i] = "1";
    return dfs(p, i + 1, arr);
  };
  return strs.map((p) => dfs(p, 0, Array(n)));
};
