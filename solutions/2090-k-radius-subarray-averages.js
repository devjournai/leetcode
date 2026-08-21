/**
 * K Radius Subarray Averages
 * Intuition: The problem requires calculating subarray averages for a fixed-size window (2k+1) centered at each index. This structure is ideal for a sliding window approach, where we efficiently update the sum as the window moves one position to the right, avoiding recalculating the sum for each window from scratch.
 * Approach: 1. Initialize an array `averagesResult` of the same length as `nums`, filled with -1 to handle out-of-bounds cases automatically. 2. Calculate the `currentWindowSize` as `2 * k + 1`. 3. If `currentWindowSize` is greater than `numsLength`, no valid window can be formed, so return the `averagesResult` directly. 4. Calculate the sum of the first `currentWindowSize` elements, storing it in `accumulatedSum`. 5. The first valid center for an average is at index `k`. Calculate `averagesResult[k]` by integer division of `accumulatedSum` by `currentWindowSize`. 6. Slide the window from `k + 1` up to `numsLength - k - 1`. In each step, subtract the element leaving the window from `accumulatedSum` and add the new element entering the window. 7. For each new `currentCenterForAverage`, calculate `averagesResult[currentCenterForAverage]` using the updated `accumulatedSum` and integer division. 8. Return `averagesResult`.
 * Dry Run: nums = [7,4,3,9,1,8,5,2,6], k = 3
 * numsLength = 9, radiusValue = 3
 * averagesResult = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
 * currentWindowSize = 2 * 3 + 1 = 7
 * currentWindowSize (7) <= numsLength (9) -> proceed
 *
 * Initial sum (initialIndexForSum from 0 to 6):
 * accumulatedSum = nums[0] + ... + nums[6] = 7+4+3+9+1+8+5 = 37
 *
 * First average calculation:
 * firstCenterIndex = radiusValue = 3
 * averagesResult[3] = Math.floor(accumulatedSum / currentWindowSize) = Math.floor(37 / 7) = 5
 * averagesResult = [-1, -1, -1, 5, -1, -1, -1, -1, -1]
 *
 * Sliding window (currentCenterForAverage from 4 to 5):
 * currentCenterForAverage = 4:
 *   elementToRemoveIndex = 4 - 3 - 1 = 0 (value nums[0] = 7)
 *   elementToAddIndex = 4 + 3 = 7 (value nums[7] = 2)
 *   accumulatedSum = 37 - 7 + 2 = 32
 *   averagesResult[4] = Math.floor(32 / 7) = 4
 *   averagesResult = [-1, -1, -1, 5, 4, -1, -1, -1, -1]
 *
 * currentCenterForAverage = 5:
 *   elementToRemoveIndex = 5 - 3 - 1 = 1 (value nums[1] = 4)
 *   elementToAddIndex = 5 + 3 = 8 (value nums[8] = 6)
 *   accumulatedSum = 32 - 4 + 6 = 34
 *   averagesResult[5] = Math.floor(34 / 7) = 4
 *   averagesResult = [-1, -1, -1, 5, 4, 4, -1, -1, -1]
 *
 * Loop ends.
 * Return [-1, -1, -1, 5, 4, 4, -1, -1, -1]
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getAverages = function (nums, k) {
  const numsLength = nums.length;
  const currentWindowSize = 2 * k + 1;
  const averagesResult = new Array(numsLength).fill(-1);

  if (currentWindowSize > numsLength) {
    return averagesResult;
  }

  let accumulatedSum = 0;
  for (
    let initialIndexForSum = 0;
    initialIndexForSum < currentWindowSize;
    initialIndexForSum++
  ) {
    accumulatedSum += nums[initialIndexForSum];
  }

  const firstCenterIndex = k;
  averagesResult[firstCenterIndex] = Math.floor(
    accumulatedSum / currentWindowSize
  );

  for (
    let currentCenterForAverage = k + 1;
    currentCenterForAverage < numsLength - k;
    currentCenterForAverage++
  ) {
    const elementToRemoveIndex = currentCenterForAverage - k - 1;
    const elementToAddIndex = currentCenterForAverage + k;
    accumulatedSum =
      accumulatedSum - nums[elementToRemoveIndex] + nums[elementToAddIndex];
    averagesResult[currentCenterForAverage] = Math.floor(
      accumulatedSum / currentWindowSize
    );
  }

  return averagesResult;
};
