/**
 * Two Sum II Input Array Is Sorted
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var twoSum = function (numbers, target) {
  let leftPointer = 0;
  let rightPointer = numbers.length - 1;

  while (leftPointer < rightPointer) {
    let currentSumValue = numbers[leftPointer] + numbers[rightPointer];

    if (currentSumValue === target) {
      let firstIndexResult = leftPointer + 1;
      let secondIndexResult = rightPointer + 1;
      return [firstIndexResult, secondIndexResult];
    } else if (currentSumValue < target) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }
};
