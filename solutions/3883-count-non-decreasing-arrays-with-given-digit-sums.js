/**
 * Count Non Decreasing Arrays With Given Digit Sums
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: digitSum = [25,1] => Output: 6
 * Time Complexity: O(N * 5000)
 * Space Complexity: O(5000)
 */
var countValidArrays = function (digitSum) {
  const MOD = 1000000007;
  const bySum = Array.from({ length: 51 }, () => []);
  const dsum = (x) => {
    let s = 0;
    while (x > 0) {
      s += x % 10;
      x = Math.floor(x / 10);
    }
    return s;
  };
  for (let x = 0; x <= 5000; x++) {
    const s = dsum(x);
    if (s <= 50) bySum[s].push(x);
  }
  const n = digitSum.length;
  if (bySum[digitSum[0]].length === 0) return 0;
  let prev = bySum[digitSum[0]].map(() => 1);
  for (let i = 1; i < n; i++) {
    const curList = bySum[digitSum[i]];
    const prevList = bySum[digitSum[i - 1]];
    if (curList.length === 0) return 0;
    const pref = new Array(prev.length + 1).fill(0);
    for (let j = 0; j < prev.length; j++)
      pref[j + 1] = (pref[j] + prev[j]) % MOD;
    const cur = new Array(curList.length).fill(0);
    let p = 0;
    for (let j = 0; j < curList.length; j++) {
      while (p < prevList.length && prevList[p] <= curList[j]) p++;
      cur[j] = pref[p];
    }
    prev = cur;
  }
  let ans = 0;
  for (const x of prev) ans = (ans + x) % MOD;
  return ans;
};
