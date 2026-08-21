/**
 * Total Distance to Type a String Using One Finger
 * Intuition: We define a hash table $\textit{pos}$ to store the position of each character on the keyboard. For each character in string $s$, we calculate the distance from the previous character to the current character and accumulate it to the answer. Finally, we return the answer. The time complexity is $O(n)$, where $n$ is the length of string $s$. The space complexity is $O(|\Sigma|)$, where $\Sigma$ is the character set, which here is 26 lowercase English letters.
 * Approach: We define a hash table $\textit{pos}$ to store the position of each character on the keyboard. For each character in string $s$, we calculate the distance from the previous character to the current character and accumulate it to the answer. Finally, we return the answer. The time complexity is $O(n)$, where $n$ is the length of string $s$. The space complexity is $O(|\Sigma|)$, where $\Sigma$ is the character set, which here is 26 lowercase English letters.
 * Dry Run: Input: s = &quot;hello&quot; => Output: 17
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(|Sigma|))
 */
const pos = {};

const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
keys.forEach((row, i) => {
  [...row].forEach((key, j) => {
    pos[key] = [i, j];
  });
});

var totalDistance = function (s) {
  let pre = "a";
  let ans = 0;

  for (const cur of s) {
    const [x1, y1] = pos[pre];
    const [x2, y2] = pos[cur];
    ans += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    pre = cur;
  }

  return ans;
};
