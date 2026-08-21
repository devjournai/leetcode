/**
 * Lexicographically Smallest String After Deleting Duplicate Characters
 * Intuition: We can use a stack $\textit{stk}$ to store the characters of the result string, and a hash table $\textit{cnt}$ to record the number of occurrences of each character in string $s$. First, we initialize $\textit{cnt}$ to count the occurrences of each character in string $s$. Then, we iterate through each character $c$ in string $s$: - If the stack is not empty, the top character of the stack is greater than $c$, and the top character will appear again in string $s$, we pop the top character and decrement its count in $\textit{cnt}$. - Push character $c$ into the stack. Finally, if there are duplicate characters in the stack, we continue to pop the top character until the count of the top character in $\textit{cnt}$ is 1. The time complexity is $O(n)$, and the space complexity is $O(n)$. Here, $n$ is the length of the string $s$.
 * Approach: We can use a stack $\textit{stk}$ to store the characters of the result string, and a hash table $\textit{cnt}$ to record the number of occurrences of each character in string $s$. First, we initialize $\textit{cnt}$ to count the occurrences of each character in string $s$. Then, we iterate through each character $c$ in string $s$: - If the stack is not empty, the top character of the stack is greater than $c$, and the top character will appear again in string $s$, we pop the top character and decrement its count in $\textit{cnt}$. - Push character $c$ into the stack. Finally, if there are duplicate characters in the stack, we continue to pop the top character until the count of the top character in $\textit{cnt}$ is 1. The time complexity is $O(n)$, and the space complexity is $O(n)$. Here, $n$ is the length of the string $s$.
 * Dry Run: Input: s = &quot;aaccb&quot; => Output: &quot;aacb&quot;
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var lexSmallestAfterDeletion = function (s) {
  const cnt = new Array(26).fill(0);
  const n = s.length;
  const a = "a".charCodeAt(0);
  for (let i = 0; i < n; ++i) {
    ++cnt[s.charCodeAt(i) - a];
  }
  const stk = [];
  for (let i = 0; i < n; ++i) {
    const c = s[i];
    while (
      stk.length > 0 &&
      stk[stk.length - 1] > c &&
      cnt[stk[stk.length - 1].charCodeAt(0) - a] > 1
    ) {
      --cnt[stk.pop().charCodeAt(0) - a];
    }
    stk.push(c);
  }
  while (cnt[stk[stk.length - 1].charCodeAt(0) - a] > 1) {
    --cnt[stk.pop().charCodeAt(0) - a];
  }
  return stk.join("");
};
