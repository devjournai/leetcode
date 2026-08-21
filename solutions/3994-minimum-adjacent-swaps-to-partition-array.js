/**
 * Minimum Adjacent Swaps to Partition Array
 * Intuition: Classify each element as L (<a), M ([a,b]), R (>b). We need some order L* M* R* with min adjacent swaps, i.e. min inversions to a target assignment of the multiset.
 * Approach: Count inversions to the stable partition: assign the nL smallest-index L items to the left, etc. Equivalent: each L should move left of all M,R that currently precede wrongly. Fenwick inversions between classes.
 * Dry Run: Input: nums=[1,3,2,4,5,6], a=3,b=4. Output: 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSwaps = function (nums, a, b) {
  const MOD = 1000000007;
  const type = (x) => (x < a ? 0 : x <= b ? 1 : 2);
  const arr = nums.map(type);
  let ans = 0,
    c0 = 0,
    c1 = 0;
  for (const t of arr) {
    if (t === 0) c0++;
    else if (t === 1) {
      ans = (ans + c0) % MOD;
      c1++;
    } else {
      ans = (ans + c0 + c1) % MOD;
    }
  }
  const inv = (types) => {
    let res = 0,
      z = 0,
      o = 0;
    for (const t of types) {
      if (t === 0) z++;
      else if (t === 1) {
        res += z;
        o++;
      } else res += z + o;
    }
    return res;
  };
  return inv(arr);
};
