/**
 * Chalkboard Xor Game
 * Intuition: Alice wins if the total XOR is already 0, or if she can always force that when the length is even (no single erase can be the only losing move).
 * Approach: 1. XOR all `nums` into `computedXorSum`. 2. If 0, return true. 3. Else return whether `nums.length` is even.
 * Dry Run: nums = [1,1,2]. XOR = 2 ≠ 0, length 3 odd → false.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var xorGame = function (nums) {
  let computedXorSum = 0;
  let arrayElementIndex = 0;

  while (arrayElementIndex < nums.length) {
    computedXorSum ^= nums[arrayElementIndex];
    arrayElementIndex++;
  }

  if (computedXorSum === 0) {
    return true;
  }

  let currentArrayLength = nums.length;
  let lengthIsEven = currentArrayLength % 2 === 0;

  return lengthIsEven;
};
