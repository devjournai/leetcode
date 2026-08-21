/**
 * Removing Minimum And Maximum From Array
 * Intuition: There are three fundamental strategies to remove both the minimum and maximum elements: remove both from the front, remove both from the back, or remove one from the front and the other from the back. The solution involves calculating the cost for each strategy and returning the minimum.
 * Approach: 1. Iterate through the array once to find the indices of the absolute minimum and maximum values. 2. Determine which of these two indices is closer to the beginning of the array (leftmost affected index) and which is closer to the end (rightmost affected index). 3. Calculate the number of deletions required for three scenarios: a) Removing all elements up to and including the rightmost affected element from the front. b) Removing all elements from and including the leftmost affected element from the back. c) Removing the leftmost affected element from the front and the rightmost affected element from the back. 4. Return the minimum of these three calculated deletion counts.
 * Dry Run: nums = [2,10,7,5,4,1,8,6]
 *   numsLength = 8
 *   Initialize leastElementIndex = 0 (value 2), mostElementIndex = 0 (value 2)
 *   Loop traversalCounter from 1 to 7:
 *     - traversalCounter = 1: nums[1]=10. 10 > nums[mostElementIndex](2). mostElementIndex = 1. (leastElementIndex=0, mostElementIndex=1)
 *     - traversalCounter = 2: nums[2]=7. No change.
 *     - traversalCounter = 3: nums[3]=5. No change.
 *     - traversalCounter = 4: nums[4]=4. No change.
 *     - traversalCounter = 5: nums[5]=1. 1 < nums[leastElementIndex](2). leastElementIndex = 5. (leastElementIndex=5, mostElementIndex=1)
 *     - traversalCounter = 6: nums[6]=8. No change.
 *     - traversalCounter = 7: nums[7]=6. No change.
 *   After loop: leastElementIndex = 5 (value 1), mostElementIndex = 1 (value 10).
 *   initialDeletionIndex = Math.min(5, 1) = 1
 *   finalDeletionIndex = Math.max(5, 1) = 5
 *   frontOnlyDeletions = finalDeletionIndex + 1 = 5 + 1 = 6
 *   backOnlyDeletions = numsLength - initialDeletionIndex = 8 - 1 = 7
 *   mixedDeletions = (initialDeletionIndex + 1) + (numsLength - finalDeletionIndex) = (1 + 1) + (8 - 5) = 2 + 3 = 5
 *   totalDeletionsResult = Math.min(6, 7, 5) = 5
 *   Return 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumDeletions = function (nums) {
  const numsLength = nums.length;
  let leastElementIndex = 0;
  let mostElementIndex = 0;

  for (
    let traversalCounter = 0;
    traversalCounter < numsLength;
    traversalCounter++
  ) {
    if (nums[traversalCounter] < nums[leastElementIndex]) {
      leastElementIndex = traversalCounter;
    }
    if (nums[traversalCounter] > nums[mostElementIndex]) {
      mostElementIndex = traversalCounter;
    }
  }

  const initialDeletionIndex = Math.min(leastElementIndex, mostElementIndex);
  const finalDeletionIndex = Math.max(leastElementIndex, mostElementIndex);

  const frontOnlyDeletions = finalDeletionIndex + 1;
  const backOnlyDeletions = numsLength - initialDeletionIndex;
  const mixedDeletions =
    initialDeletionIndex + 1 + (numsLength - finalDeletionIndex);

  const totalDeletionsResult = Math.min(
    frontOnlyDeletions,
    backOnlyDeletions,
    mixedDeletions
  );

  return totalDeletionsResult;
};
