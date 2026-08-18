/**
 * Minimum Number Of Coins For Fruits Ii
 * Intuition: This problem asks for the minimum cost to acquire all fruits from index 0 to n-1. When purchasing fruit `idx` (0-indexed, representing the `idx+1`-th fruit), it costs `prices[idx]` and covers fruits from `idx` up to `2*idx+1` (inclusive) for free. This is a classic dynamic programming problem where `dp[i]` represents the minimum cost to achieve full coverage up to `n-1`, assuming fruit `i` is the last fruit explicitly purchased. To calculate `dp[i]`, we pay `prices[i]` and add the minimum cost `dp[j]` from a previous purchase `j` such that `j`'s free coverage period (up to `2*j+1`) ended strictly before `i`. A monotonic deque is used to efficiently find this minimum `dp[j]` while maintaining the relevant candidates.
 * Approach: 1. Initialize a `dp` array of size `n` to store the minimum cost to cover all fruits up to `n-1`, where `dp[i]` specifically signifies that fruit `i` is the last one purchased directly. 2. Initialize a `deque` (doubly-ended queue) to store indices `j` in increasing order, where `dp[j]` values are also increasing. This helps in efficient lookup of minimum `dp` values. 3. Set `dp[0]` to `prices[0]` as the base case; if only fruit 0 is bought, it covers itself and its free fruits. Push `0` to the `deque`. 4. Iterate `currentFruitIndex` from `1` to `n-1`. For each `currentFruitIndex`: 5. Remove elements from the front of the `deque` whose free range `2*deque[0]+1` ends before `currentFruitIndex`. This ensures `deque[0]` is the index of the optimal previous purchase whose free fruits offer has expired before `currentFruitIndex`, thus `currentFruitIndex` must be covered by a new purchase or subsequent free offer. 6. Calculate `dp[currentFruitIndex]` as `prices[currentFruitIndex]` plus `dp[deque[0]]`. 7. Maintain the monotonic property of the `deque` by removing elements from the back whose `dp` value is greater than or equal to `dp[currentFruitIndex]`. This keeps only relevant, minimal cost paths. 8. Add `currentFruitIndex` to the back of the `deque`. 9. After the loop, the `deque[0]` will hold the index `k` of the final purchase that results in the overall minimum cost to cover all fruits up to `n-1`. Return `dp[deque[0]]`.
 * Dry Run:
 * prices = [1, 10, 1, 1] (n=4)
 * dp = [_, _, _, _]
 * indexQueue = []
 *
 * currentFruitIndex = 0:
 *   dp[0] = prices[0] = 1
 *   indexQueue = [0]
 *
 * currentFruitIndex = 1:
 *   costForCurrent = prices[1] = 10
 *   Dequeue front check: (2 * indexQueue[0] + 1 < currentFruitIndex) => (2*0+1 < 1) => (1 < 1) is false. 0 remains.
 *   dp[1] = dp[indexQueue[0]] + costForCurrent = dp[0] + 10 = 1 + 10 = 11
 *   Dequeue back check: (dp[indexQueue[end]] >= dp[1]) => (dp[0] >= 11) => (1 >= 11) is false.
 *   indexQueue.push(1) -> indexQueue = [0, 1]
 *
 * currentFruitIndex = 2:
 *   costForCurrent = prices[2] = 1
 *   Dequeue front check: (2 * indexQueue[0] + 1 < currentFruitIndex) => (2*0+1 < 2) => (1 < 2) is true. indexQueue.shift() -> indexQueue = [1]
 *   Now, indexQueue[0] is 1.
 *   dp[2] = dp[indexQueue[0]] + costForCurrent = dp[1] + 1 = 11 + 1 = 12
 *   Dequeue back check: (dp[indexQueue[end]] >= dp[2]) => (dp[1] >= 12) => (11 >= 12) is false.
 *   indexQueue.push(2) -> indexQueue = [1, 2]
 *
 * currentFruitIndex = 3:
 *   costForCurrent = prices[3] = 1
 *   Dequeue front check: (2 * indexQueue[0] + 1 < currentFruitIndex) => (2*1+1 < 3) => (3 < 3) is false. 1 remains.
 *   dp[3] = dp[indexQueue[0]] + costForCurrent = dp[1] + 1 = 11 + 1 = 12
 *   Dequeue back check: (dp[indexQueue[end]] >= dp[3]) => (dp[2] >= 12) => (12 >= 12) is true. indexQueue.pop() -> indexQueue = [1]
 *   Dequeue back check: (dp[indexQueue[end]] >= dp[3]) => (dp[1] >= 12) => (11 >= 12) is false.
 *   indexQueue.push(3) -> indexQueue = [1, 3]
 *
 * Loop ends.
 * Return dp[indexQueue[0]] = dp[1] = 11.
 * Time Complexity: O(N) where N is the number of fruits. Each index is pushed and popped from the deque at most once.
 * Space Complexity: O(N) for the `dp` array and the `deque`.
 */
var minimumCoins = function (prices) {
  const totalFruits = prices.length;
  const dynamicProgrammingTable = new Array(totalFruits);
  const indexQueue = [];

  dynamicProgrammingTable[0] = prices[0];
  indexQueue.push(0);

  for (
    let currentFruitIndex = 1;
    currentFruitIndex < totalFruits;
    currentFruitIndex++
  ) {
    const freeRangeEnd = 2 * indexQueue[0] + 1;
    while (indexQueue.length > 0 && freeRangeEnd < currentFruitIndex) {
      indexQueue.shift();
      if (indexQueue.length > 0) {
        freeRangeEnd = 2 * indexQueue[0] + 1;
      } else {
        break;
      }
    }

    if (indexQueue.length === 0) {
      dynamicProgrammingTable[currentFruitIndex] = prices[currentFruitIndex];
    } else {
      dynamicProgrammingTable[currentFruitIndex] =
        dynamicProgrammingTable[indexQueue[0]] + prices[currentFruitIndex];
    }

    while (
      indexQueue.length > 0 &&
      dynamicProgrammingTable[indexQueue[indexQueue.length - 1]] >=
        dynamicProgrammingTable[currentFruitIndex]
    ) {
      indexQueue.pop();
    }

    indexQueue.push(currentFruitIndex);
  }

  return dynamicProgrammingTable[indexQueue[0]];
};
