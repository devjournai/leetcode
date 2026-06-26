/**
 * Maximum Sum Of Distinct Subarrays With Length K
 * Intuition: Utilize a sliding window to efficiently process subarrays of length K, tracking element distinctness and sum within the current window.
 * Approach: 1. Initialize `resultMaximumSum` to 0, `currentSumValue` to 0, `leftBoundary` to 0, and a `frequencyMap` to store counts of numbers in the current window. 2. Iterate with `rightBoundary` from 0 to `nums.length - 1`. 3. For each `nums[rightBoundary]`, add it to `currentSumValue` and increment its frequency in `frequencyMap`. 4. When the current window size (`rightBoundary - leftBoundary + 1`) equals `k`: a. Check if `frequencyMap.size` equals `k`. If it does, update `resultMaximumSum = Math.max(resultMaximumSum, currentSumValue)`. b. Subtract `nums[leftBoundary]` from `currentSumValue`. c. Decrement the frequency of `nums[leftBoundary]` in `frequencyMap`. If its frequency becomes 0, remove it from the map. d. Increment `leftBoundary`. 5. After the loop completes, return `resultMaximumSum`.
 * Dry Run: nums = [1,5,4,2,9,9,7], k = 3
 *   Initialize: resultMaximumSum = 0, currentSumValue = 0, frequencyMap = new Map(), leftBoundary = 0
 *   rightBoundary = 0 (num=1): currentSumValue = 1, frequencyMap={1:1}
 *   rightBoundary = 1 (num=5): currentSumValue = 6, frequencyMap={1:1, 5:1}
 *   rightBoundary = 2 (num=4): currentSumValue = 10, frequencyMap={1:1, 5:1, 4:1}. Window size is 3 (==k). frequencyMap.size (3) == k (3). resultMaximumSum = max(0, 10) = 10.
 *     elementToRemove = nums[leftBoundary] (1). currentSumValue = 10 - 1 = 9. frequencyMap={5:1, 4:1} (1 removed). leftBoundary = 1.
 *   rightBoundary = 3 (num=2): currentSumValue = 9 + 2 = 11, frequencyMap={5:1, 4:1, 2:1}. Window size is 3 (==k). frequencyMap.size (3) == k (3). resultMaximumSum = max(10, 11) = 11.
 *     elementToRemove = nums[leftBoundary] (5). currentSumValue = 11 - 5 = 6. frequencyMap={4:1, 2:1}. leftBoundary = 2.
 *   rightBoundary = 4 (num=9): currentSumValue = 6 + 9 = 15, frequencyMap={4:1, 2:1, 9:1}. Window size is 3 (==k). frequencyMap.size (3) == k (3). resultMaximumSum = max(11, 15) = 15.
 *     elementToRemove = nums[leftBoundary] (4). currentSumValue = 15 - 4 = 11. frequencyMap={2:1, 9:1}. leftBoundary = 3.
 *   rightBoundary = 5 (num=9): currentSumValue = 11 + 9 = 20, frequencyMap={2:1, 9:2}. Window size is 3 (==k). frequencyMap.size (2) != k (3).
 *     elementToRemove = nums[leftBoundary] (2). currentSumValue = 20 - 2 = 18. frequencyMap={9:2}. leftBoundary = 4.
 *   rightBoundary = 6 (num=7): currentSumValue = 18 + 7 = 25, frequencyMap={9:2, 7:1}. Window size is 3 (==k). frequencyMap.size (2) != k (3).
 *     elementToRemove = nums[leftBoundary] (9). currentSumValue = 25 - 9 = 16. frequencyMap={9:1, 7:1}. leftBoundary = 5.
 *   End loop. Return resultMaximumSum = 15.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var maximumSubarraySum = function (nums, k) {
  let resultMaximumSum = 0;
  const frequencyMap = new Map();
  let currentSumValue = 0;
  let leftBoundary = 0;

  for (let rightBoundary = 0; rightBoundary < nums.length; rightBoundary++) {
    const elementToAdd = nums[rightBoundary];
    currentSumValue += elementToAdd;
    frequencyMap.set(elementToAdd, (frequencyMap.get(elementToAdd) || 0) + 1);

    if (rightBoundary - leftBoundary + 1 === k) {
      if (frequencyMap.size === k) {
        resultMaximumSum = Math.max(resultMaximumSum, currentSumValue);
      }

      const elementToRemove = nums[leftBoundary];
      currentSumValue -= elementToRemove;
      const elementNewFrequency = frequencyMap.get(elementToRemove) - 1;
      frequencyMap.set(elementToRemove, elementNewFrequency);

      if (elementNewFrequency === 0) {
        frequencyMap.delete(elementToRemove);
      }
      leftBoundary++;
    }
  }

  return resultMaximumSum;
};
