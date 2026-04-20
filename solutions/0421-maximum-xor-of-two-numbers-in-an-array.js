/**
 * Maximum Xor Of Two Numbers In An Array
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var findMaximumXOR = function (nums) {
  let maximumXorValue = 0;

  for (let currentBitIndex = 31, runningBitmask = 0; currentBitIndex >= 0; currentBitIndex--) {
    runningBitmask |= (1 << currentBitIndex);

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