/**
 * Array Partition
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var arrayPairSum = function (nums) {
  let numbersSorted = nums.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );
  let accumulatedSum = 0;
  for (
    let currentPosition = 0;
    currentPosition < numbersSorted.length;
    currentPosition += 2
  ) {
    accumulatedSum += numbersSorted[currentPosition];
  }
  return accumulatedSum;
};
