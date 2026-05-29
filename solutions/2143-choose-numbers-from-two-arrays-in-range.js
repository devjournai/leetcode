/**
 * Choose Numbers From Two Arrays In Range
 * Intuition: This problem requires counting subranges where selected numbers balance out, and the specific choices within the subrange matter. This points to a dynamic programming approach where the state captures the balance and the count of ways to achieve it for subranges ending at the current index.
 * Approach: 1. Initialize a dynamic programming map `dpMapPrevious` to store (balance_difference, count_of_ways) for subranges ending at `i-1`.
 * 2. Iterate through the input arrays `nums1` and `nums2` from `currentIndex = 0` to `n-1`.
 * 3. For each `currentIndex`, create a new map `dpMapCurrent` for subranges ending at `currentIndex`.
 * 4. Populate `dpMapCurrent` with new single-element subranges: add `(nums1[currentIndex], 1)` and `(-nums2[currentIndex], 1)`.
 * 5. Extend existing subranges: Iterate through each `(prevBalance, prevCount)` pair in `dpMapPrevious`. For each pair, add `(prevBalance + nums1[currentIndex], prevCount)` and `(prevBalance - nums2[currentIndex], prevCount)` to `dpMapCurrent`.
 * 6. After populating `dpMapCurrent`, apply the modulo operation to all counts in `dpMapCurrent`.
 * 7. Add `dpMapCurrent.get(0)` (if it exists) to the `totalBalancedRanges` result, taking modulo.
 * 8. Update `dpMapPrevious` to `dpMapCurrent` for the next iteration.
 * 9. Return `totalBalancedRanges`.
 * Dry Run: nums1 = [1,2], nums2 = [2,1]
 * MOD = 1e9 + 7, nLength = 2
 * dpMapPrevious = new Map(), totalBalancedRanges = 0
 *
 * currentIndex = 0: currentNum1 = 1, currentNum2 = 2
 *   dpMapCurrent = new Map()
 *   - Add single-element ranges: dpMapCurrent.set(1, 1), dpMapCurrent.set(-2, 1)
 *     (dpMapCurrent: {1:1, -2:1})
 *   - Extend from dpMapPrevious (empty): no operations.
 *   - Apply modulo: (dpMapCurrent values remain 1)
 *   - countForZeroBalance = dpMapCurrent.get(0) || 0 = 0. totalBalancedRanges = (0 + 0) % MOD = 0.
 *   - dpMapPrevious = {1:1, -2:1}
 *
 * currentIndex = 1: currentNum1 = 2, currentNum2 = 1
 *   dpMapCurrent = new Map()
 *   - Add single-element ranges: dpMapCurrent.set(2, 1), dpMapCurrent.set(-1, 1)
 *     (dpMapCurrent: {2:1, -1:1})
 *   - Extend from dpMapPrevious = {1:1, -2:1}:
 *     - For prevBalanceKey = 1, prevCountValue = 1:
 *       - Extend with currentNum1: new balance = 1+2=3. dpMapCurrent.set(3, (0||0)+1 = 1)
 *       - Extend with currentNum2: new balance = 1-1=0. dpMapCurrent.set(0, (0||0)+1 = 1)
 *       (dpMapCurrent: {2:1, -1:1, 3:1, 0:1})
 *     - For prevBalanceKey = -2, prevCountValue = 1:
 *       - Extend with currentNum1: new balance = -2+2=0. dpMapCurrent.set(0, (1||0)+1 = 2)
 *       - Extend with currentNum2: new balance = -2-1=-3. dpMapCurrent.set(-3, (0||0)+1 = 1)
 *       (dpMapCurrent: {2:1, -1:1, 3:1, 0:2, -3:1})
 *   - Apply modulo: (dpMapCurrent values remain unchanged as they are small)
 *   - countForZeroBalance = dpMapCurrent.get(0) || 0 = 2. totalBalancedRanges = (0 + 2) % MOD = 2.
 *   - dpMapPrevious = {2:1, -1:1, 3:1, 0:2, -3:1}
 *
 * Loop ends. Return totalBalancedRanges = 2.
 * Time Complexity: O(n * MaxPossibleBalanceDiff)
 * Space Complexity: O(MaxPossibleBalanceDiff) = O(n * max(nums[i])). O(500 * 1000) = O(5 * 10^5)
 */
var countSubranges = function (nums1, nums2) {
  const MODULUS = 1e9 + 7;
  const nLength = nums1.length;
  let dpMapPrevious = new Map();
  let totalBalancedRanges = 0;

  for (let currentIndex = 0; currentIndex < nLength; currentIndex++) {
    const currentNum1 = nums1[currentIndex];
    const currentNum2 = nums2[currentIndex];
    const dpMapCurrent = new Map();

    const balanceCurrentNum1 = currentNum1;
    const countCurrentNum1 = (dpMapCurrent.get(balanceCurrentNum1) || 0) + 1;
    dpMapCurrent.set(balanceCurrentNum1, countCurrentNum1);

    const balanceCurrentNum2 = -currentNum2;
    const countCurrentNum2 = (dpMapCurrent.get(balanceCurrentNum2) || 0) + 1;
    dpMapCurrent.set(balanceCurrentNum2, countCurrentNum2);

    const prevBalanceKeysIterator = dpMapPrevious.keys();
    const prevCountValuesIterator = dpMapPrevious.values();
    let nextPrevKey = prevBalanceKeysIterator.next();
    let nextPrevValue = prevCountValuesIterator.next();

    while (!nextPrevKey.done) {
      const foundPrevBalance = nextPrevKey.value;
      const foundPrevCount = nextPrevValue.value;

      const extendedBalanceOne = foundPrevBalance + currentNum1;
      const extendedCountOne =
        (dpMapCurrent.get(extendedBalanceOne) || 0) + foundPrevCount;
      dpMapCurrent.set(extendedBalanceOne, extendedCountOne);

      const extendedBalanceTwo = foundPrevBalance - currentNum2;
      const extendedCountTwo =
        (dpMapCurrent.get(extendedBalanceTwo) || 0) + foundPrevCount;
      dpMapCurrent.set(extendedBalanceTwo, extendedCountTwo);

      nextPrevKey = prevBalanceKeysIterator.next();
      nextPrevValue = prevCountValuesIterator.next();
    }

    const currentMapEntriesIterator = dpMapCurrent.entries();
    let nextMapEntry = currentMapEntriesIterator.next();

    while (!nextMapEntry.done) {
      const [entryKeyMod, entryValueMod] = nextMapEntry.value;
      dpMapCurrent.set(entryKeyMod, entryValueMod % MODULUS);
      nextMapEntry = currentMapEntriesIterator.next();
    }

    const countForZeroBalance = dpMapCurrent.get(0) || 0;
    totalBalancedRanges = (totalBalancedRanges + countForZeroBalance) % MODULUS;

    dpMapPrevious = dpMapCurrent;
  }

  return totalBalancedRanges;
};
