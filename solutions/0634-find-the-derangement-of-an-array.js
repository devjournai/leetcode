/**
 * Find The Derangement Of An Array
 * Intuition: !n = (n-1) * (!(n-1) + !(n-2)): n swaps with i, or a 2-cycle with n. Roll two previous values modulo 10^9+7.
 * Approach: 1. Return 0 for n=1 and 1 for n=2. 2. Hold `derangementBeforeLast` = ! (n-2) and `derangementLast` = !(n-1). 3. For `currentCount` from 3 to n, next = (currentCount-1) * (last + beforeLast) % MOD, then shift. 4. Return `derangementLast`.
 * Dry Run: n = 4.
 *   - n=3: 2*(1+0)=2. n=4: 3*(2+1)=9. Return 9.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findDerangement = function (n) {
  const moduloConstant = 1000000007;

  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }

  let derangementBeforeLast = 0;
  let derangementLast = 1;

  for (let currentCount = 3; currentCount <= n; currentCount++) {
    const nextDerangement =
      ((currentCount - 1) * (derangementLast + derangementBeforeLast)) %
      moduloConstant;
    derangementBeforeLast = derangementLast;
    derangementLast = nextDerangement;
  }

  return derangementLast;
};
