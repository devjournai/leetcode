/**
 * XOR After Range Multiplication Queries I
 * Time Complexity: O(q * n)
 * Space Complexity: O(1)
 */
var xorAfterQueries = function (nums, queries) {
  const MOD = 1000000007;

  for (const query of queries) {
    const li = query[0];
    const ri = query[1];
    const ki = query[2];
    const vi = query[3];
    for (let idx = li; idx <= ri; idx += ki) {
      nums[idx] = (nums[idx] * vi) % MOD;
    }
  }

  let xorSum = 0;
  for (const num of nums) {
    xorSum ^= num;
  }

  return xorSum;
};
