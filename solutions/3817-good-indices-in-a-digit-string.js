/**
 * Good Indices in a Digit String
 * Intuition: We observe that the maximum length of string $s$ is $10^5$, and the length of the decimal representation of index $i$ is at most $6$ (since the decimal representation of $10^5$ is $100000$, which has a length of $6$). Therefore, we only need to check for each index $i$ whether the substring corresponding to its decimal representation is equal to it. The time complexity is $O(n)$, where $n$ is the length of the string $s$. The space complexity is $O(1)$, ignoring the space required for the answer.
 * Approach: We observe that the maximum length of string $s$ is $10^5$, and the length of the decimal representation of index $i$ is at most $6$ (since the decimal representation of $10^5$ is $100000$, which has a length of $6$). Therefore, we only need to check for each index $i$ whether the substring corresponding to its decimal representation is equal to it. The time complexity is $O(n)$, where $n$ is the length of the string $s$. The space complexity is $O(1)$, ignoring the space required for the answer.
 * Dry Run: Input: s = &quot;0234567890112&quot; => Output: [0,11,12]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var goodIndices = function (s) {
  const ans = [];
  for (let i = 0; i < s.length; i++) {
    const t = String(i);
    const k = t.length;
    if (s.slice(i + 1 - k, i + 1) === t) {
      ans.push(i);
    }
  }
  return ans;
};
