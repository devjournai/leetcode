/**
 * Merge Close Characters
 * Intuition: We use a hash table $\textit{last}$ to record the last occurrence position of each character. We iterate over each character in the string. If the current character has appeared before and the difference between the current index and its last occurrence index is at most $k$, we skip the character; otherwise, we add the character to the answer and update its position in the hash table. The time complexity is $O(n)$, and the space complexity is $O(|\Sigma|)$, where $n$ is the length of the string, and $|\Sigma|$ is the size of the character set. In this problem, the character set consists of lowercase English letters, so $|\Sigma|$ is a constant.
 * Approach: We use a hash table $\textit{last}$ to record the last occurrence position of each character. We iterate over each character in the string. If the current character has appeared before and the difference between the current index and its last occurrence index is at most $k$, we skip the character; otherwise, we add the character to the answer and update its position in the hash table. The time complexity is $O(n)$, and the space complexity is $O(|\Sigma|)$, where $n$ is the length of the string, and $|\Sigma|$ is the size of the character set. In this problem, the character set consists of lowercase English letters, so $|\Sigma|$ is a constant.
 * Dry Run: Input: s = &quot;abca&quot;, k = 3 => Output: &quot;abc&quot;
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(|Sigma|))
 */
var mergeCharacters = function (s, k) {
  const last = new Map();
  const ans = [];
  for (const c of s) {
    const cur = ans.length;
    if (last.has(c) && cur - last.get(c) <= k) {
      continue;
    }
    ans.push(c);
    last.set(c, cur);
  }
  return ans.join("");
};
