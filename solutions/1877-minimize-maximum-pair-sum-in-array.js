/**
 * Minimize Maximum Pair Sum in Array
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var minPairSum = function (nums) {
  nums.sort((firstElement, secondElement) => firstElement - secondElement);

  let minimizedMaxPairSum = 0;
  let startIndex = 0;
  let endIndex = nums.length - 1;

  while (startIndex < endIndex) {
    let currentPairTotal = nums[startIndex] + nums[endIndex];
    minimizedMaxPairSum = Math.max(minimizedMaxPairSum, currentPairTotal);
    startIndex++;
    endIndex--;
  }

  return minimizedMaxPairSum;
};