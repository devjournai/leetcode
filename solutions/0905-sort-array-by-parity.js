/**
 * Sort Array By Parity
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sortArrayByParity = function (nums) {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;

  while (leftPointer < rightPointer) {
    if (nums[leftPointer] % 2 === 0) {
      leftPointer++;
    } else {
      if (nums[rightPointer] % 2 !== 0) {
        rightPointer--;
      } else {
        let temporaryStore = nums[leftPointer];
        nums[leftPointer] = nums[rightPointer];
        nums[rightPointer] = temporaryStore;
        leftPointer++;
        rightPointer--;
      }
    }
  }
  return nums;
};
