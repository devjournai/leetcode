/**
 * Maximum Number Of Integers To Choose From A Range I
 * Intuition: To maximize the count of chosen integers while staying within a sum limit, it's optimal to greedily select the smallest available positive integers first. This strategy leaves the largest possible remaining sum for subsequent selections, thus maximizing the potential for choosing more numbers. An additional optimization is to stop iterating once adding the current smallest available integer would exceed the maximum sum, as any larger integers would also certainly exceed it.
 * Approach: 1. Transform the 'banned' array into a Set for efficient O(1) average-time lookup of forbidden numbers. 2. Initialize a counter 'totalChosenIntegers' to zero and a running sum 'currentAggregateSum' to zero. 3. Begin iterating with 'currentCandidate' from 1 up to 'n'. 4. For each 'currentCandidate', first check if it is present in the 'forbiddenNumbers' Set. 5. If it's not banned, then check if adding 'currentCandidate' to 'currentAggregateSum' would exceed 'maxSum'. 6. If 'currentCandidate' is not banned and does not exceed 'maxSum' when added, increment 'totalChosenIntegers' and add 'currentCandidate' to 'currentAggregateSum'. 7. If 'currentCandidate' is not banned but adding it would exceed 'maxSum', then no subsequent larger numbers can be added either, so we can terminate the loop early. 8. Continue this process by incrementing 'currentCandidate' until the loop condition (currentCandidate <= n) is false or an early termination occurs. 9. Return the final value of 'totalChosenIntegers'.
 * Dry Run:
 * banned = [1, 2], n = 5, maxSum = 5
 * forbiddenNumbers = Set {1, 2}
 * totalChosenIntegers = 0
 * currentAggregateSum = 0
 * currentCandidate = 1
 *
 * Loop:
 * 1. currentCandidate = 1:
 *    !forbiddenNumbers.has(1) is false. Skip.
 *    currentCandidate becomes 2.
 * 2. currentCandidate = 2:
 *    !forbiddenNumbers.has(2) is false. Skip.
 *    currentCandidate becomes 3.
 * 3. currentCandidate = 3:
 *    !forbiddenNumbers.has(3) is true.
 *    currentAggregateSum (0) + 3 <= maxSum (5) is true (3 <= 5).
 *    totalChosenIntegers becomes 1.
 *    currentAggregateSum becomes 3.
 *    currentCandidate becomes 4.
 * 4. currentCandidate = 4:
 *    !forbiddenNumbers.has(4) is true.
 *    currentAggregateSum (3) + 4 <= maxSum (5) is false (7 <= 5 is false).
 *    Enter else block: break.
 *
 * Loop terminates.
 * Return totalChosenIntegers = 1.
 *
 * Time Complexity: O(B + min(N, sqrt(MaxSum)))
 * Space Complexity: O(B)
 */
var maxCount = function (banned, n, maxSum) {
  const forbiddenNumbers = new Set(banned);
  let totalChosenIntegers = 0;
  let currentAggregateSum = 0;
  let currentCandidate = 1;

  while (currentCandidate <= n) {
    if (!forbiddenNumbers.has(currentCandidate)) {
      if (currentAggregateSum + currentCandidate <= maxSum) {
        totalChosenIntegers++;
        currentAggregateSum += currentCandidate;
      } else {
        break;
      }
    }
    currentCandidate++;
  }

  return totalChosenIntegers;
};
