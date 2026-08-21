/**
 * Number of Prefix Connected Groups
 * Intuition: We use a hash table $\textit{cnt}$ to count the number of occurrences of the prefix composed of the first $k$ characters of each string with length greater than or equal to $k$. Finally, we count the number of keys in $\textit{cnt}$ with values greater than $1$, which is the number of connected groups. The time complexity is $O(n \times k)$, and the space complexity is $O(n)$, where $n$ is the length of $\textit{words}$.
 * Approach: We use a hash table $\textit{cnt}$ to count the number of occurrences of the prefix composed of the first $k$ characters of each string with length greater than or equal to $k$. Finally, we count the number of keys in $\textit{cnt}$ with values greater than $1$, which is the number of connected groups. The time complexity is $O(n \times k)$, and the space complexity is $O(n)$, where $n$ is the length of $\textit{words}$.
 * Dry Run: Input: words = [&quot;apple&quot;,&quot;apply&quot;,&quot;banana&quot;,&quot;bandit&quot;], k = 2 => Output: 2
 * Time Complexity: O(O(n * k))
 * Space Complexity: O(O(n))
 */
var prefixConnected = function (words, k) {
  const cnt = new Map();

  for (const w of words) {
    if (w.length >= k) {
      const key = w.substring(0, k);
      cnt.set(key, (cnt.get(key) ?? 0) + 1);
    }
  }

  let ans = 0;
  for (const v of cnt.values()) {
    if (v > 1) {
      ans++;
    }
  }

  return ans;
};
