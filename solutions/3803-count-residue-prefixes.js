/**
 * Count Residue Prefixes
 * Intuition: We use a hash table $\textit{st}$ to record the set of distinct characters that have appeared in the current prefix. We iterate through each character $c$ in the string $s$, add it to the set $\textit{st}$, and then check if the length of the current prefix modulo $3$ equals the size of the set $\textit{st}$. If they are equal, it means the current prefix is a residue prefix, and we increment the answer by $1$. After the iteration, we return the answer. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of the string $s$.
 * Approach: We use a hash table $\textit{st}$ to record the set of distinct characters that have appeared in the current prefix. We iterate through each character $c$ in the string $s$, add it to the set $\textit{st}$, and then check if the length of the current prefix modulo $3$ equals the size of the set $\textit{st}$. If they are equal, it means the current prefix is a residue prefix, and we increment the answer by $1$. After the iteration, we return the answer. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of the string $s$.
 * Dry Run: Input: s = &quot;abc&quot; => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var residuePrefixes = function (s) {
  const st = new Set();
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    st.add(c);
    if (st.size === (i + 1) % 3) {
      ans++;
    }
  }
  return ans;
};
