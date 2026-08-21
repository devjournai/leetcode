/**
 * Total Hamming Distance
 * Intuition: Hamming distance is the count of bit positions that differ. Summing pairwise distances equals, per bit, (how many numbers have 1) × (how many have 0).
 * Approach: 1. For `bitPosition` 0..31, count `countOfOnes` by testing `(num >> bit) & 1`. 2. Add `countOfOnes * (n - countOfOnes)` to the total. 3. Return the sum.
 * Dry Run: nums = [4, 14, 2].
 *   - Bit 1: two 1s and one 0 → +2. Bit 2: two 1s and one 0 → +2. Bit 3: one 1 and two 0s → +2. Other bits 0. Total 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var totalHammingDistance = function (nums) {
  let sumOfAllDistances = 0;
  const arrayLength = nums.length;

  for (let bitPosition = 0; bitPosition < 32; bitPosition++) {
    let countOfOnes = 0;

    nums.forEach(function (currentNum) {
      if (((currentNum >> bitPosition) & 1) === 1) {
        countOfOnes++;
      }
    });

    const countOfZeros = arrayLength - countOfOnes;
    sumOfAllDistances += countOfOnes * countOfZeros;
  }

  return sumOfAllDistances;
};
