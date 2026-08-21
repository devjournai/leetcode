/**
 * Minimum Index Of A Valid Split
 * Intuition: The core idea is that both subarrays must share the same dominant element as the original array. We can first identify this global dominant element and its total count. Then, we iterate through all possible split points, keeping track of the count of the dominant element in the left subarray. The count in the right subarray can be derived from the total and left counts. For each split, we verify if the dominant element holds its majority status in both segments.
 * Approach: 1. Calculate the frequency of each number in the entire array to identify the globally dominant element. 2. Store these frequencies in a hash map (or similar structure). 3. Iterate through the frequencies to find the number that appears more than half the total array length; this is our `foundDominantElement`. 4. Initialize a counter for the `foundDominantElement` in the left subarray to zero. 5. Iterate from the first possible split index up to the second to last element (`n-2`). For each `splitIndex`: 6. If the element `nums[splitIndex]` is the `foundDominantElement`, increment its count for the left subarray. 7. Calculate the count of `foundDominantElement` in the right subarray by subtracting the left count from the total count of the `foundDominantElement`. 8. Check if the `foundDominantElement` is dominant in both the left subarray (`nums[0...splitIndex]`) and the right subarray (`nums[splitIndex+1...n-1]`) based on their respective lengths. 9. If both conditions are met, `splitIndex` is a valid split, and since we are looking for the minimum, we immediately return `splitIndex`. 10. If no valid split is found after checking all possible indices, return -1.
 * Dry Run: nums = [2,2,1,4,4,4,4,4]
 *   arrayLength = 8
 *   elementFrequency = {2: 2, 1: 1, 4: 5}
 *   foundDominantElement:
 *     - Check 2: 2 * 2 > 8 (4 > 8) is false.
 *     - Check 1: 1 * 2 > 8 (2 > 8) is false.
 *     - Check 4: 5 * 2 > 8 (10 > 8) is true. => foundDominantElement = 4
 *   totalDominantCount = 5
 *
 *   leftSubarrayDominantCount = 0
 *   splitIndex = 0: nums[0] = 2 (not 4) => leftSubarrayDominantCount = 0
 *     rightSubarrayDominantCount = 5 - 0 = 5
 *     leftSubarrayLength = 1, rightSubarrayLength = 7
 *     Left check: 0 * 2 > 1 (0 > 1) is false.
 *   splitIndex = 1: nums[1] = 2 (not 4) => leftSubarrayDominantCount = 0
 *     rightSubarrayDominantCount = 5 - 0 = 5
 *     leftSubarrayLength = 2, rightSubarrayLength = 6
 *     Left check: 0 * 2 > 2 (0 > 2) is false.
 *   splitIndex = 2: nums[2] = 1 (not 4) => leftSubarrayDominantCount = 0
 *     rightSubarrayDominantCount = 5 - 0 = 5
 *     leftSubarrayLength = 3, rightSubarrayLength = 5
 *     Left check: 0 * 2 > 3 (0 > 3) is false.
 *   splitIndex = 3: nums[3] = 4 (is 4) => leftSubarrayDominantCount = 1
 *     rightSubarrayDominantCount = 5 - 1 = 4
 *     leftSubarrayLength = 4, rightSubarrayLength = 4
 *     Left check: 1 * 2 > 4 (2 > 4) is false.
 *   splitIndex = 4: nums[4] = 4 (is 4) => leftSubarrayDominantCount = 2
 *     rightSubarrayDominantCount = 5 - 2 = 3
 *     leftSubarrayLength = 5, rightSubarrayLength = 3
 *     Left check: 2 * 2 > 5 (4 > 5) is false.
 *   splitIndex = 5: nums[5] = 4 (is 4) => leftSubarrayDominantCount = 3
 *     rightSubarrayDominantCount = 5 - 3 = 2
 *     leftSubarrayLength = 6, rightSubarrayLength = 2
 *     Left check: 3 * 2 > 6 (6 > 6) is false.
 *   splitIndex = 6: nums[6] = 4 (is 4) => leftSubarrayDominantCount = 4
 *     rightSubarrayDominantCount = 5 - 4 = 1
 *     leftSubarrayLength = 7, rightSubarrayLength = 1
 *     Left check: 4 * 2 > 7 (8 > 7) is true.
 *     Right check: 1 * 2 > 1 (2 > 1) is true.
 *     Both true! Return splitIndex = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var minimumIndex = function (nums) {
  const elementFrequency = new Map();
  const arrayLength = nums.length;

  for (const currentNumber of nums) {
    elementFrequency.set(
      currentNumber,
      (elementFrequency.get(currentNumber) || 0) + 1
    );
  }

  let foundDominantElement;
  for (const [valueKey, valueCount] of elementFrequency) {
    if (valueCount * 2 > arrayLength) {
      foundDominantElement = valueKey;
      break;
    }
  }

  let leftSubarrayDominantCount = 0;
  const totalDominantCount = elementFrequency.get(foundDominantElement);

  for (let splitIndex = 0; splitIndex < arrayLength - 1; splitIndex++) {
    if (nums[splitIndex] === foundDominantElement) {
      leftSubarrayDominantCount++;
    }

    const rightSubarrayDominantCount =
      totalDominantCount - leftSubarrayDominantCount;
    const leftSubarrayLength = splitIndex + 1;
    const rightSubarrayLength = arrayLength - leftSubarrayLength;

    if (
      leftSubarrayDominantCount * 2 > leftSubarrayLength &&
      rightSubarrayDominantCount * 2 > rightSubarrayLength
    ) {
      return splitIndex;
    }
  }

  return -1;
};
