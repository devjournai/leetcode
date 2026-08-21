/**
 * Count Caesar Cipher Pairs
 * Intuition: We can transform each string into a unified form. Specifically, we convert the first character of the string to 'z', and then transform the other characters in the string with the same offset. This way, all similar strings will be transformed into the same form. We use a hash table $\textit{cnt}$ to record the number of occurrences of each transformed string. Finally, we iterate through the hash table, calculate the combination number $\frac{v(v-1)}{2}$ for each string's occurrence count $v$, and add it to the answer. The time complexity is $O(n \times m)$ and the space complexity is $O(n \times m)$, where $n$ is the length of the string array and $m$ is the length of the strings.
 * Approach: We can transform each string into a unified form. Specifically, we convert the first character of the string to 'z', and then transform the other characters in the string with the same offset. This way, all similar strings will be transformed into the same form. We use a hash table $\textit{cnt}$ to record the number of occurrences of each transformed string. Finally, we iterate through the hash table, calculate the combination number $\frac{v(v-1)}{2}$ for each string's occurrence count $v$, and add it to the answer. The time complexity is $O(n \times m)$ and the space complexity is $O(n \times m)$, where $n$ is the length of the string array and $m$ is the length of the strings.
 * Dry Run: Input: words = [&quot;fusion&quot;,&quot;layout&quot;] => Output: 1
 * Time Complexity: O(O(n * m))
 * Space Complexity: O(O(n * m))
 */
var countPairs = function (words) {
  const cnt = new Map();
  let ans = 0;
  for (const s of words) {
    const t = s.split("");
    const k = "z".charCodeAt(0) - t[0].charCodeAt(0);
    for (let i = 1; i < t.length; i++) {
      t[i] = String.fromCharCode(97 + ((t[i].charCodeAt(0) - 97 + k) % 26));
    }
    t[0] = "z";
    const key = t.join("");
    cnt.set(key, (cnt.get(key) || 0) + 1);
  }
  for (const v of cnt.values()) {
    ans += (v * (v - 1)) / 2;
  }
  return ans;
};
