/**
 * Maximum Bitwise XOR After Rearrangement
 * Intuition: We use an array $\textit{cnt}$ of length $2$ to count the number of character '0' and character '1' in string $t$. Then we iterate through string $s$. For each character $s[i]$, we want to find a character in string $t$ that is different from $s[i]$ to perform the XOR operation, in order to get a larger result. If we find such a character, we set the $i$-th bit of the answer to '1' and decrement the count of that character by one; otherwise, we can only use a character that is the same as $s[i]$ for the XOR operation, the $i$-th bit of the answer remains '0', and we decrement the count of that character by one. Finally, we return the answer. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of string $s$.
 * Approach: We use an array $\textit{cnt}$ of length $2$ to count the number of character '0' and character '1' in string $t$. Then we iterate through string $s$. For each character $s[i]$, we want to find a character in string $t$ that is different from $s[i]$ to perform the XOR operation, in order to get a larger result. If we find such a character, we set the $i$-th bit of the answer to '1' and decrement the count of that character by one; otherwise, we can only use a character that is the same as $s[i]$ for the XOR operation, the $i$-th bit of the answer remains '0', and we decrement the count of that character by one. Finally, we return the answer. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of string $s$.
 * Dry Run: Input: s = &quot;101&quot;, t = &quot;011&quot; => Output: &quot;110&quot;
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var maximumXor = function (s, t) {
  const cnt = [0, 0];

  for (const c of t) {
    cnt[Number(c)]++;
  }

  const ans = new Array(s.length).fill("0");

  for (let i = 0; i < s.length; i++) {
    const x = Number(s[i]);
    if (cnt[x ^ 1] > 0) {
      cnt[x ^ 1]--;
      ans[i] = "1";
    } else {
      cnt[x]--;
    }
  }

  return ans.join("");
};
