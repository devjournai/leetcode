/**
 * Minimum Elements To Add To Form A Given Sum
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minElements = function (nums, limit, goal) {
  const initialArraySum = nums.reduce(
    (currentTotal, numberValue) => currentTotal + numberValue,
    0,
  );
  const neededDifference = goal - initialArraySum;
  const absoluteDifference = Math.abs(neededDifference);
  const countOfElements = Math.ceil(absoluteDifference / limit);
  return countOfElements;
};
