/**
 * Maximum Xor Of Two Numbers In An Array
 * Intuition: Build the max XOR bit by bit from 31 to 0. If some two prefixes in `prefixStore` XOR to `potentialNextMax`, that bit can be set.
 * Approach: 1. Grow `runningBitmask` to include bit i. 2. Store each `num & mask`. 3. For `potentialNextMax = maxSoFar | (1<<i)`, if any prefix `p` has `p ^ potentialNextMax` also in the set, accept that bit. 4. Return `maximumXorValue`.
 * Dry Run: nums = [3,10,5,25,2,8].
 *   - High bits fail until 16 is achievable (5^25=28, 25^8=17, …). Final max is 28 (5 XOR 25).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findMaximumXOR = function (nums) {
  let maximumXorValue = 0;

  for (
    let currentBitIndex = 31, runningBitmask = 0;
    currentBitIndex >= 0;
    currentBitIndex--
  ) {
    runningBitmask |= 1 << currentBitIndex;

    const prefixStore = new Set();
    for (const individualNumber of nums) {
      prefixStore.add(individualNumber & runningBitmask);
    }

    const potentialNextMax = maximumXorValue | (1 << currentBitIndex);

    for (const storedPrefix of prefixStore) {
      if (prefixStore.has(storedPrefix ^ potentialNextMax)) {
        maximumXorValue = potentialNextMax;
        break;
      }
    }
  }

  return maximumXorValue;
};
