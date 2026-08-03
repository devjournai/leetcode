/**
 * Sum Of Values At Indices With K Set Bits
 * Intuition: The problem requires summing elements whose indices have a specific number of set bits in their binary representation. We can iterate through each index, efficiently count its set bits using bit manipulation, and add the corresponding array value if the count matches the target.
 * Approach: 1. Initialize a cumulative sum `totalSum` to zero. 2. Iterate through the array indices using a `while` loop, from `currentPosition = 0` up to `nums.length - 1`. 3. For each `currentPosition`, count its set bits using Brian Kernighan's algorithm (repeatedly `tempNumber &= (tempNumber - 1)` until `tempNumber` becomes zero, incrementing `setBitsCount` each time). 4. If the `setBitsCount` equals `k`, add `nums[currentPosition]` to `totalSum`. 5. After the iteration, return `totalSum`.
 * Dry Run: nums = [4, 3, 2, 1], k = 2
 *   1. totalSum = 0, currentPosition = 0
 *   2. currentPosition = 0 (binary 0): setBitsCount = 0. Not (0 === 2).
 *   3. currentPosition = 1 (binary 1): setBitsCount = 1. Not (1 === 2).
 *   4. currentPosition = 2 (binary 10): setBitsCount = 1. Not (1 === 2).
 *   5. currentPosition = 3 (binary 11):
 *      - tempNumber = 3 (11) -> 2 (10), setBitsCount = 1
 *      - tempNumber = 2 (10) -> 0 (0), setBitsCount = 2
 *      (2 === 2). totalSum = 0 + nums[3] = 0 + 1 = 1.
 *   6. Loop ends.
 *   7. Return totalSum = 1.
 * Time Complexity: O(N * log(max_index))
 * Space Complexity: O(1)
 */
var sumIndicesWithKSetBits = function (nums, k) {
  let totalSum = 0;
  let currentPosition = 0;

  while (currentPosition < nums.length) {
    let setBitsCount = 0;
    let tempNumber = currentPosition;

    while (tempNumber > 0) {
      tempNumber &= tempNumber - 1;
      setBitsCount++;
    }

    if (setBitsCount === k) {
      totalSum += nums[currentPosition];
    }
    currentPosition++;
  }

  return totalSum;
};
