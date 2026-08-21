/**
 * Sum Of Beauty In The Array
 * Intuition: To efficiently determine if an element is strictly greater than all elements to its left and strictly less than all elements to its right, precompute prefix maximums and suffix minimums.
 * Approach: 1. Initialize a variable to accumulate total beauty. 2. Create an array `maximumLeft` where `maximumLeft[i]` stores the maximum value among `nums[0]...nums[i-1]`. 3. Create an array `minimumRight` where `minimumRight[i]` stores the minimum value among `nums[i+1]...nums[n-1]`. 4. Iterate from index 1 to `nums.length - 2`. For each `nums[i]`: 5. Check if `maximumLeft[i] < nums[i]` and `nums[i] < minimumRight[i]`. If true, add 2 to total beauty. 6. Else, check if `nums[i-1] < nums[i]` and `nums[i] < nums[i+1]`. If true, add 1 to total beauty. 7. Return the accumulated total beauty.
 * Dry Run: nums = [1, 2, 3, 4, 5]
 *   arrayLength = 5
 *   totalBeauty = 0
 *
 *   maximumLeft initialization:
 *     maximumLeft = [1, 1, 2, 3, 4] (maximumLeft[i] is max of nums[0]..nums[i-1])
 *
 *   minimumRight initialization:
 *     minimumRight = [2, 3, 4, 5, 5] (minimumRight[i] is min of nums[i+1]..nums[n-1])
 *
 *   Calculate beauty (midIndex from 1 to 3):
 *   midIndex = 1 (nums[1] = 2):
 *     currentNum = 2
 *     Beauty 2 check: (maximumLeft[1] < 2 && 2 < minimumRight[1]) -> (1 < 2 && 2 < 3) -> true.
 *     totalBeauty = 0 + 2 = 2.
 *
 *   midIndex = 2 (nums[2] = 3):
 *     currentNum = 3
 *     Beauty 2 check: (maximumLeft[2] < 3 && 3 < minimumRight[2]) -> (2 < 3 && 3 < 4) -> true.
 *     totalBeauty = 2 + 2 = 4.
 *
 *   midIndex = 3 (nums[3] = 4):
 *     currentNum = 4
 *     Beauty 2 check: (maximumLeft[3] < 4 && 4 < minimumRight[3]) -> (3 < 4 && 4 < 5) -> true.
 *     totalBeauty = 4 + 2 = 6.
 *
 *   Return 6.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var sumOfBeauties = function (nums) {
  const arrayLength = nums.length;
  let totalBeauty = 0;

  const maximumLeft = new Array(arrayLength);
  maximumLeft[0] = nums[0];
  for (let firstIndex = 1; firstIndex < arrayLength; firstIndex++) {
    maximumLeft[firstIndex] = Math.max(
      maximumLeft[firstIndex - 1],
      nums[firstIndex - 1]
    );
  }

  const minimumRight = new Array(arrayLength);
  minimumRight[arrayLength - 1] = nums[arrayLength - 1];
  for (let secondIndex = arrayLength - 2; secondIndex >= 0; secondIndex--) {
    minimumRight[secondIndex] = Math.min(
      minimumRight[secondIndex + 1],
      nums[secondIndex + 1]
    );
  }

  for (let midIndex = 1; midIndex < arrayLength - 1; midIndex++) {
    const currentNum = nums[midIndex];
    if (
      maximumLeft[midIndex] < currentNum &&
      currentNum < minimumRight[midIndex]
    ) {
      totalBeauty += 2;
    } else if (
      nums[midIndex - 1] < currentNum &&
      currentNum < nums[midIndex + 1]
    ) {
      totalBeauty += 1;
    }
  }

  return totalBeauty;
};
