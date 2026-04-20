/**
 * Single Number III
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
