/**
 * Maximum Candies Allocated To K Children
 * Intuition: The problem asks for the maximum possible number of candies, say 'X', that can be allocated to 'k' children such that each child receives 'X' candies. If we can allocate 'X' candies to each child, we can certainly allocate any amount less than 'X'. Conversely, if we cannot allocate 'X' candies, we cannot allocate any amount greater than 'X'. This monotonic property makes binary search on the answer 'X' an efficient approach.
 * Approach: 1. Define a search space for the possible number of candies 'X'. The minimum possible value is 0 (no candies), and the maximum possible value is the largest candy pile size (since a child cannot receive more than the largest pile from a single source).
 * 2. Perform a binary search within this range. In each step, calculate the `currentMidpoint` value.
 * 3. For this `currentMidpoint`, check how many total sub-piles of size `currentMidpoint` can be formed from all available `candies` piles. This is done by iterating through each `currentPileAmount` in `candies` and summing `Math.floor(currentPileAmount / currentMidpoint)`. Let's call this `formedPilesCount`.
 * 4. If `formedPilesCount` is greater than or equal to `k`, it means `currentMidpoint` candies per child is achievable. We try to find a larger possible value, so we update `searchStart = currentMidpoint`.
 * 5. If `formedPilesCount` is less than `k`, `currentMidpoint` candies per child is not achievable. We need to try a smaller value, so we update `searchEnd = currentMidpoint`.
 * 6. The binary search continues until `searchStart + 1` equals `searchEnd`. At this point, `searchStart` will hold the maximum number of candies 'X' that can be allocated, satisfying the condition.
 * Dry Run: candies = [5, 8, 3], k = 3
 * Initial: `searchStart = 0`, `searchEnd = 10000001` (representing 10^7 + 1 for max candies). For simplicity, let's use a tighter `searchEnd = 9` (max candy + 1).
 *
 * 1. `searchStart = 0`, `searchEnd = 9`
 *    `currentMidpoint = Math.floor((0 + 9) / 2) = 4`
 *    `formedPilesCount = floor(5/4) + floor(8/4) + floor(3/4) = 1 + 2 + 0 = 3`
 *    `formedPilesCount` (3) >= `k` (3) is true.
 *    `searchStart = 4`
 *
 * 2. `searchStart = 4`, `searchEnd = 9`
 *    `currentMidpoint = Math.floor((4 + 9) / 2) = 6`
 *    `formedPilesCount = floor(5/6) + floor(8/6) + floor(3/6) = 0 + 1 + 0 = 1`
 *    `formedPilesCount` (1) >= `k` (3) is false.
 *    `searchEnd = 6`
 *
 * 3. `searchStart = 4`, `searchEnd = 6`
 *    `currentMidpoint = Math.floor((4 + 6) / 2) = 5`
 *    `formedPilesCount = floor(5/5) + floor(8/5) + floor(3/5) = 1 + 1 + 0 = 2`
 *    `formedPilesCount` (2) >= `k` (3) is false.
 *    `searchEnd = 5`
 *
 * 4. `searchStart = 4`, `searchEnd = 5`
 *    Loop condition `searchStart + 1 !== searchEnd` (4 + 1 !== 5) is false. Loop terminates.
 *
 * Result: Return `searchStart`, which is `4`.
 * Time Complexity: O(N * log(MaxCandyValue))
 * Space Complexity: O(1)
 */
var maximumCandies = function (candies, k) {
  let searchStart = 0;
  let searchEnd = 10000000 + 1;

  while (searchStart + 1 !== searchEnd) {
    const currentMidpoint = Math.floor((searchStart + searchEnd) / 2);
    let formedPilesCount = 0;
    for (const currentPileAmount of candies) {
      formedPilesCount += Math.floor(currentPileAmount / currentMidpoint);
    }

    if (formedPilesCount >= k) {
      searchStart = currentMidpoint;
    } else {
      searchEnd = currentMidpoint;
    }
  }

  return searchStart;
};
