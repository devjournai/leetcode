/**
 * Reverse Letters Then Special Characters in a String
 * Intuition: We first store the letters and special characters from string $s$ into two separate lists $a$ and $b$ respectively. Then we traverse the string $s$. If the current position is a letter, we pop the last letter from list $a$ and place it back at that position; otherwise, we pop the last special character from list $b$ and place it back at that position. After the traversal is complete, we obtain the result string. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of string $s$.
 * Approach: We first store the letters and special characters from string $s$ into two separate lists $a$ and $b$ respectively. Then we traverse the string $s$. If the current position is a letter, we pop the last letter from list $a$ and place it back at that position; otherwise, we pop the last special character from list $b$ and place it back at that position. After the traversal is complete, we obtain the result string. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is the length of string $s$.
 * Dry Run: Input: s = &quot;)ebc#da@f(&quot; => Output: &quot;(fad@cb#e)&quot;
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var reverseByType = function (s) {
  const a = [];
  const b = [];
  const t = s.split("");

  for (const c of t) {
    if (/[a-zA-Z]/.test(c)) {
      a.push(c);
    } else {
      b.push(c);
    }
  }

  let j = a.length,
    k = b.length;
  for (let i = 0; i < t.length; i++) {
    if (/[a-zA-Z]/.test(t[i])) {
      t[i] = a[--j];
    } else {
      t[i] = b[--k];
    }
  }

  return t.join("");
};
