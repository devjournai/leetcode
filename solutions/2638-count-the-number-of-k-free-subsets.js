/**
 * Count The Number Of K Free Subsets
 * Intuition: The problem can be decomposed by identifying "chains" of numbers where a[i+1] = a[i] + k. Numbers in different chains are independent. For a single chain, the problem reduces to selecting elements such that no two adjacent elements are chosen, which is a classic dynamic programming problem solved by a Fibonacci-like sequence.
 * Approach:
 * 1. Create a sorted copy of the input array `nums`. Sorting helps in systematically processing numbers and identifying chains starting from their smallest elements.
 * 2. Convert the original `nums` into a `Set` for efficient `O(1)` average-time lookups to quickly check if a number exists in the initial input.
 * 3. Initialize `processedChainElements` as a `Set` to keep track of numbers that have already been part of a constructed chain, ensuring each number is processed exactly once.
 * 4. Initialize `totalKFreeSubsets` to 1. This accounts for the empty set and serves as a multiplier for the k-free subset counts derived from independent chains.
 * 5. Iterate through `sortedInputElements`. For each `iterationElement`:
 *    a. If `iterationElement` is already in `processedChainElements`, it means it's part of a chain that started earlier; skip it.
 *    b. Otherwise, start building a chain beginning with `iterationElement`.
 *    c. Use `chainProgressionValue` to traverse elements `iterationElement, iterationElement + k, iterationElement + 2k, ...`.
 *    d. While `chainProgressionValue` exists in `originalElementsLookup` AND has not been marked as `processed` in `processedChainElements`: increment `currentChainSize`, add `chainProgressionValue` to `processedChainElements`, and advance `chainProgressionValue` by `k`.
 *    e. After a chain is fully identified, calculate its contribution to the total k-free subsets using a helper function, `computeChainKFreeSubsets`. This function implements the Fibonacci-like recurrence for chain length.
 *    f. Multiply `totalKFreeSubsets` by the `chainSubsetsContribution` from the current chain.
 * 6. Finally, return `totalKFreeSubsets`.
 * Dry Run:
 * nums = [2, 4, 5, 6, 7], k = 2
 * 1. sortedInputElements = [2, 4, 5, 6, 7]
 * 2. originalElementsLookup = {2, 4, 5, 6, 7}
 * 3. processedChainElements = {}
 * 4. totalKFreeSubsets = 1
 *
 * Loop for iterationElement in sortedInputElements:
 *
 * Case 1: iterationElement = 2
 *   - 2 not in processedChainElements.
 *   - currentChainSize = 0
 *   - chainProgressionValue = 2
 *   - While loop (chain building):
 *     - 2 is in originalElementsLookup and not in processedChainElements:
 *       - currentChainSize = 1
 *       - Add 2 to processedChainElements. Now: {2}
 *       - chainProgressionValue = 2 + 2 = 4
 *     - 4 is in originalElementsLookup and not in processedChainElements:
 *       - currentChainSize = 2
 *       - Add 4 to processedChainElements. Now: {2, 4}
 *       - chainProgressionValue = 4 + 2 = 6
 *     - 6 is in originalElementsLookup and not in processedChainElements:
 *       - currentChainSize = 3
 *       - Add 6 to processedChainElements. Now: {2, 4, 6}
 *       - chainProgressionValue = 6 + 2 = 8
 *     - 8 is not in originalElementsLookup. Loop terminates.
 *   - currentChainSize is 3.
 *   - chainSubsetsContribution = computeChainKFreeSubsets(3):
 *     - if 0: 1
 *     - if 1: 2
 *     - fibonacciPreviousTwo = 1
 *     - fibonacciPreviousOne = 2
 *     - fibonacciIterator = 2: fibonacciCurrentValue = 2 + 1 = 3. fibonacciPreviousTwo = 2. fibonacciPreviousOne = 3.
 *     - fibonacciIterator = 3: fibonacciCurrentValue = 3 + 2 = 5. fibonacciPreviousTwo = 3. fibonacciPreviousOne = 5.
 *     - Returns 5.
 *   - totalKFreeSubsets = 1 * 5 = 5.
 *
 * Case 2: iterationElement = 4
 *   - 4 is in processedChainElements. Skip.
 *
 * Case 3: iterationElement = 5
 *   - 5 not in processedChainElements.
 *   - currentChainSize = 0
 *   - chainProgressionValue = 5
 *   - While loop (chain building):
 *     - 5 is in originalElementsLookup and not in processedChainElements:
 *       - currentChainSize = 1
 *       - Add 5 to processedChainElements. Now: {2, 4, 6, 5}
 *       - chainProgressionValue = 5 + 2 = 7
 *     - 7 is in originalElementsLookup and not in processedChainElements:
 *       - currentChainSize = 2
 *       - Add 7 to processedChainElements. Now: {2, 4, 6, 5, 7}
 *       - chainProgressionValue = 7 + 2 = 9
 *     - 9 is not in originalElementsLookup. Loop terminates.
 *   - currentChainSize is 2.
 *   - chainSubsetsContribution = computeChainKFreeSubsets(2):
 *     - if 0: 1
 *     - if 1: 2
 *     - fibonacciPreviousTwo = 1
 *     - fibonacciPreviousOne = 2
 *     - fibonacciIterator = 2: fibonacciCurrentValue = 2 + 1 = 3. fibonacciPreviousTwo = 2. fibonacciPreviousOne = 3.
 *     - Returns 3.
 *   - totalKFreeSubsets = 5 * 3 = 15.
 *
 * Case 4: iterationElement = 6
 *   - 6 is in processedChainElements. Skip.
 *
 * Case 5: iterationElement = 7
 *   - 7 is in processedChainElements. Skip.
 *
 * End of loop.
 * Final Result: 15.
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countTheNumOfKFreeSubsets = function (nums, k) {
  const sortedInputElements = [...nums].sort(
    (valueA, valueB) => valueA - valueB
  );
  const originalElementsLookup = new Set(sortedInputElements);
  const processedChainElements = new Set();
  let totalKFreeSubsets = 1;

  for (const iterationElement of sortedInputElements) {
    if (processedChainElements.has(iterationElement)) {
      continue;
    }

    let currentChainSize = 0;
    let chainProgressionValue = iterationElement;

    while (
      originalElementsLookup.has(chainProgressionValue) &&
      !processedChainElements.has(chainProgressionValue)
    ) {
      currentChainSize++;
      processedChainElements.add(chainProgressionValue);
      chainProgressionValue += k;
    }

    const chainSubsetsContribution = computeChainKFreeSubsets(currentChainSize);
    totalKFreeSubsets *= chainSubsetsContribution;
  }

  return totalKFreeSubsets;

  function computeChainKFreeSubsets(chainLengthParameter) {
    if (chainLengthParameter === 0) {
      return 1;
    }
    if (chainLengthParameter === 1) {
      return 2;
    }

    let fibonacciPreviousTwo = 1;
    let fibonacciPreviousOne = 2;

    for (
      let fibonacciIterator = 2;
      fibonacciIterator <= chainLengthParameter;
      fibonacciIterator++
    ) {
      const fibonacciCurrentValue = fibonacciPreviousOne + fibonacciPreviousTwo;
      fibonacciPreviousTwo = fibonacciPreviousOne;
      fibonacciPreviousOne = fibonacciCurrentValue;
    }

    return fibonacciPreviousOne;
  }
};
