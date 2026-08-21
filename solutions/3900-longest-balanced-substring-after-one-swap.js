/**
 * Longest Balanced Substring After One Swap
 * Intuition: Let the prefix sum $\textit{pre}$ denote the number of 1s minus the number of 0s in the current prefix. Then for any substring, if the numbers of 0s and 1s are equal, its corresponding prefix sum difference is $0$. Therefore, if the prefix sum at position $i$ is $x$, and some previous position also has prefix sum $x$, then the substring between these two positions is balanced, and we can directly use it to update the answer. Now the problem allows us to perform at most one swap between any two characters. One swap can only reduce the difference between the counts of 1 and 0 in a substring by $2$. So besides the case where the prefix sum difference is $0$, we also need to consider: - A prefix sum difference of $2$, which means the substring contains 2 more 1s than 0s. In this case, if there is still at least one 0 outside the substring, we can make it balanced with one swap. - A prefix su...
 * Approach: Let the prefix sum $\textit{pre}$ denote the number of 1s minus the number of 0s in the current prefix. Then for any substring, if the numbers of 0s and 1s are equal, its corresponding prefix sum difference is $0$. Therefore, if the prefix sum at position $i$ is $x$, and some previous position also has prefix sum $x$, then the substring between these two positions is balanced, and we can directly use it to update the answer. Now the problem allows us to perform at most one swap between any two characters. One swap can only reduce the difference between the counts of 1 and 0 in a substring by $2$. So besides the case where the prefix sum difference is $0$, we also need to consider: - A prefix sum difference of $2$, which means the substring contains 2 more 1s than 0s. In this case, if there is still at least one 0 outside the substring, we can make it balanced with one swap. - A prefix su...
 * Dry Run: Input: s = &quot;100001&quot; => Output: 4
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var longestBalanced = function (s) {
  const cnt0 = [...s].filter((c) => c === "0").length;
  const cnt1 = s.length - cnt0;
  const pos = new Map();
  pos.set(0, [-1]);
  let ans = 0;
  let pre = 0;
  for (let i = 0; i < s.length; ++i) {
    pre += s[i] === "1" ? 1 : -1;
    if (!pos.has(pre)) {
      pos.set(pre, []);
    }
    pos.get(pre).push(i);

    ans = Math.max(ans, i - pos.get(pre)[0]);
    if (pos.has(pre - 2)) {
      const p = pos.get(pre - 2);
      if ((i - p[0] - 2) >> 1 < cnt0) {
        ans = Math.max(ans, i - p[0]);
      } else if (p.length > 1) {
        ans = Math.max(ans, i - p[1]);
      }
    }

    if (pos.has(pre + 2)) {
      const p = pos.get(pre + 2);
      if ((i - p[0] - 2) >> 1 < cnt1) {
        ans = Math.max(ans, i - p[0]);
      } else if (p.length > 1) {
        ans = Math.max(ans, i - p[1]);
      }
    }
  }
  return ans;
};
