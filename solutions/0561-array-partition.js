/**
 * Array Partition
 * Intuition: Pairing sorted neighbors maximizes the sum of mins: each pair's min is the smaller of two closest values, so large numbers are not wasted as mins of even larger ones.
 * Approach: 1. Sort `nums` ascending. 2. Add every even-index value after sorting. 3. Return that sum.
 * Dry Run: nums = [1,4,3,2] → sorted [1,2,3,4].
 *   - Add indices 0 and 2: 1+3 = 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var arrayPairSum = function (nums) {
  let numbersSorted = nums.sort(
    (firstElement, secondElement) => firstElement - secondElement
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
