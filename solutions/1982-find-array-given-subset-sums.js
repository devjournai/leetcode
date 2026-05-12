/**
 * Find Array Given Subset Sums
 * Intuition: The core idea is that given all subset sums, if we can identify one element of the original array, say `x`, we can partition the set of all subset sums into two groups: those that include `x` and those that don't. The sums in the "includes `x`" group are simply the sums from the "doesn't include `x`" group, each increased by `x`. The smallest two sums in the initially sorted `sums` array, `sums[0]` and `sums[1]`, will reveal the absolute value of one of the original array elements. Specifically, `sums[1] - sums[0]` must be a candidate for an absolute value of an element. By iteratively finding such an element, partitioning the sums, and reducing the problem to a smaller set of sums, we can reconstruct the original array.
 * Approach: 1. Sort the input `sums` array to easily find the minimum elements. 2. Initialize an empty `outputArray` to store the recovered elements. 3. Enter a loop that continues `n` times (until `n` elements are found). 4. In each iteration, calculate `currentDifference = sums[1] - sums[0]`. This `currentDifference` is a candidate for the absolute value of the next element to be recovered. 5. Create a frequency map (`sumFrequencies`) to count occurrences of each sum in the current `sums` array. 6. Iterate through the current `sums` array using the frequency map. For each `iteratedSumValue`, if it's available, try to pair it with `iteratedSumValue + currentDifference`. If a pair is found, decrement counts in the frequency map for both, add `iteratedSumValue` to `subsetSumsExcludingCurrent` and `iteratedSumValue + currentDifference` to `subsetSumsIncludingCurrent`. 7. After partitioning, check which of `subsetSumsExcludingCurrent` or `subsetSumsIncludingCurrent` contains `0`. If `subsetSumsExcludingCurrent` contains `0`, it implies `currentDifference` is the actual positive element, and `subsetSumsExcludingCurrent` becomes the new `sums` for the next iteration. If `subsetSumsIncludingCurrent` contains `0`, it implies `-currentDifference` is the actual negative element, and `subsetSumsIncludingCurrent` becomes the new `sums`. 8. Add the determined element (`currentDifference` or `-currentDifference`) to `outputArray`. 9. Repeat until `outputArray` has `n` elements.
 * Dry Run: `n = 2`, `sums = [0, 1, 2, 3]`
 * Initial: `sums` sorted as `[0, 1, 2, 3]`, `outputArray = []`.
 * Iteration 1 (recover 1st element):
 * `currentDifference = sums[1] - sums[0] = 1 - 0 = 1`.
 * `sumFrequencies = {0: 1, 1: 1, 2: 1, 3: 1}`.
 * `subsetSumsExcludingCurrent = []`, `subsetSumsIncludingCurrent = []`.
 * Partitioning:
 * `iteratedSumValue = 0`: `0` is available. `0+1` (i.e., `1`) is available.
 * `sumFrequencies` updates.
 * `subsetSumsExcludingCurrent.push(0)`, `subsetSumsIncludingCurrent.push(1)`.
 * `iteratedSumValue = 1`: Not available (`freq` for `1` is 0).
 * `iteratedSumValue = 2`: `2` is available. `2+1` (i.e., `3`) is available.
 * `sumFrequencies` updates.
 * `subsetSumsExcludingCurrent.push(2)`, `subsetSumsIncludingCurrent.push(3)`.
 * `iteratedSumValue = 3`: Not available (`freq` for `3` is 0).
 * Resulting partitions: `subsetSumsExcludingCurrent = [0, 2]`, `subsetSumsIncludingCurrent = [1, 3]`.
 * `subsetSumsExcludingCurrent.includes(0)` is true.
 * `outputArray.push(currentDifference)` -> `outputArray = [1]`.
 * `sums = subsetSumsExcludingCurrent` -> `sums = [0, 2]`.
 * Iteration 2 (recover 2nd element):
 * `currentDifference = sums[1] - sums[0] = 2 - 0 = 2`.
 * `sumFrequencies = {0: 1, 2: 1}`.
 * `subsetSumsExcludingCurrent = []`, `subsetSumsIncludingCurrent = []`.
 * Partitioning:
 * `iteratedSumValue = 0`: `0` is available. `0+2` (i.e., `2`) is available.
 * `sumFrequencies` updates.
 * `subsetSumsExcludingCurrent.push(0)`, `subsetSumsIncludingCurrent.push(2)`.
 * `iteratedSumValue = 2`: Not available.
 * Resulting partitions: `subsetSumsExcludingCurrent = [0]`, `subsetSumsIncludingCurrent = [2]`.
 * `subsetSumsExcludingCurrent.includes(0)` is true.
 * `outputArray.push(currentDifference)` -> `outputArray = [1, 2]`.
 * `sums = subsetSumsExcludingCurrent` -> `sums = [0]`.
 * Loop ends because `outputArray.length` (2) equals `n` (2).
 * Return `outputArray = [1, 2]`.
 * Time Complexity: O(n * 2^n)
 * Space Complexity: O(2^n)
 */
var recoverArray = function (n, sums) {
  sums.sort((firstElement, secondElement) => firstElement - secondElement);

  const outputArray = [];
  while (outputArray.length < n) {
    const currentDifference = sums[1] - sums[0];

    const subsetSumsIncludingCurrent = [];
    const subsetSumsExcludingCurrent = [];
    const sumFrequencies = new Map();

    for (const currentSumValue of sums) {
      sumFrequencies.set(
        currentSumValue,
        (sumFrequencies.get(currentSumValue) || 0) + 1,
      );
    }

    for (const iteratedSumValue of sums) {
      if (sumFrequencies.get(iteratedSumValue) > 0) {
        sumFrequencies.set(
          iteratedSumValue,
          sumFrequencies.get(iteratedSumValue) - 1,
        );

        if (sumFrequencies.get(iteratedSumValue + currentDifference) > 0) {
          sumFrequencies.set(
            iteratedSumValue + currentDifference,
            sumFrequencies.get(iteratedSumValue + currentDifference) - 1,
          );
          subsetSumsExcludingCurrent.push(iteratedSumValue);
          subsetSumsIncludingCurrent.push(iteratedSumValue + currentDifference);
        } else {
          return [];
        }
      }
    }

    if (subsetSumsExcludingCurrent.includes(0)) {
      outputArray.push(currentDifference);
      sums = subsetSumsExcludingCurrent;
    } else {
      outputArray.push(-currentDifference);
      sums = subsetSumsIncludingCurrent;
    }
  }

  return outputArray;
};
