/**
 * Power Update After K-th Largest Insertion II
 * Intuition: Each query inserts a value then multiplies p by the current k-th largest, modulo 1e9+7.
 * Approach: 1. Keep a sorted list of all values (initial nums plus insertions). 2. After each insert, take the k-th largest (index length-k) and set p = pow(p, that, MOD). 3. Record p.
 * Dry Run: Insert into the multiset, then exponentiate p by the k-th largest.
 * Time Complexity: O(Q N)
 * Space Complexity: O(N + Q)
 */
var powerUpdate = function (nums, p, queries) {
  const sl = nums.slice().sort((a, b) => a - b);
  const mod = 1000000007n;
  const ans = [];
  const insert = (val) => {
    let lo = 0,
      hi = sl.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sl[mid] < val) lo = mid + 1;
      else hi = mid;
    }
    sl.splice(lo, 0, val);
  };
  const modPow = (base, exp) => {
    let b = BigInt(base) % mod;
    let e = BigInt(exp);
    let r = 1n;
    while (e > 0n) {
      if (e & 1n) r = (r * b) % mod;
      b = (b * b) % mod;
      e >>= 1n;
    }
    return Number(r);
  };
  for (const [val, k] of queries) {
    insert(val);
    p = modPow(p, sl[sl.length - k]);
    ans.push(p);
  }
  return ans;
};
