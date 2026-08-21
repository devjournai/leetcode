/**
 * Maximum Number Of Books You Can Take
 * Intuition: This problem asks to find the maximum sum of books from a contiguous segment [l, r] such that the number of books taken from shelf 'i' is strictly less than shelf 'i+1' for l <= i < r. Additionally, the number of books taken from any shelf 'j' cannot exceed books[j]. This implies that if 'k' books are taken from shelf 'r', then from shelf 'j' (where l <= j <= r) we take `k - (r - j)` books. This sequence must also be limited by `books[j]`. Specifically, for the chosen 'k' books at shelf 'r', it must satisfy `k - (r - j) <= books[j]` for all `j` in `[l, r]`, which rearranges to `k <= books[j] + (r - j)`. So, 'k' is ultimately limited by the minimum of `books[j] + (r - j)` over `j` in the segment `[l, r]`. This structure suggests a dynamic programming approach optimized by a monotonic stack.
 * Approach: 1. Initialize `maxBooksDp` as an array of size `booksCount` to store the maximum number of books that can be taken from a contiguous section ending at each index `i`. Initialize `indicesStack` as an empty array to maintain indices `p` such that `books[p] + p` is strictly increasing. Initialize `overallMaxBooks` to 0.
 * 2. Iterate `currentShelfIndex` from `0` to `booksCount - 1`:
 *    a. While `indicesStack` is not empty AND the value `books[stackTopIndex] + stackTopIndex` is greater than or equal to `books[currentShelfIndex] + currentShelfIndex` (where `stackTopIndex` is the top of `indicesStack`): Pop `stackTopIndex`. This condition identifies previous shelves `p` that do not pose a stricter constraint than `currentShelfIndex` itself, allowing a potential segment to extend further left past `p` without `p` being the bottleneck.
 *    b. Declare `arithmeticSequenceLength`.
 *    c. If `indicesStack` is empty after popping, it means there is no preceding shelf `j < currentShelfIndex` that acts as a bottleneck for a segment ending at `currentShelfIndex`. In this scenario, we assume the maximum possible books are taken from `currentShelfIndex` (which is `books[currentShelfIndex]`). The effective length of the arithmetic sequence (e.g., `1, 2, ..., books[currentShelfIndex]`) is `min(currentShelfIndex + 1, books[currentShelfIndex])`. Store this in `arithmeticSequenceLength`. `maxBooksDp[currentShelfIndex]` is calculated as the sum of an arithmetic progression where the largest term is `books[currentShelfIndex]` and there are `arithmeticSequenceLength` terms. The sum formula is `(length * (2 * largestTerm - length + 1)) / 2`.
 *    d. If `indicesStack` is not empty, `previousShelfIndex` (the new top of `indicesStack`) is the first shelf to the left that *does* act as a bottleneck (i.e., `books[previousShelfIndex] + previousShelfIndex < books[currentShelfIndex] + currentShelfIndex`). This implies that for shelves `j` in `(previousShelfIndex, currentShelfIndex]`, `books[j] + j >= books[currentShelfIndex] + currentShelfIndex`, meaning `books[j]` is large enough not to be a bottleneck if `books[currentShelfIndex]` books are taken from `currentShelfIndex`. Therefore, the segment `[previousShelfIndex + 1, currentShelfIndex]` can take `books[currentShelfIndex]` from `currentShelfIndex`, and `books[currentShelfIndex] - (currentShelfIndex - j)` from shelf `j`. The `arithmeticSequenceLength` for this segment is `currentShelfIndex - previousShelfIndex`. The sum for this new segment `[previousShelfIndex + 1, currentShelfIndex]` is calculated using the same arithmetic progression formula, and added to `maxBooksDp[previousShelfIndex]`.
 *    e. Push `currentShelfIndex` onto `indicesStack`.
 *    f. Update `overallMaxBooks` with `Math.max(overallMaxBooks, maxBooksDp[currentShelfIndex])`.
 * 3. Return `overallMaxBooks`.
 * Dry Run: books = [10, 1, 10]
 * booksCount = 3, maxBooksDp = [0, 0, 0], indicesStack = [], overallMaxBooks = 0
 *
 * currentShelfIndex = 0, books[0] = 10:
 *   indicesStack is empty.
 *   arithmeticSequenceLength = Math.min(0 + 1, 10) = 1.
 *   maxBooksDp[0] = (1 * (2 * 10 - 1 + 1)) / 2 = 10.
 *   indicesStack.push(0). indicesStack = [0].
 *   overallMaxBooks = Math.max(0, 10) = 10.
 *
 * currentShelfIndex = 1, books[1] = 1:
 *   stackTopIndex = 0.
 *   Condition: books[0] + 0 >= books[1] + 1  =>  10 + 0 >= 1 + 1  =>  10 >= 2. True.
 *   Pop 0. indicesStack = [].
 *   indicesStack is empty.
 *   arithmeticSequenceLength = Math.min(1 + 1, 1) = 1.
 *   maxBooksDp[1] = (1 * (2 * 1 - 1 + 1)) / 2 = 1.
 *   indicesStack.push(1). indicesStack = [1].
 *   overallMaxBooks = Math.max(10, 1) = 10.
 *
 * currentShelfIndex = 2, books[2] = 10:
 *   stackTopIndex = 1.
 *   Condition: books[1] + 1 >= books[2] + 2  =>  1 + 1 >= 10 + 2  =>  2 >= 12. False.
 *   indicesStack not popped. previousShelfIndex = 1.
 *   arithmeticSequenceLength = currentShelfIndex - previousShelfIndex = 2 - 1 = 1.
 *   maxBooksDp[2] = maxBooksDp[1] + (arithmeticSequenceLength * (2 * books[currentShelfIndex] - arithmeticSequenceLength + 1)) / 2
 *               = 1 + (1 * (2 * 10 - 1 + 1)) / 2
 *               = 1 + (1 * 20) / 2 = 1 + 10 = 11.
 *   indicesStack.push(2). indicesStack = [1, 2].
 *   overallMaxBooks = Math.max(10, 11) = 11.
 *
 * Final Result: 11
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumBooks = function (books) {
  const booksCount = books.length;
  const maxBooksDp = new Array(booksCount).fill(0);
  const indicesStack = [];
  let overallMaxBooks = 0;

  for (
    let currentShelfIndex = 0;
    currentShelfIndex < booksCount;
    currentShelfIndex++
  ) {
    while (
      indicesStack.length > 0 &&
      books[indicesStack[indicesStack.length - 1]] +
        indicesStack[indicesStack.length - 1] >=
        books[currentShelfIndex] + currentShelfIndex
    ) {
      indicesStack.pop();
    }

    let arithmeticSequenceLength;
    if (indicesStack.length === 0) {
      arithmeticSequenceLength = Math.min(
        currentShelfIndex + 1,
        books[currentShelfIndex]
      );
      maxBooksDp[currentShelfIndex] =
        (arithmeticSequenceLength *
          (2 * books[currentShelfIndex] - arithmeticSequenceLength + 1)) /
        2;
    } else {
      const previousShelfIndex = indicesStack[indicesStack.length - 1];
      arithmeticSequenceLength = currentShelfIndex - previousShelfIndex;
      maxBooksDp[currentShelfIndex] =
        maxBooksDp[previousShelfIndex] +
        (arithmeticSequenceLength *
          (2 * books[currentShelfIndex] - arithmeticSequenceLength + 1)) /
          2;
    }

    indicesStack.push(currentShelfIndex);
    if (maxBooksDp[currentShelfIndex] > overallMaxBooks) {
      overallMaxBooks = maxBooksDp[currentShelfIndex];
    }
  }

  return overallMaxBooks;
};
