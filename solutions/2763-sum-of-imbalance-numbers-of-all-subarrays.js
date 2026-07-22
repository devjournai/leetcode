/**
 * Sum Of Imbalance Numbers Of All Subarrays
 * Intuition: The imbalance number of a subarray is determined by gaps greater than 1 in its sorted unique elements. We can efficiently track this by iterating through all subarrays and, for each subarray, incrementally adding elements. When a new distinct element is added, its neighbors in the current set of unique elements dictate whether it creates new imbalances or resolves existing ones.
 * Approach: 1. Initialize a variable `overallImbalanceSum` to accumulate the total imbalance. 2. Use a `while` loop to iterate `startingIndex` from the beginning of `nums` to `inputLength - 1`. This loop defines the start of each subarray. 3. Inside the outer loop, initialize a `distinctElements` `Set` to store unique elements of the current subarray and `currentImbalanceCount` to 0. 4. Use another `while` loop to iterate `endingIndex` from `startingIndex` to `inputLength - 1`. This loop extends the current subarray. 5. For each `currentElementValue` at `nums[endingIndex]`, check if it's already in `distinctElements`. 6. If `currentElementValue` is new, determine if `currentElementValue + 1` (`checkGreaterNeighbor`) or `currentElementValue - 1` (`checkLesserNeighbor`) exist in `distinctElements`. 7. Based on neighbor existence: if both neighbors exist, `currentElementValue` fills a gap, reducing `currentImbalanceCount`. If neither neighbor exists and `distinctElements` is not empty, `currentElementValue` creates new potential gaps, increasing `currentImbalanceCount`. 8. Add `currentElementValue` to `distinctElements`. 9. Add `currentImbalanceCount` to `overallImbalanceSum`. 10. Increment `endingIndex` and `startingIndex` for the next iterations. 11. Return `overallImbalanceSum`.
 * Dry Run: nums = [1, 5, 3]
 *   inputLength = 3, overallImbalanceSum = 0
 *   startingIndex = 0:
 *     distinctElements = {}, currentImbalanceCount = 0
 *     endingIndex = 0: currentElementValue = 1. Not in distinctElements. Neither 0 nor 2 in distinctElements. distinctElements size is 0. No change to currentImbalanceCount. distinctElements = {1}. overallImbalanceSum = 0 + 0 = 0.
 *     endingIndex = 1: currentElementValue = 5. Not in distinctElements. Neither 4 nor 6 in distinctElements. distinctElements size is 1 > 0. currentImbalanceCount++. (currentImbalanceCount = 1). distinctElements = {1, 5}. overallImbalanceSum = 0 + 1 = 1.
 *     endingIndex = 2: currentElementValue = 3. Not in distinctElements. Neither 2 nor 4 in distinctElements. distinctElements size is 2 > 0. currentImbalanceCount++. (currentImbalanceCount = 2). distinctElements = {1, 5, 3}. overallImbalanceSum = 1 + 2 = 3.
 *   startingIndex = 1:
 *     distinctElements = {}, currentImbalanceCount = 0
 *     endingIndex = 1: currentElementValue = 5. Not in distinctElements. Neither 4 nor 6 in distinctElements. distinctElements size is 0. No change. distinctElements = {5}. overallImbalanceSum = 3 + 0 = 3.
 *     endingIndex = 2: currentElementValue = 3. Not in distinctElements. Neither 2 nor 4 in distinctElements. distinctElements size is 1 > 0. currentImbalanceCount++. (currentImbalanceCount = 1). distinctElements = {5, 3}. overallImbalanceSum = 3 + 1 = 4.
 *   startingIndex = 2:
 *     distinctElements = {}, currentImbalanceCount = 0
 *     endingIndex = 2: currentElementValue = 3. Not in distinctElements. Neither 2 nor 4 in distinctElements. distinctElements size is 0. No change. distinctElements = {3}. overallImbalanceSum = 4 + 0 = 4.
 *   Final overallImbalanceSum = 4.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var sumImbalanceNumbers = function (nums) {
  const inputLength = nums.length;
  let overallImbalanceSum = 0;

  let startingIndex = 0;
  while (startingIndex < inputLength) {
    const distinctElements = new Set();
    let currentImbalanceCount = 0;

    let endingIndex = startingIndex;
    while (endingIndex < inputLength) {
      const currentElementValue = nums[endingIndex];

      const alreadyProcessed = distinctElements.has(currentElementValue);

      if (alreadyProcessed === false) {
        const checkGreaterNeighbor = distinctElements.has(
          currentElementValue + 1,
        );
        const checkLesserNeighbor = distinctElements.has(
          currentElementValue - 1,
        );

        const shouldDecrement = checkGreaterNeighbor && checkLesserNeighbor;
        const shouldIncrement =
          checkGreaterNeighbor === false &&
          checkLesserNeighbor === false &&
          distinctElements.size > 0;

        if (shouldDecrement) {
          currentImbalanceCount--;
        }
        if (shouldIncrement) {
          currentImbalanceCount++;
        }

        distinctElements.add(currentElementValue);
      }

      overallImbalanceSum += currentImbalanceCount;
      endingIndex++;
    }
    startingIndex++;
  }

  return overallImbalanceSum;
};
