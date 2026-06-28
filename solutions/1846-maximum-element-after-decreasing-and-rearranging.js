/**
 * Maximum Element After Decreasing and Rearranging
 * Intuition: To maximize the final element while adhering to difference constraints, we should aim to build an increasing sequence like [1, 2, 3, ..., K]. Sorting the array allows us to greedily assign the smallest available numbers to form this sequence, minimizing unnecessary decreases and skipping elements that are too small to advance the maximum.
 * Approach: 1. Sort the input array `arr` in non-decreasing order. 2. Initialize a variable `maximumAchievable` to 1, representing the target value for the current element in our ideal sequence. 3. Iterate through the sorted array starting from the second element. 4. If the current element from the sorted array is greater than `maximumAchievable`, it means we can use this element to extend our sequence by assigning it `maximumAchievable + 1` (by possibly decreasing it). In this case, increment `maximumAchievable`. 5. The final value of `maximumAchievable` will be the maximum possible value of an element in the array after operations.
 * Dry Run: arr = [100, 1, 50, 30, 2]
 * 1. Sort arr: [1, 2, 30, 50, 100]
 * 2. maximumAchievable = 1
 * 3. iterationCounter = 1, totalLength = 5
 * 4. Loop (while iterationCounter < totalLength):
 *    - iterationCounter = 1: arrInput[1] = 2. 2 > 1 (maximumAchievable). maximumAchievable becomes 2. iterationCounter becomes 2.
 *    - iterationCounter = 2: arrInput[2] = 30. 30 > 2 (maximumAchievable). maximumAchievable becomes 3. iterationCounter becomes 3.
 *    - iterationCounter = 3: arrInput[3] = 50. 50 > 3 (maximumAchievable). maximumAchievable becomes 4. iterationCounter becomes 4.
 *    - iterationCounter = 4: arrInput[4] = 100. 100 > 4 (maximumAchievable). maximumAchievable becomes 5. iterationCounter becomes 5.
 * 5. Loop ends as iterationCounter (5) is not less than totalLength (5).
 * 6. Return maximumAchievable, which is 5.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumElementAfterDecrementingAndRearranging = function (arrInput) {
  arrInput.sort((firstValue, secondValue) => firstValue - secondValue);

  let maximumAchievable = 1;
  let iterationCounter = 1;
  let totalLength = arrInput.length;

  while (iterationCounter < totalLength) {
    if (arrInput[iterationCounter] > maximumAchievable) {
      maximumAchievable++;
    }
    iterationCounter++;
  }

  return maximumAchievable;
};
