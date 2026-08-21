/**
 * Power Update After K-th Largest Insertion I
 * Intuition: Maintain the k largest values in a right bucket and the rest on the left so the k-th largest is the minimum of the right bucket.
 * Approach: 1. After inserting val, rebalance two sorted lists so the right list has size k. 2. Multiply p by that k-th largest (right[0]).
 * Dry Run: Insert, pop/push between left and right until |right| = k, then pow.
 * Time Complexity: O(Q N)
 * Space Complexity: O(N + Q)
 */
var powerUpdate = function (nums, p, queries) {
  const insert = (arr, val) => {
    let lo = 0,
      hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < val) lo = mid + 1;
      else hi = mid;
    }
    arr.splice(lo, 0, val);
  };
  let l = [];
  let r = nums.slice().sort((a, b) => a - b);
  const ans = [];
  const mod = 1000000007n;
  const modPow = (base, exp) => {
    let b = BigInt(base) % mod;
    let e = BigInt(exp);
    let x = 1n;
    while (e > 0n) {
      if (e & 1n) x = (x * b) % mod;
      b = (b * b) % mod;
      e >>= 1n;
    }
    return Number(x);
  };
  for (const [val, k] of queries) {
    insert(r, val);
    insert(l, r.shift());
    while (r.length < k) r.unshift(l.pop());
    while (r.length > k) l.push(r.shift());
    l.sort((a, b) => a - b);
    r.sort((a, b) => a - b);
    p = modPow(p, r[0]);
    ans.push(p);
  }
  return ans;
};
