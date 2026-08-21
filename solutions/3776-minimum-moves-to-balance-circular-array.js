/**
 * Minimum Moves to Balance Circular Array
 * Intuition: We first calculate the sum of the array \textit{balance}. If the sum is less than 0, it is impossible to make all balances non-negative, so we directly return -1. Then we find the minimum balance in the array and its index. If the minimum balance is greater than or equal to 0, all balances are already non-negative, so we directly return 0.
 * Approach: Next, we calculate the amount of balance needed \textit{need}, which is the opposite of the minimum balance. Then starting from the index of the minimum balance, we traverse the array to the left and right, taking as much balance as possible from each position to fill \textit{need}, and calculate the number of moves. We continue until \textit{need} becomes 0, and return the total number of moves. The time complexity is O(n), where n is the length of the array \textit{balance}. The space complexity is O(1).
 * Dry Run: Input balance = [5,1,-4]. Output 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minMoves = function (balance) {
  const sum = balance.reduce((a, b) => a + b, 0);
  if (sum < 0) {
    return -1;
  }

  const n = balance.length;
  let mn = balance[0],
    idx = 0;
  for (let i = 1; i < n; i++) {
    if (balance[i] < mn) {
      mn = balance[i];
      idx = i;
    }
  }

  if (mn >= 0) {
    return 0;
  }

  let need = -mn;
  let ans = 0;

  for (let j = 1; j < n; j++) {
    const a = balance[(idx - j + n) % n];
    const b = balance[(idx + j) % n];

    const c1 = Math.min(a, need);
    need -= c1;
    ans += c1 * j;

    const c2 = Math.min(b, need);
    need -= c2;
    ans += c2 * j;
  }

  return ans;
};
