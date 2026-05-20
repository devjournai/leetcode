/**
 * Minimum Cost To Separate Sentence Into Rows
 * Intuition: This problem exhibits optimal substructure and overlapping subproblems, making it suitable for dynamic programming. The minimum cost to arrange the words from a certain starting point can be found by trying all valid first-row configurations and adding their cost to the minimum cost of arranging the remaining words.
 * Approach: 1. Split the input sentence into an array of words. 2. Define a recursive helper function `computeMinimumCost` that takes a `startingWordIndex` and returns the minimum cost to arrange words from that index to the end. 3. Inside `computeMinimumCost`:
 *    a. Implement base case: if `startingWordIndex` reaches the end of the words array, return 0.
 *    b. Implement memoization: if the result for `startingWordIndex` is already computed, return it.
 *    c. Initialize `minimumTotalCost` to infinity and `currentLineLength` to 0.
 *    d. Iterate `currentWordIterator` from `startingWordIndex` to the end of the words array:
 *        i. Accumulate `currentLineLength`, adding a space if it's not the first word in the current row.
 *        ii. If `currentLineLength` exceeds `k`, break the loop as this row configuration is invalid.
 *        iii. Recursively call `computeMinimumCost` for the next word (`currentWordIterator + 1`) to get `costForNextSegment`.
 *        iv. Calculate `actualSegmentCost` for the current row: it's 0 if this row contains the very last word of the sentence, otherwise it's `(k - currentLineLength)^2`.
 *        v. Update `minimumTotalCost` with the minimum of its current value and `actualSegmentCost + costForNextSegment`.
 *    e. Store the computed `minimumTotalCost` in the memoization map for `startingWordIndex` and return it.
 * 4. Call `computeMinimumCost(0)` to initiate the process from the beginning of the sentence.
 * Dry Run: sentence = "i love leetcode", k = 12
 * wordsArray = ["i", "love", "leetcode"], numberOfWords = 3
 * memoizedCostsMap = {}
 *
 * computeMinimumCost(0):
 *   startingWordIndex = 0
 *   minimumTotalCost = Infinity
 *   currentLineLength = 0
 *
 *   currentWordIterator = 0 (word "i"):
 *     currentLineLength = 1 (length of "i")
 *     1 <= 12 (valid)
 *     costForNextSegment = computeMinimumCost(1)
 *       computeMinimumCost(1):
 *         startingWordIndex = 1
 *         minimumTotalCost = Infinity
 *         currentLineLength = 0
 *
 *         currentWordIterator = 1 (word "love"):
 *           currentLineLength = 4 (length of "love")
 *           4 <= 12 (valid)
 *           costForNextSegmentInner = computeMinimumCost(2)
 *             computeMinimumCost(2):
 *               startingWordIndex = 2
 *               minimumTotalCost = Infinity
 *               currentLineLength = 0
 *
 *               currentWordIterator = 2 (word "leetcode"):
 *                 currentLineLength = 8 (length of "leetcode")
 *                 8 <= 12 (valid)
 *                 costForNextSegmentDeep = computeMinimumCost(3) -> returns 0 (base case)
 *                 actualSegmentCostDeep = (2 === 2) ? 0 : (12 - 8)^2 = 0
 *                 minimumTotalCost = min(Infinity, 0 + 0) = 0
 *               memoizedCostsMap[2] = 0
 *               returns 0
 *           actualSegmentCostInner = (1 === 2) ? 0 : (12 - 4)^2 = 64
 *           minimumTotalCost = min(Infinity, 64 + 0) = 64
 *
 *         currentWordIterator = 2 (word "leetcode"):
 *           currentLineLength = 4 + 1 (space) + 8 = 13
 *           13 > 12 (invalid) -> break
 *
 *         memoizedCostsMap[1] = 64
 *         returns 64
 *     actualSegmentCost = (0 === 2) ? 0 : (12 - 1)^2 = 121
 *     minimumTotalCost = min(Infinity, 121 + 64) = 185
 *
 *   currentWordIterator = 1 (word "love"):
 *     currentLineLength = 1 + 1 (space) + 4 = 6
 *     6 <= 12 (valid)
 *     costForNextSegment = computeMinimumCost(2) -> retrieves 0 from memoizedCostsMap[2]
 *     actualSegmentCost = (1 === 2) ? 0 : (12 - 6)^2 = 36
 *     minimumTotalCost = min(185, 36 + 0) = 36
 *
 *   currentWordIterator = 2 (word "leetcode"):
 *     currentLineLength = 6 + 1 (space) + 8 = 15
 *     15 > 12 (invalid) -> break
 *
 *   memoizedCostsMap[0] = 36
 *   returns 36
 *
 * Final Result: 36
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minimumCost = function (sentence, k) {
  const sentenceWords = sentence.split(" ");
  const numberOfWords = sentenceWords.length;
  const memoizedCostsMap = new Map();

  function computeMinimumCost(startingWordIndex) {
    if (startingWordIndex === numberOfWords) {
      return 0;
    }
    if (memoizedCostsMap.has(startingWordIndex)) {
      return memoizedCostsMap.get(startingWordIndex);
    }

    let minimumTotalCost = Infinity;
    let currentLineLength = 0;

    for (
      let currentWordIterator = startingWordIndex;
      currentWordIterator < numberOfWords;
      currentWordIterator++
    ) {
      if (currentWordIterator > startingWordIndex) {
        currentLineLength += 1;
      }
      currentLineLength += sentenceWords[currentWordIterator].length;

      if (currentLineLength > k) {
        break;
      }

      const costForNextSegment = computeMinimumCost(currentWordIterator + 1);
      const actualSegmentCost =
        currentWordIterator === numberOfWords - 1
          ? 0
          : (k - currentLineLength) ** 2;
      minimumTotalCost = Math.min(
        minimumTotalCost,
        actualSegmentCost + costForNextSegment,
      );
    }

    memoizedCostsMap.set(startingWordIndex, minimumTotalCost);
    return minimumTotalCost;
  }

  return computeMinimumCost(0);
};
