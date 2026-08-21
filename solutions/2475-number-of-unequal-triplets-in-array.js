/**
 * Number Of Unequal Triplets In Array
 * Intuition: The problem requires counting triplets (i, j, k) such that their indices are strictly increasing (i < j < k) and their corresponding values (nums[i], nums[j], nums[k]) are pairwise distinct. A key observation is that if we pick any three distinct values present in the array, say valA, valB, and valC, with frequencies freqA, freqB, and freqC respectively, then there are exactly (freqA * freqB * freqC) ways to choose one instance of each of these values from the array. For each such selection of three specific elements (e.g., nums[p]=valA, nums[q]=valB, nums[r]=valC), their indices p, q, r will be distinct. These distinct indices can always be sorted into a unique triplet (i, j, k) satisfying i < j < k. Therefore, the total number of such triplets is the sum of (freqA * freqB * freqC) for all unique combinations of three distinct values (valA, valB, valC) found in the array.
 * Approach: 1. Compute the frequency of each unique number in the input array `nums` and store them in a hash map (`elementFrequencies`). 2. Initialize a counter for the total number of valid triplets (`tripletCount`) to zero. 3. Maintain a running sum (`elementsBeforeCurrent`) of frequencies of distinct numbers whose values have been processed by the loop so far, initialized to zero. 4. Iterate through the frequencies of distinct numbers stored in `elementFrequencies`. For each `currentElementFrequency`: a. Calculate the sum of frequencies of distinct numbers whose values are yet to be processed (`elementsAfterCurrent = totalElements - elementsBeforeCurrent - currentElementFrequency`). b. Add `elementsBeforeCurrent * currentElementFrequency * elementsAfterCurrent` to `tripletCount`. This product represents the count of new triplets formed by selecting one element from the 'before' group, one from the 'current' group, and one from the 'after' group. c. Update `elementsBeforeCurrent` by adding `currentElementFrequency` to it. 5. Return the final `tripletCount`.
 * Dry Run: nums = [4,4,2,4,3]
 *   1. elementFrequencies = new Map();
 *      After iterating through nums: elementFrequencies = {4:3, 2:1, 3:1}
 *   2. tripletCount = 0
 *   3. elementsBeforeCurrent = 0
 *   4. totalElements = 5 (nums.length)
 *   5. Iterate through elementFrequencies.values() (assuming an iteration order of 1 for 2, 1 for 3, 3 for 4 for clarity, though actual Map iteration order is insertion order or key-order in some JS engines)
 *      a. currentElementFrequency = 1 (for value 2)
 *         elementsAfterCurrent = 5 - 1 - 0 = 4
 *         tripletCount += 0 * 1 * 4 = 0
 *         elementsBeforeCurrent = 0 + 1 = 1
 *      b. currentElementFrequency = 1 (for value 3)
 *         elementsAfterCurrent = 5 - 1 - 1 = 3
 *         tripletCount += 1 * 1 * 3 = 3
 *         elementsBeforeCurrent = 1 + 1 = 2
 *      c. currentElementFrequency = 3 (for value 4)
 *         elementsAfterCurrent = 5 - 3 - 2 = 0
 *         tripletCount += 2 * 3 * 0 = 0
 *         elementsBeforeCurrent = 2 + 3 = 5
 *   6. Return tripletCount = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var unequalTriplets = function (nums) {
  const elementFrequencies = new Map();
  for (const currentNumber of nums) {
    elementFrequencies.set(
      currentNumber,
      (elementFrequencies.get(currentNumber) || 0) + 1
    );
  }

  let tripletCount = 0;
  let elementsBeforeCurrent = 0;
  const totalElements = nums.length;

  for (const currentElementFrequency of elementFrequencies.values()) {
    const elementsAfterCurrent =
      totalElements - currentElementFrequency - elementsBeforeCurrent;
    tripletCount +=
      elementsBeforeCurrent * currentElementFrequency * elementsAfterCurrent;
    elementsBeforeCurrent += currentElementFrequency;
  }

  return tripletCount;
};
