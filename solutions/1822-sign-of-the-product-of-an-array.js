/**
 * Sign Of The Product Of An Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var arraySign = function (nums) {
  let totalNegativeNumbers = 0;

  for (let iterationIndex = 0; iterationIndex < nums.length; iterationIndex++) {
    let numberToCheck = nums[iterationIndex];
    if (numberToCheck === 0) {
      return 0;
    }
    if (numberToCheck < 0) {
      totalNegativeNumbers++;
    }
  }

  return totalNegativeNumbers % 2 === 0 ? 1 : -1;
};
