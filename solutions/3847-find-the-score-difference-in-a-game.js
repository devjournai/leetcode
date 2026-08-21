/**
 * Find the Score Difference in a Game
 * Intuition: We use a variable $k$ to represent the role of the current player. Initially $k = 1$, when $k = 1$ it means the first player is the active player, and when $k = -1$ it means the second player is the active player. For each game, we update the value of $k$ according to the problem description, and add the score of the current game multiplied by $k$ to the answer. Finally, we return the answer. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(1)$.
 * Approach: We use a variable $k$ to represent the role of the current player. Initially $k = 1$, when $k = 1$ it means the first player is the active player, and when $k = -1$ it means the second player is the active player. For each game, we update the value of $k$ according to the problem description, and add the score of the current game multiplied by $k$ to the answer. Finally, we return the answer. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [1,2,3] => Output: 0
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var scoreDifference = function (nums) {
  let ans = 0;
  let k = 1;

  nums.forEach((x, i) => {
    if (x % 2 !== 0) {
      k = -k;
    }
    if (i % 6 === 5) {
      k = -k;
    }
    ans += k * x;
  });

  return ans;
};
