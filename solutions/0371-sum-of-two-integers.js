/**
 * Sum Of Two Integers
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var getSum = function (a, b) {
  const currentXorSum = a ^ b;
  const nextCarry = (a & b) << 1;

  if (nextCarry === 0) {
    return currentXorSum;
  }

  return getSum(currentXorSum, nextCarry);
};