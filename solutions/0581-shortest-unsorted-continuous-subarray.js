/**
 * Shortest Unsorted Continuous Subarray
 * Intuition: The unsorted window is the shortest slice that, if sorted, would sort the whole array. Its right end is the last index that falls below the running max from the left; its left end is the first index that rises above the running min from the right.
 * Approach: 1. If `arrayLength <= 1`, return 0. 2. Scan with `advancePointer`, tracking `currentMaximum`; when `nums[advancePointer] < currentMaximum`, set `rightmostMisplaced`. 3. Scan backward with `retreatPointer`, tracking `currentMinimum`; when `nums[retreatPointer] > currentMinimum`, set `leftmostMisplaced`. 4. If `rightmostMisplaced === -1` the array is sorted; else return `rightmostMisplaced - leftmostMisplaced + 1`.
 * Dry Run: nums = [2,6,4,8,10,9,15].
 *   - Left: max 2,6; 4<6 → right=2; max 8,10; 9<10 → right=5. Right: min 15,9; 10>9 → left=4; 8>9 → left=3; 4>9 → left=2; 6>4 → left=1. Length 5-1+1=5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findUnsortedSubarray = function (nums) {
  const arrayLength = nums.length;

  if (arrayLength <= 1) {
    return 0;
  }

  let currentMaximum = nums[0];
  let rightmostMisplaced = -1;

  for (let advancePointer = 1; advancePointer < arrayLength; ++advancePointer) {
    if (nums[advancePointer] < currentMaximum) {
      rightmostMisplaced = advancePointer;
    } else {
      currentMaximum = nums[advancePointer];
    }
  }

  let currentMinimum = nums[arrayLength - 1];
  let leftmostMisplaced = arrayLength;

  for (
    let retreatPointer = arrayLength - 2;
    retreatPointer >= 0;
    --retreatPointer
  ) {
    if (nums[retreatPointer] > currentMinimum) {
      leftmostMisplaced = retreatPointer;
    } else {
      currentMinimum = nums[retreatPointer];
    }
  }

  if (rightmostMisplaced === -1) {
    return 0;
  }

  return rightmostMisplaced - leftmostMisplaced + 1;
};
