/**
 * Two Sum II Input Array Is Sorted
 * Intuition: In a sorted array, a too-small pair needs a larger left value and a too-large pair needs a smaller right value, so two pointers close in until they hit `target`.
 * Approach: 1. `leftPointer = 0`, `rightPointer = numbers.length - 1`. 2. While left < right, sum the two values. 3. If equal, return 1-based indices. 4. If sum < target, increment left; else decrement right.
 * Dry Run: numbers = [2,7,11,15], target = 9
 * 2+15=17 too big → right=11; 2+11=13 too big → right=7; 2+7=9 → [1,2]
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
