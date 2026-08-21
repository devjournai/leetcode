/**
 * Minimum Operations to Transform Binary String
 * Intuition: Ops: 0->1 at i, or 11->00 on adjacent. Work from left matching s2.
 * Approach: Greedy left-to-right: if s1[i]!=s2[i] and s1[i]=='0', flip to 1. If need to clear 11, apply second op. Simulate with a copy.
 * Dry Run: Input: s1=11, s2=00. Output: 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minOperations = function (s1, s2) {
  const a = s1.split("");
  const b = s2;
  const n = a.length;
  let ops = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] === b[i]) continue;
    if (a[i] === "0") {
      a[i] = "1";
      ops++;
    } else {
      if (i + 1 < n && a[i + 1] === "1") {
        a[i] = a[i + 1] = "0";
        ops++;
        if (a[i] !== b[i]) {
          if (a[i] === "0") {
            a[i] = "1";
            ops++;
          } else return -1;
        }
      } else return -1;
    }
  }
  return a.join("") === b ? ops : -1;
};
