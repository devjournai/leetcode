/**
 * Mirror Frequency Distance
 * Intuition: We first use a hash table $\textit{freq}$ to count the frequency of each character in string $s$. Then, we iterate over each key-value pair $(c, v)$ in $\textit{freq}$, where $c$ is the character and $v$ is the number of times character $c$ appears in string $s$. For each character $c$, we compute its mirror character $m$ and calculate $|freq(c) - freq(m)|$. To avoid counting mirror pairs twice, we use a hash set $\textit{vis}$ to track already-visited characters. Finally, we return the sum of absolute differences over all distinct mirror pairs. The time complexity is $O(n)$, where $n$ is the length of string $s$. The space complexity is $O(|\Sigma|)$, where $\Sigma$ is the set of distinct characters in string $s$.
 * Approach: We first use a hash table $\textit{freq}$ to count the frequency of each character in string $s$. Then, we iterate over each key-value pair $(c, v)$ in $\textit{freq}$, where $c$ is the character and $v$ is the number of times character $c$ appears in string $s$. For each character $c$, we compute its mirror character $m$ and calculate $|freq(c) - freq(m)|$. To avoid counting mirror pairs twice, we use a hash set $\textit{vis}$ to track already-visited characters. Finally, we return the sum of absolute differences over all distinct mirror pairs. The time complexity is $O(n)$, where $n$ is the length of string $s$. The space complexity is $O(|\Sigma|)$, where $\Sigma$ is the set of distinct characters in string $s$.
 * Dry Run: Input: s = &quot;ab1z9&quot; => Output: 3
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(|Sigma|))
 */
var mirrorFrequency = function (s) {
  const freq = new Map();
  for (const c of s) {
    freq.set(c, (freq.get(c) || 0) + 1);
  }

  let ans = 0;
  const vis = new Set();

  for (const [c, v] of freq.entries()) {
    let m;

    if (/[a-z]/.test(c)) {
      m = String.fromCharCode(
        "a".charCodeAt(0) + 25 - (c.charCodeAt(0) - "a".charCodeAt(0))
      );
    } else {
      m = String(9 - Number(c));
    }

    if (vis.has(m)) {
      continue;
    }
    vis.add(c);

    const mv = freq.get(m) || 0;
    ans += Math.abs(v - mv);
  }

  return ans;
};
