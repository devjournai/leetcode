/**
 * Permutations III
 * Intuition: Generate permutations of 1..n where no two adjacent numbers share the same parity.
 * Approach: 1. Backtrack over unused numbers. 2. Skip a candidate when it has the same parity as the last chosen number. 3. Record a permutation when its length is n.
 * Dry Run: n = 3. Start 1 then 2 then 3; start 2 then 1 then skipped 3 (odd after odd) so 2,3,1. Valid: [1,2,3], [2,1,2 no], [2,1,3], [3,2,1].
 * Time Complexity: O(N * N!)
 * Space Complexity: O(N * N!)
 */

var permute = function (n) {
  const answer = [];
  const used = new Array(n + 1).fill(false);

  const dfs = (path) => {
    if (path.length === n) {
      answer.push([...path]);
      return;
    }
    for (let number = 1; number <= n; number++) {
      if (used[number]) {
        continue;
      }
      if (path.length > 0 && path[path.length - 1] % 2 === number % 2) {
        continue;
      }
      used[number] = true;
      path.push(number);
      dfs(path);
      path.pop();
      used[number] = false;
    }
  };

  dfs([]);
  return answer;
};
