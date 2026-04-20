/**
 * Optimal Division
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var optimalDivision = function (nums) {
  let arrayLength = nums.length;

  if (arrayLength === 1) {
    return nums[0].toString();
  }

  if (arrayLength === 2) {
    let firstNum = nums[0];
    let secondNum = nums[1];
    return `${firstNum}/${secondNum}`;
  }

  let initialNumber = nums[0];
  let remainingNumbers = nums.slice(1);
  let joinedRemaining = remainingNumbers.join("/");

  return `${initialNumber}/(${joinedRemaining})`;
};
