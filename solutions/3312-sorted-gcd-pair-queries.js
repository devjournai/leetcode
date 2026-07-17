/**
 * Sorted GCD Pair Queries
 * Intuition: The maximum value for nums[i] is relatively small (5 * 10^4). This suggests that instead of generating all ~5 * 10^9 pairs, we can count the frequency of each possible GCD value within this limited range. Once we have the counts for each GCD, we can efficiently answer queries by determining which range a query index falls into.
 * Approach:
 * 1. Pre-process nums: Create a frequency array `valueCounts` to store the occurrences of each number in `nums`.
 * 2. Calculate GCD counts: Iterate downwards from the maximum possible value (5 * 10^4) to 1. For each potential GCD `g`, count how many numbers in `nums` are multiples of `g`. From this, calculate the total number of pairs whose GCD is a multiple of `g`. Then, subtract the counts of pairs whose GCD is a *higher multiple* of `g` (e.g., 2g, 3g, etc.) to find the exact count of pairs whose GCD is `g`. Store these in `gcdCounts[g]`.
 * 3. Prepare queries: Transform the `queries` array into an array of objects, each containing the original query value and its original index. This is necessary because we will sort the queries to process them efficiently.
 * 4. Sort queries: Sort the prepared queries by their `value` in ascending order.
 * 5. Answer queries: Iterate through possible GCD values `g` from 1 up to the maximum value. Maintain a `currentRank` which represents the total count of GCD pairs processed so far. For each `g`, process all sorted queries whose `value` falls within the range `[currentRank, currentRank + gcdCounts[g] - 1]`. Assign `g` as the answer for these queries. Update `currentRank` by adding `gcdCounts[g]`.
 *
 * Dry Run: nums = [2,3,4], queries = [0,2,2]
 * MAX_VAL = 4
 * 1. valueCounts: [0,0,1,1,1] (index: value, value: count)
 * 2. Calculate gcdCounts:
 *    g = 4: currentGMultiplesCount = valueCounts[4] = 1. pairsWithGcdMultipleOfG = 1 * 0 / 2 = 0. gcdCounts[4] = 0.
 *    g = 3: currentGMultiplesCount = valueCounts[3] = 1. pairsWithGcdMultipleOfG = 1 * 0 / 2 = 0. gcdCounts[3] = 0.
 *    g = 2: currentGMultiplesCount = valueCounts[2] + valueCounts[4] = 1 + 1 = 2.
 *           pairsWithGcdMultipleOfG = 2 * 1 / 2 = 1. (Pair (2,4) has GCD 2).
 *           Subtract higher multiples: gcdCounts[2*2] = gcdCounts[4] = 0.
 *           gcdCounts[2] = 1 - 0 = 1.
 *    g = 1: currentGMultiplesCount = valueCounts[2] + valueCounts[3] + valueCounts[4] = 1 + 1 + 1 = 3.
 *           pairsWithGcdMultipleOfG = 3 * 2 / 2 = 3. (Pairs (2,3), (2,4), (3,4)).
 *           Subtract higher multiples:
 *             gcdCounts[2*1] = gcdCounts[2] = 1. pairsWithGcdMultipleOfG = 3 - 1 = 2.
 *             gcdCounts[3*1] = gcdCounts[3] = 0. pairsWithGcdMultipleOfG = 2 - 0 = 2.
 *             gcdCounts[4*1] = gcdCounts[4] = 0. pairsWithGcdMultipleOfG = 2 - 0 = 2.
 *           gcdCounts[1] = 2.
 *    Resulting gcdCounts: [0, 2, 1, 0, 0] (index 0 unused, index g stores count for GCD g).
 * 3. Prepare queries: [{value: 0, originalIndex: 0}, {value: 2, originalIndex: 1}, {value: 2, originalIndex: 2}]
 * 4. Sort queries: Same as above, already sorted.
 * 5. Answer queries:
 *    queryPointer = 0, currentRank = 0, answer = [empty, empty, empty]
 *    g = 1: gcdCounts[1] = 2.
 *      processedQueries[0].value = 0. Is 0 < currentRank + gcdCounts[1] (i.e., 0 < 0 + 2)? Yes.
 *        answer[0] = 1. queryPointer = 1.
 *      processedQueries[1].value = 2. Is 2 < currentRank + gcdCounts[1] (i.e., 2 < 0 + 2)? No. Loop ends for g=1.
 *    currentRank = currentRank + gcdCounts[1] = 0 + 2 = 2.
 *    g = 2: gcdCounts[2] = 1.
 *      processedQueries[1].value = 2. Is 2 < currentRank + gcdCounts[2] (i.e., 2 < 2 + 1)? Yes.
 *        answer[1] = 2. queryPointer = 2.
 *      processedQueries[2].value = 2. Is 2 < currentRank + gcdCounts[2] (i.e., 2 < 2 + 1)? Yes.
 *        answer[2] = 2. queryPointer = 3.
 *      queryPointer === processedQueries.length. Break.
 *    Final answer: [1,2,2]. Matches example.
 *
 * Time Complexity: O(N + MAX_VAL * log(MAX_VAL) + Q log Q)
 * Space Complexity: O(MAX_VAL + Q)
 */
var gcdValues = function (nums, queries) {
  const MAX_VAL = 50000;

  const valueCounts = new Array(MAX_VAL + 1).fill(0);
  for (const num of nums) {
    valueCounts[num]++;
  }

  const gcdCounts = new Array(MAX_VAL + 1).fill(0);
  for (let g = MAX_VAL; g >= 1; g--) {
    let currentGMultiplesCount = 0;
    for (let m = g; m <= MAX_VAL; m += g) {
      currentGMultiplesCount += valueCounts[m];
    }

    let pairsWithGcdMultipleOfG =
      (currentGMultiplesCount * (currentGMultiplesCount - 1)) / 2;

    for (let k = 2; k * g <= MAX_VAL; k++) {
      pairsWithGcdMultipleOfG -= gcdCounts[k * g];
    }
    gcdCounts[g] = pairsWithGcdMultipleOfG;
  }

  const answer = new Array(queries.length);
  const processedQueries = [];
  for (let i = 0; i < queries.length; i++) {
    processedQueries.push({ value: queries[i], originalIndex: i });
  }

  processedQueries.sort((a, b) => a.value - b.value);

  let queryPointer = 0;
  let currentRank = 0;

  for (let g = 1; g <= MAX_VAL; g++) {
    while (
      queryPointer < processedQueries.length &&
      processedQueries[queryPointer].value < currentRank + gcdCounts[g]
    ) {
      answer[processedQueries[queryPointer].originalIndex] = g;
      queryPointer++;
    }
    currentRank += gcdCounts[g];
    if (queryPointer === processedQueries.length) {
      break;
    }
  }

  return answer;
};
