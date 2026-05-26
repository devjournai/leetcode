/**
 * Recover The Original Array
 * Intuition: The smallest number in `nums` must be an `arr[i] - k` value. Its corresponding `arr[i] + k` must also be present in `nums`. The difference between these two numbers will be `2k`. We can iterate through possible `2k` values by pairing the smallest number in `nums` (`nums[0]` after sorting) with every other number (`nums[i]`). Once a `2k` (let's call it `diff`) is found, we attempt to reconstruct the original array by finding all `(x, x + diff)` pairs in `nums`.
 * Approach: 1. Sort the input array `nums`. This allows us to consistently assume `nums[0]` is a `lower` value (`arr[x] - k`). 2. Iterate from the second element `nums[1]` to `nums[nums.length-1]` to find a candidate for `nums[0] + 2k`. The difference `nums[currentTryIndex] - nums[0]` gives us a potential `2k` value (`candidateDiff`). 3. Validate `candidateDiff`: it must be positive and even. If not, skip to the next `currentTryIndex`. 4. For each valid `candidateDiff`, attempt to reconstruct the original array using a two-pointer approach:
 * a. Initialize a `leftPointer` at 0 and a `rightPointer` at `currentTryIndex`.
 * b. Maintain a `visitedFlags` array to mark elements that have been used in a pair.
 * c. Loop while `rightPointer` is within bounds and not all pairs are found:
 * i. Advance `leftPointer` forward using a `for` loop until it points to an unvisited element or catches `rightPointer`.
 * ii. If `leftPointer` becomes equal to or greater than `rightPointer`, or if the `rightPointer` element itself is already visited (meaning it was used as a `lower` value in a previous successful `candidateDiff` trial), this `candidateDiff` is invalid. Advance `rightPointer` and `continue` to the next iteration.
 * iii. If `initialArray[rightPointer] - initialArray[leftPointer]` matches `candidateDiff`, we found a pair. Add `initialArray[leftPointer] + candidateDiff / 2` to our `currentOriginalArr`, mark both elements as visited, increment `foundPairs`, and advance `leftPointer`.
 * iv. If the difference is too small (`< candidateDiff`), we implicitly need a larger `higher` value, so `rightPointer` will advance. If the difference is too large (`> candidateDiff`), we implicitly need a larger `lower` value, so `leftPointer` must advance. The reference solution implicitly handles this by advancing `rightPointer` and only advancing `leftPointer` when a match is found or it's skipped over a used element. We replicate this by advancing `rightPointer` at the end of each iteration of the inner `while` loop.
 * d. If `foundPairs` equals `n` (half the array length) after checking all `rightPointer` candidates, `currentOriginalArr` is a valid result.
 * Dry Run: nums = [2,10,6,4,8,12]
 * 1. initialArray = [2,4,6,8,10,12] (sorted)
 * 2. totalLength = 6, nSize = 3 (required number of original elements)
 * Outer while loop (iterating `currentTryIndex` from 1 to 5):
 * a. currentTryIndex = 1:
 *    candidateDiff = initialArray[1] - initialArray[0] = 4 - 2 = 2.
 *    Valid candidateDiff (positive and even).
 *    currentOriginalArr = [], visitedFlags = [F,F,F,F,F,F], foundPairs = 0.
 *    leftPointer = 0, rightPointer = 1.
 * Inner while (rightPointer < 6 && foundPairs < 3):
 *          - Iteration 1: rightPointer = 1.
 *             - `for` loop to advance `leftPointer`: `leftPointer` starts at 0. `!visitedFlags[0]`, so `leftPointer` remains 0.
 *             - `leftPointer` (0) is less than `rightPointer` (1).
 *             - `currentDiffValue = initialArray[1] - initialArray[0] = 4 - 2 = 2`.
 *             - `currentDiffValue === candidateDiff` (2 === 2). Match!
 *             - `currentOriginalArr.push(2 + 2/2)` => `[3]`
 *             - `visitedFlags` = `[T,T,F,F,F,F]`
 *             - `foundPairs` = 1. `leftPointer` = 1.
 *          - `rightPointer` increments to 2.
 *          - Iteration 2: rightPointer = 2.
 *             - `for` loop to advance `leftPointer`: `leftPointer` starts at 1. `visitedFlags[1]` is true. `leftPointer` increments to 2. Loop terminates (`leftPointer` (2) is not less than `rightPointer` (2)).
 *             - `leftPointer` (2) is equal to `rightPointer` (2). Condition `leftPointer >= rightPointer` is true.
 *             - `rightPointer` increments to 3. `continue` to next inner `while` iteration.
 *          - Iteration 3: rightPointer = 3.
 *             - `for` loop to advance `leftPointer`: `leftPointer` starts at 2. `!visitedFlags[2]`, so `leftPointer` remains 2.
 *             - `leftPointer` (2) is less than `rightPointer` (3).
 *             - `currentDiffValue = initialArray[3] - initialArray[2] = 8 - 6 = 2`.
 *             - `currentDiffValue === candidateDiff` (2 === 2). Match!
 *             - `currentOriginalArr.push(6 + 2/2)` => `[3,7]`
 *             - `visitedFlags` = `[T,T,T,T,F,F]`
 *             - `foundPairs` = 2. `leftPointer` = 3.
 *          - `rightPointer` increments to 4.
 *          - Iteration 4: rightPointer = 4.
 *             - `for` loop to advance `leftPointer`: `leftPointer` starts at 3. `visitedFlags[3]` is true. `leftPointer` increments to 4. Loop terminates (`leftPointer` (4) is not less than `rightPointer` (4)).
 *             - `leftPointer` (4) is equal to `rightPointer` (4). Condition `leftPointer >= rightPointer` is true.
 *             - `rightPointer` increments to 5. `continue` to next inner `while` iteration.
 *          - Iteration 5: rightPointer = 5.
 *             - `for` loop to advance `leftPointer`: `leftPointer` starts at 4. `!visitedFlags[4]`, so `leftPointer` remains 4.
 *             - `leftPointer` (4) is less than `rightPointer` (5).
 *             - `currentDiffValue = initialArray[5] - initialArray[4] = 12 - 10 = 2`.
 *             - `currentDiffValue === candidateDiff` (2 === 2). Match!
 *             - `currentOriginalArr.push(10 + 2/2)` => `[3,7,11]`
 *             - `visitedFlags` = `[T,T,T,T,T,T]`
 *             - `foundPairs` = 3. `leftPointer` = 5.
 *          - `rightPointer` increments to 6.
 *          - Iteration 6: `rightPointer` (6) is not less than 6. Inner `while` loop terminates.
 *       - After inner loop: `foundPairs` (3) === `nSize` (3). True. Return `[3,7,11]`.
 * Time Complexity: O(N log N + N^2)
 * Space Complexity: O(N)
 */
var recoverArray = function (nums) {
  const totalLength = nums.length;
  const nSize = totalLength / 2;

  const initialArray = [...nums];
  initialArray.sort((valA, valB) => valA - valB);

  let currentTryIndex = 1;
  while (currentTryIndex < totalLength) {
    const candidateDiff = initialArray[currentTryIndex] - initialArray[0];

    if (candidateDiff <= 0 || candidateDiff % 2 !== 0) {
      currentTryIndex++;
      continue;
    }

    const currentOriginalArr = [];
    const visitedFlags = new Array(totalLength).fill(false);
    let foundPairs = 0;
    let leftPointer = 0;
    let rightPointer = currentTryIndex;

    while (rightPointer < totalLength && foundPairs < nSize) {
      for (
        ;
        leftPointer < rightPointer && visitedFlags[leftPointer];
        leftPointer++
      ) {}

      if (leftPointer >= rightPointer) {
        rightPointer++;
        continue;
      }

      const currentDiffValue =
        initialArray[rightPointer] - initialArray[leftPointer];

      if (currentDiffValue === candidateDiff) {
        currentOriginalArr.push(initialArray[leftPointer] + candidateDiff / 2);
        visitedFlags[leftPointer] = true;
        visitedFlags[rightPointer] = true;
        foundPairs++;
        leftPointer++;
      }
      rightPointer++;
    }

    if (foundPairs === nSize) {
      return currentOriginalArr;
    }

    currentTryIndex++;
  }

  return [];
};
