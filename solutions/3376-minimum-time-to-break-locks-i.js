/**
 * Minimum Time to Break Locks I
 * Intuition: Energy starts at `x = 1` and grows by `K` after each lock. Time to break a lock of strength `s` is `ceil(s / x)`, so the order of locks matters and `n` is small enough to try every remaining-lock subset.
 * Approach: 1. DFS over a bitmask of broken locks. 2. Current energy is `1 + K * popcount(mask)`. 3. For each unbroken lock `i`, spend `ceil(strength[i] / x)` minutes and recurse. 4. Memoize on `mask` (energy is determined by how many locks are already broken).
 * Dry Run: strength = [3, 4, 1], K = 1.
 *   - Break 1 first: ceil(1/1)=1, x=2; then 3: ceil(3/2)=2, x=3; then 4: ceil(4/3)=2. Total 5.
 *   - Other orders are worse or equal. Answer 5.
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(2^N)
 */

var findMinimumTime = function (strength, K) {
  const lockCount = strength.length;
  const allBrokenMask = (1 << lockCount) - 1;
  const memoByMask = new Array(1 << lockCount).fill(-1);

  const dfsBreakLocks = (brokenMask) => {
    if (brokenMask === allBrokenMask) {
      return 0;
    }
    if (memoByMask[brokenMask] !== -1) {
      return memoByMask[brokenMask];
    }

    const brokenCount = brokenMask.toString(2).split("1").length - 1;
    const currentEnergy = 1 + K * brokenCount;
    let minimumMinutes = Infinity;

    for (let lockIndex = 0; lockIndex < lockCount; lockIndex++) {
      if (((brokenMask >> lockIndex) & 1) === 0) {
        const minutesForLock =
          Math.floor((strength[lockIndex] - 1) / currentEnergy) + 1;
        minimumMinutes = Math.min(
          minimumMinutes,
          minutesForLock + dfsBreakLocks(brokenMask | (1 << lockIndex))
        );
      }
    }

    memoByMask[brokenMask] = minimumMinutes;
    return minimumMinutes;
  };

  return dfsBreakLocks(0);
};
