/**
 * Taking Maximum Energy From The Mystic Dungeon
 * Intuition: From index i you jump by k repeatedly, so energy of a start is the suffix sum of every k-th element. Compute those suffix sums from the right.
 * Approach: 1. Iterate i from n-1 down to 0. 2. If i+k exists, energy[i] += energy[i+k]. 3. Track the maximum over all starting indices.
 * Dry Run:
 *   energy = [5,2,-10,-5,1], k = 3. Start 1: 2 + 1 = 3 is best.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumEnergy = function (energy, k) {
  let maxEnergy = -Infinity;
  for (let index = energy.length - 1; index >= 0; index--) {
    if (index + k < energy.length) {
      energy[index] += energy[index + k];
    }
    maxEnergy = Math.max(maxEnergy, energy[index]);
  }
  return maxEnergy;
};
