/**
 * Single Number III
 * Intuition: XOR of the whole array is `a XOR b` for the two unique numbers. The lowest set bit of that XOR splits the array into two groups, each containing one unique; XOR inside a group isolates it.
 * Approach: 1. XOR all nums into `xorSum`. 2. `differentiatingBit = xorSum & -xorSum`. 3. XOR nums with that bit set into `firstUnique`, the rest into `secondUnique`. 4. Return those two values.
 * Dry Run: nums = [1,2,1,3,2,5].
 *   - xorSum = 3^5 = 6 (bit 2). Group bit2: 2,3,2 → 3. Other group: 1,1,5 → 5. Return [3, 5].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var singleNumber = function (nums) {
  let xorSum = 0;
  for (let currentNum of nums) {
    xorSum ^= currentNum;
  }

  let differentiatingBit = xorSum & -xorSum;

  let firstUnique = 0;
  let secondUnique = 0;

  for (let numberInArray of nums) {
    if ((numberInArray & differentiatingBit) !== 0) {
      firstUnique ^= numberInArray;
    } else {
      secondUnique ^= numberInArray;
    }
  }

  return [firstUnique, secondUnique];
};
