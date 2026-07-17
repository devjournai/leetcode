/**
 * Partition String Into Minimum Beautiful Substrings
 * Intuition: This problem asks for the minimum number of partitions, which often hints at dynamic programming or a recursive approach with memoization. A "beautiful" substring has two properties: no leading zeros, and its binary representation is a power of 5. We can pre-calculate all powers of 5 whose binary representations fit within the length of the input string and store them for quick lookup. Then, a recursive function can explore all valid partitions.
 * Approach: 1. Pre-calculate all numbers that are powers of 5. Convert each power of 5 into its binary string representation. Store these binary strings in a `Set` called `beautifulBinaryStrings` if their length is less than or equal to the input string's length, enabling O(1) average time lookup. 2. Initialize a memoization array `memoizationCache` with a placeholder value (e.g., -1) to store results of subproblems. The size of this array will be `inputLength + 1`. 3. Define a recursive helper function `computeMinimumPartitions(currentIndex)` that takes the starting index for a substring partition. 4. Base Case: If `currentIndex` equals the `inputLength`, it means we've successfully partitioned the entire string, so return 0. 5. Memoization Check: If `memoizationCache[currentIndex]` is not the placeholder, return the cached value. 6. Constraint Check: If the character at `currentIndex` in the `inputString` is '0', it cannot be the start of a beautiful substring (no leading zeros allowed), so return `Infinity` to indicate an invalid path. 7. Initialize a `localMinPartitions` variable to `Infinity`. 8. Iterate with an `endingIndex` from `currentIndex + 1` up to `inputLength`. 9. Extract a `currentSegment` from `inputString` using `currentIndex` and `endingIndex`. 10. Check if `currentSegment` is present in the `beautifulBinaryStrings` set. 11. If `currentSegment` is a beautiful binary string: a. Recursively call `computeMinimumPartitions(endingIndex)` to find the minimum partitions for the remaining part of the string. b. If the result from the recursive call (`nextSubproblemResult`) is not `Infinity`, update `localMinPartitions` with the smaller of its current value and `1 + nextSubproblemResult`. (Using a ternary operator instead of `Math.min`). 12. Store the `localMinPartitions` in `memoizationCache[currentIndex]` before returning it. 13. The initial call will be `computeMinimumPartitions(0)`. 14. Finally, if the returned value from the initial call is `Infinity`, it means no valid partition was found, so return -1. Otherwise, return the computed minimum.
 * Dry Run: s = "101101"
 * inputLength = 6
 * beautifulBinaryStrings = {"1", "101", "11001"} (precomputed, assuming these are relevant powers of 5)
 * memoizationCache = [-1, -1, -1, -1, -1, -1, -1]
 *
 * computeMinimumPartitions(0):
 *   memoizationCache[0] is -1.
 *   inputString[0] is '1'.
 *   localMinPartitions = Infinity
 *   endingIndex from 1 to 6:
 *     endingIndex = 1: currentSegment = "1" (in beautifulBinaryStrings)
 *       nextSubproblemResult = computeMinimumPartitions(1)
 *       computeMinimumPartitions(1):
 *         memoizationCache[1] is -1.
 *         inputString[1] is '0'. Returns Infinity. (cached as Infinity)
 *       nextSubproblemResult is Infinity. localMinPartitions remains Infinity.
 *     endingIndex = 2: currentSegment = "10" (not in beautifulBinaryStrings)
 *     endingIndex = 3: currentSegment = "101" (in beautifulBinaryStrings)
 *       nextSubproblemResult = computeMinimumPartitions(3)
 *       computeMinimumPartitions(3):
 *         memoizationCache[3] is -1.
 *         inputString[3] is '1'.
 *         localMinThreeParts = Infinity
 *         endingIndex_three from 4 to 6:
 *           endingIndex_three = 4: segment_three = "1" (in beautifulBinaryStrings)
 *             resultForFour = computeMinimumPartitions(4)
 *             computeMinimumPartitions(4):
 *               memoizationCache[4] is -1.
 *               inputString[4] is '0'. Returns Infinity. (cached as Infinity)
 *             resultForFour is Infinity. localMinThreeParts remains Infinity.
 *           endingIndex_three = 5: segment_three = "10" (not in beautifulBinaryStrings)
 *           endingIndex_three = 6: segment_three = "101" (in beautifulBinaryStrings)
 *             resultForSix = computeMinimumPartitions(6)
 *             computeMinimumPartitions(6):
 *               currentIndex (6) === inputLength (6). Returns 0. (cached as 0)
 *             resultForSix is 0. localMinThreeParts = (Infinity < 1 + 0) ? Infinity : (1 + 0) = 1.
 *         memoizationCache[3] = 1. Returns 1.
 *       nextSubproblemResult is 1. localMinPartitions = (Infinity < 1 + 1) ? Infinity : (1 + 1) = 2.
 *     ... (Other endingIndex values for computeMinimumPartitions(0) will not yield a better result)
 *   memoizationCache[0] = 2. Returns 2.
 *
 * Final result is 2.
 * Time Complexity: O(N * (N + L * log(max_power)) + N^2 * L) where N is the length of `s`, L is the average length of a substring, and max_power is the largest power of 5 considered.
 * Precomputation: `log_5(2^N)` powers of 5 are generated (roughly N * log2(5)). Each `toString(2)` is `O(N)`. So, `O(N^2)` for string generation. Set insertion also involves string hashing/copying `O(N)`. Total precomputation `O(N^2)`.
 * Recursive function with memoization: There are `N` states (from `0` to `N-1`). Each state involves an inner loop that iterates `N` times (for `endingIndex`). Inside the loop, string slicing `inputString.slice(currentIndex, endingIndex)` takes `O(L)` (where `L` is `endingIndex - currentIndex`) and `Set.has()` takes `O(L)` on average for string comparison. Thus, each state takes `O(N * L)` time. In the worst case, `L` can be `N`. So, `N * (N * N) = O(N^3)`.
 * Total time complexity: O(N^3)
 * Space Complexity: O(N)
 */
var minimumBeautifulSubstrings = function (s) {
  const inputString = s;
  const inputLength = inputString.length;

  const beautifulBinaryStrings = new Set();
  let currentNumericalPower = 1;

  while (true) {
    const binaryRepresentation = currentNumericalPower.toString(2);
    if (binaryRepresentation.length > inputLength) {
      break;
    }
    beautifulBinaryStrings.add(binaryRepresentation);
    if (currentNumericalPower > Number.MAX_SAFE_INTEGER / 5) {
      // Prevent overflow
      break;
    }
    currentNumericalPower *= 5;
  }

  const memoizationCache = new Array(inputLength + 1).fill(-1);

  const computeMinimumPartitions = (currentIndex) => {
    if (currentIndex === inputLength) {
      return 0;
    }

    if (memoizationCache[currentIndex] !== -1) {
      return memoizationCache[currentIndex];
    }

    if (inputString[currentIndex] === "0") {
      memoizationCache[currentIndex] = Infinity;
      return Infinity;
    }

    let localMinPartitions = Infinity;
    let endingIndex = currentIndex + 1;
    while (endingIndex <= inputLength) {
      const currentSegment = inputString.slice(currentIndex, endingIndex);

      if (beautifulBinaryStrings.has(currentSegment)) {
        const nextSubproblemResult = computeMinimumPartitions(endingIndex);

        if (nextSubproblemResult !== Infinity) {
          localMinPartitions =
            localMinPartitions < 1 + nextSubproblemResult
              ? localMinPartitions
              : 1 + nextSubproblemResult;
        }
      }
      endingIndex++;
    }

    memoizationCache[currentIndex] = localMinPartitions;
    return localMinPartitions;
  };

  const finalResultCount = computeMinimumPartitions(0);

  return finalResultCount === Infinity ? -1 : finalResultCount;
};
