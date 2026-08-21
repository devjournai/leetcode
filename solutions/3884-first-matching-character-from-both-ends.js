/**
 * First Matching Character From Both Ends
 * Intuition: We iterate over the first half of the string $s$. For each index $i$, we check whether the characters at position $i$ and position $n - i - 1$ are equal. If they are, we return index $i$. If no such index is found after the iteration, we return -1. The time complexity is $O(n)$, where $n$ is the length of the string $s$. The space complexity is $O(1)$.
 * Approach: We iterate over the first half of the string $s$. For each index $i$, we check whether the characters at position $i$ and position $n - i - 1$ are equal. If they are, we return index $i$. If no such index is found after the iteration, we return -1. The time complexity is $O(n)$, where $n$ is the length of the string $s$. The space complexity is $O(1)$.
 * Dry Run: Input: s = &quot;abcacbd&quot; => Output: 1
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var firstMatchingIndex = function (s) {
  const n = s.length;
  for (let i = 0; i < Math.floor(n / 2) + 1; i++) {
    if (s[i] === s[n - i - 1]) {
      return i;
    }
  }
  return -1;
};
