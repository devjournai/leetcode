/**
 * The Number Of Beautiful Subsets
 * Intuition: A subset is beautiful if it does not contain two integers `x` and `y` such that `|x - y| = k`. This implies that if we are considering adding an element `num` to a subset, we must ensure that neither `num - k` nor `num + k` is already present in the subset.
 * Approach: 1. Sort the input array `nums` to ensure consistent processing order, which can be beneficial for specific optimizations or for simply presenting a more structured approach; however, it's not strictly necessary for the correctness of the frequency map method. 2. Initialize a counter `totalBeautifulSubsets` to zero and a frequency map `currentSubsetFrequencies` to keep track of elements currently in the subset being built. 3. Define a recursive backtracking function `exploreSubsets` that takes `currentIndex` as its sole argument, representing the index of the number being considered from `nums`. 4. In the base case, when `currentIndex` equals the length of `nums`, it means all numbers have been considered. If `currentSubsetFrequencies` is not empty (to ensure non-empty subsets), increment `totalBeautifulSubsets`. 5. For the recursive steps, first, make a recursive call `exploreSubsets(currentIndex + 1)` to explore the branch where the `nums[currentIndex]` is *excluded* from the current subset. 6. Second, determine if `nums[currentIndex]` can be *included*. This check involves verifying if `currentSubsetFrequencies` contains `nums[currentIndex] - k` or `nums[currentIndex] + k`. If either is found, then `nums[currentIndex]` cannot be added without violating the beautiful subset condition. 7. If `nums[currentIndex]` can be included, add it to `currentSubsetFrequencies` (incrementing its count), then make another recursive call `exploreSubsets(currentIndex + 1)` to explore the branch where `nums[currentIndex]` is *included*. 8. After the recursive call for the included branch returns, backtrack by removing `nums[currentIndex]` from `currentSubsetFrequencies` (decrementing its count or deleting it if its count becomes zero) to restore the state for subsequent branches. 9. Finally, return the accumulated `totalBeautifulSubsets`.
 * Dry Run: nums = [2, 4, 6], k = 2
 * Sorted nums: [2, 4, 6]
 * totalBeautifulSubsets = 0
 * currentSubsetFrequencies = Map {}
 *
 * Call exploreSubsets(0): (index = 0, nums[index] = 2)
 *   1. exploreSubsets(1) (exclude nums[0]=2): (index = 1, nums[index] = 4)
 *     1. exploreSubsets(2) (exclude nums[1]=4): (index = 2, nums[index] = 6)
 *       1. exploreSubsets(3) (exclude nums[2]=6):
 *         Base case (index = 3). currentSubsetFrequencies.size is 0. Return.
 *       currentNumber = 6. neededToBlock1 = 4, neededToBlock2 = 8.
 *       currentSubsetFrequencies is empty. isViolating = false.
 *       currentSubsetFrequencies.set(6, 1).
 *       2. exploreSubsets(3) (include nums[2]=6):
 *         Base case (index = 3). currentSubsetFrequencies.size is 1 ({6:1}).
 *         totalBeautifulSubsets = 1. Return.
 *       Backtrack: currentCount = 1. currentSubsetFrequencies.delete(6).
 *       Return.
 *     currentNumber = 4. neededToBlock1 = 2, neededToBlock2 = 6.
 *     currentSubsetFrequencies is empty. isViolating = false.
 *     currentSubsetFrequencies.set(4, 1).
 *     2. exploreSubsets(2) (include nums[1]=4): (index = 2, nums[index] = 6)
 *       1. exploreSubsets(3) (exclude nums[2]=6):
 *         Base case (index = 3). currentSubsetFrequencies.size is 1 ({4:1}).
 *         totalBeautifulSubsets = 2. Return.
 *       currentNumber = 6. neededToBlock1 = 4, neededToBlock2 = 8.
 *       currentSubsetFrequencies contains {4:1}. isViolating = true (because currentSubsetFrequencies.has(4)).
 *       Skip include nums[2]=6.
 *       Return.
 *     Backtrack: currentCount = 1. currentSubsetFrequencies.delete(4).
 *     Return.
 *   currentNumber = 2. neededToBlock1 = 0, neededToBlock2 = 4.
 *   currentSubsetFrequencies is empty. isViolating = false.
 *   currentSubsetFrequencies.set(2, 1).
 *   2. exploreSubsets(1) (include nums[0]=2): (index = 1, nums[index] = 4)
 *     1. exploreSubsets(2) (exclude nums[1]=4): (index = 2, nums[index] = 6)
 *       1. exploreSubsets(3) (exclude nums[2]=6):
 *         Base case (index = 3). currentSubsetFrequencies.size is 1 ({2:1}).
 *         totalBeautifulSubsets = 3. Return.
 *       currentNumber = 6. neededToBlock1 = 4, neededToBlock2 = 8.
 *       currentSubsetFrequencies contains {2:1}. isViolating = false.
 *       currentSubsetFrequencies.set(6, 1).
 *       2. exploreSubsets(3) (include nums[2]=6):
 *         Base case (index = 3). currentSubsetFrequencies.size is 2 ({2:1, 6:1}).
 *         totalBeautifulSubsets = 4. Return.
 *       Backtrack: currentCount = 1. currentSubsetFrequencies.delete(6).
 *       Return.
 *     currentNumber = 4. neededToBlock1 = 2, neededToBlock2 = 6.
 *     currentSubsetFrequencies contains {2:1}. isViolating = true (because currentSubsetFrequencies.has(2)).
 *     Skip include nums[1]=4.
 *     Return.
 *   Backtrack: currentCount = 1. currentSubsetFrequencies.delete(2).
 *   Return.
 *
 * Final totalBeautifulSubsets = 4.
 * Time Complexity: O(N * log N + 2^N)
 * Space Complexity: O(N)
 */
var beautifulSubsets = function (nums, k) {
  const numsLength = nums.length;
  let totalBeautifulSubsets = 0;
  const currentSubsetFrequencies = new Map();

  nums.sort((valueOne, valueTwo) => valueOne - valueTwo);

  function exploreSubsets(currentIndex) {
    if (currentIndex === numsLength) {
      if (currentSubsetFrequencies.size > 0) {
        totalBeautifulSubsets++;
      }
      return;
    }

    exploreSubsets(currentIndex + 1);

    const currentNumber = nums[currentIndex];
    const neededToBlock1 = currentNumber - k;
    const neededToBlock2 = currentNumber + k;

    const isViolating =
      currentSubsetFrequencies.has(neededToBlock1) ||
      currentSubsetFrequencies.has(neededToBlock2);

    if (!isViolating) {
      currentSubsetFrequencies.set(
        currentNumber,
        (currentSubsetFrequencies.get(currentNumber) || 0) + 1,
      );

      exploreSubsets(currentIndex + 1);

      const currentCount = currentSubsetFrequencies.get(currentNumber);
      if (currentCount === 1) {
        currentSubsetFrequencies.delete(currentNumber);
      } else {
        currentSubsetFrequencies.set(currentNumber, currentCount - 1);
      }
    }
  }

  exploreSubsets(0);
  return totalBeautifulSubsets;
};
