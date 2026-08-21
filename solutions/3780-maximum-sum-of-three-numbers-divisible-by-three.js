/**
 * Maximum Sum of Three Numbers Divisible by Three
 * Intuition: We first sort the array \textit{nums}, then divide the elements in the array into three groups based on their modulo 3 results, denoted as \textit{g}[0], \textit{g}[1], and \textit{g}[2]. Where \textit{g}[i] stores all elements that satisfy \textit{nums}[j] \bmod 3 = i.
 * Approach: Next, we enumerate the cases of selecting one element each from \textit{g}[a] and \textit{g}[b], where a, b \in \{0, 1, 2\}. Based on the modulo 3 results of the two selected elements, we can determine which group the third element should be selected from to ensure that the sum of the triplet is divisible by 3. Specifically, the third element should be selected from \textit{g}[c], where c = (3 - (a + b) \bmod 3) \bmod 3. For each combination of (a, b), we try to take out the largest element from both \textit{g}[a] and \textit{g}[b], then take out the largest element from \textit{g}[c], calculate the sum of these three elements, and update the answer. The time complexity is O(n \log n), where n is the length of the array \textit{nums}. The space complexity is O(n).
 * Dry Run: Input nums = [4,2,3,1]. Output 9.
 * Time Complexity: O(n \log n)
 * Space Complexity: O(n)
 */
var maximumSum = function (nums) {
  nums.sort((a, b) => a - b);
  const g = Array.from({ length: 3 }, () => []);
  for (const x of nums) {
    g[x % 3].push(x);
  }
  let ans = 0;
  for (let a = 0; a < 3; a++) {
    if (g[a].length > 0) {
      const x = g[a].pop();
      for (let b = 0; b < 3; b++) {
        if (g[b].length > 0) {
          const y = g[b].pop();
          const c = (3 - ((a + b) % 3)) % 3;
          if (g[c].length > 0) {
            const z = g[c][g[c].length - 1];
            ans = Math.max(ans, x + y + z);
          }
          g[b].push(y);
        }
      }
      g[a].push(x);
    }
  }
  return ans;
};
