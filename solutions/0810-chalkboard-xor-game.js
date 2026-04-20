/**
 * Chalkboard Xor Game
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
