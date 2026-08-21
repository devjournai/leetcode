/**
 * Apply Operations To Maximize Score
 * Intuition: To maximize the score, we should prioritize multiplying by larger numbers. The problem constraints dictate that for any chosen subarray, we pick an element with the highest prime score (and smallest index if ties). This means an element `x` at index `i` can only be chosen from subarrays where `x` is the "leader" based on prime score. The total number of times an element `x` can be chosen (its "contribution count") depends on the range of subarrays `[l, r]` for which it satisfies the leadership criteria. After calculating each element's contribution count, we sort all numbers by their value (descending) and greedily pick the largest numbers, using them up to their contribution count or until `k` operations are exhausted. Modular exponentiation is used for large products.
 * Approach:
 * 1. Precompute prime scores for all numbers up to `MAX_VALUE` (100000) using a sieve-like approach to count distinct prime factors.
 * 2. For each number in the input array `nums`, determine how many distinct subarrays it can be chosen from. This involves finding the nearest element to its left with a strictly greater prime score, and the nearest element to its right with a greater-or-equal prime score. A monotonic stack efficiently calculates these boundaries for all elements. The number of subarrays for an element at index `i` bounded by `leftBoundary` (exclusive) and `rightBoundary` (exclusive) is `(i - leftBoundary) * (rightBoundary - i)`.
 * 3. Store each number along with its prime score and calculated subarray count.
 * 4. Sort these (number, prime_score, count) triples in descending order based on the number's value.
 * 5. Iterate through the sorted triples. For each triple, take the number of operations (`k`) that is the minimum of its available subarray count and the remaining `k` operations. Multiply the running total score by `(elementValue ^ usedOperations)` modulo `10^9 + 7`. Use modular exponentiation for this power calculation, and memoize results to optimize.
 * 6. Return the final score.
 * Dry Run: nums = [8, 3, 9, 3, 8], k = 2
 * 1. Prime Scores (sample): ps[8]=1 (2), ps[3]=1 (3), ps[9]=1 (3), ps[3]=1 (3)
 * 2. Initial elements with prime scores: [ [8,1,0], [3,1,0], [9,1,0], [3,1,0], [8,1,0] ]
 * 3. Monotonic stack for subarray counts (Example for element 8 at index 0):
 *    - Left boundary (strictly greater prime score): None (represented by -1)
 *    - Right boundary (greater or equal prime score): Suppose element 3 at index 1 has prime score 1.
 *      The element at index 0 (8, ps=1) has `leftBound=-1`. Right bound is index 1 (3, ps=1).
 *      Contribution = (0 - (-1)) * (1 - 0) = 1 * 1 = 1.
 *      This process applies to all elements to find their full counts.
 *      Let's assume counts become (example, not actual for simplicity):
 *      [ [8,1,2], [3,1,1], [9,1,3], [3,1,1], [8,1,2] ]
 * 4. Sorted by value (desc): [ [9,1,3], [8,1,2], [8,1,2], [3,1,1], [3,1,1] ]
 * 5. Calculate Score, k=2:
 *    - Pick [9,1,3]. Use min(2, 3) = 2 operations. k becomes 0.
 *    - Score = (1 * 9^2) % MOD = 81 % MOD.
 *    - No more operations.
 * 6. Result = 81.
 * Time Complexity: O(N log N + MAX_VALUE log log MAX_VALUE + K log P)
 * Space Complexity: O(MAX_VALUE + N)
 */
var maximumScore = function (nums, k) {
  const bigModulus = 1000000007n;
  const maxValue = 100000;

  const primeScoreCounts = new Array(maxValue + 1).fill(0);
  for (
    let currentPrimeNum = 2;
    currentPrimeNum <= maxValue;
    ++currentPrimeNum
  ) {
    if (primeScoreCounts[currentPrimeNum] === 0) {
      for (
        let multiplicationValue = currentPrimeNum;
        multiplicationValue <= maxValue;
        multiplicationValue += currentPrimeNum
      ) {
        primeScoreCounts[multiplicationValue]++;
      }
    }
  }

  const elementDetailsList = [];
  const totalNumbers = nums.length;
  for (let valIndex = 0; valIndex < totalNumbers; ++valIndex) {
    elementDetailsList.push([
      nums[valIndex],
      primeScoreCounts[nums[valIndex]],
      0,
    ]);
  }

  const indexStack = [-1];
  for (let iterateIndex = 0; iterateIndex <= totalNumbers; ++iterateIndex) {
    while (
      indexStack.length > 1 &&
      (iterateIndex === totalNumbers ||
        elementDetailsList[indexStack[indexStack.length - 1]][1] <
          elementDetailsList[iterateIndex][1])
    ) {
      const poppedIndex = indexStack.pop();
      const leftBoundIndex = indexStack[indexStack.length - 1];
      elementDetailsList[poppedIndex][2] =
        (poppedIndex - leftBoundIndex) * (iterateIndex - poppedIndex);
    }
    indexStack.push(iterateIndex);
  }

  const sortedElementContributions = elementDetailsList.sort(
    (firstElem, secondElem) => secondElem[0] - firstElem[0]
  );

  let finalScore = 1n;
  let operationsRemaining = k;
  const powerCalculationCache = {};

  for (
    let contributionIndex = 0;
    contributionIndex < sortedElementContributions.length &&
    operationsRemaining > 0;
    ++contributionIndex
  ) {
    const currentElementData = sortedElementContributions[contributionIndex];
    const elementValue = currentElementData[0];
    const availableOperationsForElement = currentElementData[2];

    const operationsToUse = Math.min(
      operationsRemaining,
      availableOperationsForElement
    );
    operationsRemaining -= operationsToUse;

    const cacheKeyString = `${elementValue},${operationsToUse}`;
    let currentPowerResult;

    if (cacheKeyString in powerCalculationCache) {
      currentPowerResult = powerCalculationCache[cacheKeyString];
    } else {
      let baseBigInt = BigInt(elementValue);
      let exponentCount = operationsToUse;
      let exponentAccumulator = 1n;
      let tempBase = baseBigInt;

      while (exponentCount > 0) {
        if (exponentCount & 1) {
          exponentAccumulator = (exponentAccumulator * tempBase) % bigModulus;
        }
        tempBase = (tempBase * tempBase) % bigModulus;
        exponentCount >>= 1;
      }
      currentPowerResult = exponentAccumulator;
      powerCalculationCache[cacheKeyString] = currentPowerResult;
    }

    finalScore = (finalScore * currentPowerResult) % bigModulus;
  }

  return Number(finalScore);
};
