/**
 * Maximum Element Sum Of A Complete Subset Of Indices
 * Intuition: The problem requires identifying subsets of indices where the product of any two indices within the subset is a perfect square. This condition is mathematically equivalent to stating that all indices within such a subset must share the same square-free part. An integer `k` can be written as `s * m^2`, where `s` is the square-free part of `k`. If `i = s_i * m_i^2` and `j = s_j * m_j^2`, then `i * j = (s_i * s_j) * (m_i * m_j)^2`. For `i * j` to be a perfect square, `s_i * s_j` must also be a perfect square. Since `s_i` and `s_j` are square-free, this can only happen if `s_i = s_j`. Therefore, we can group all indices by their unique square-free part, and for each group, sum the corresponding elements from the `nums` array. The maximum of these sums will be the answer.
 * Approach: 1. Initialize a `Map` to store groupings of `nums` elements based on their square-free index part. Keys will be the square-free parts, and values will be arrays of `nums` elements. 2. Iterate through indices from `1` up to the length of the `nums` array. For each index `k`: a. Determine its square-free part. This is done by iterating through potential prime factors up to `sqrt(k)`. For each prime factor, count its occurrences. If the count is odd, include that prime factor in the square-free part. After iterating through primes, if `k` is still greater than 1, it means the remaining `k` is a prime factor itself and contributes to the square-free part. b. Add the value `nums[k-1]` to the array associated with `k`'s square-free part in the `Map`. 3. Initialize a variable `maximumSubsetValue` to store the highest sum found. 4. Iterate through all the arrays of `nums` elements (values) stored in the `Map`. For each array, calculate its sum. 5. Update `maximumSubsetValue` with the maximum between its current value and the sum of the current array. 6. Return `maximumSubsetValue`.
 * Dry Run: nums = [1, 2, 3, 4, 5, 6, 7, 8]
 *   arrayLength = 8
 *   indexGroupings = Map{}
 *   maximumSubsetValue = 0
 *
 *   currentNumericIndex = 1:
 *     numberToProcess = 1, squareFreeBase = 1
 *     (prime factorization loop skipped)
 *     numberToProcess = 1 (not > 1)
 *     squareFreeBase = 1
 *     indexGroupings.set(1, [nums[0]=1]) -> Map{1: [1]}
 *
 *   currentNumericIndex = 2:
 *     numberToProcess = 2, squareFreeBase = 1
 *     primeCandidate = 2: 2*2 > 2. Loop doesn't run fully.
 *     numberToProcess = 2 (> 1) -> squareFreeBase *= 2 = 2
 *     squareFreeBase = 2
 *     indexGroupings.set(2, [nums[1]=2]) -> Map{1: [1], 2: [2]}
 *
 *   currentNumericIndex = 3:
 *     numberToProcess = 3, squareFreeBase = 1
 *     primeCandidate = 2: 2*2 > 3. Loop doesn't run fully.
 *     numberToProcess = 3 (> 1) -> squareFreeBase *= 3 = 3
 *     squareFreeBase = 3
 *     indexGroupings.set(3, [nums[2]=3]) -> Map{1: [1], 2: [2], 3: [3]}
 *
 *   currentNumericIndex = 4:
 *     numberToProcess = 4, squareFreeBase = 1
 *     primeCandidate = 2:
 *       primeOccurrences = 0. 4%2==0 -> primeOccurrences=1, numberToProcess=2.
 *       2%2==0 -> primeOccurrences=2, numberToProcess=1.
 *     primeOccurrences = 2 (even) -> squareFreeBase remains 1.
 *     numberToProcess = 1 (not > 1)
 *     squareFreeBase = 1
 *     indexGroupings.get(1).push(nums[3]=4) -> Map{1: [1, 4], 2: [2], 3: [3]}
 *
 *   currentNumericIndex = 5:
 *     numberToProcess = 5, squareFreeBase = 1
 *     primeCandidate = 2: 2*2 <= 5. 5%2!=0.
 *     primeCandidate = 3: 3*3 > 5. Loop ends.
 *     numberToProcess = 5 (> 1) -> squareFreeBase *= 5 = 5
 *     squareFreeBase = 5
 *     indexGroupings.set(5, [nums[4]=5]) -> Map{..., 5: [5]}
 *
 *   currentNumericIndex = 6:
 *     numberToProcess = 6, squareFreeBase = 1
 *     primeCandidate = 2:
 *       primeOccurrences = 0. 6%2==0 -> primeOccurrences=1, numberToProcess=3.
 *     primeOccurrences = 1 (odd) -> squareFreeBase *= 2 = 2.
 *     primeCandidate = 3: 3*3 > 3. Loop ends.
 *     numberToProcess = 3 (> 1) -> squareFreeBase *= 3 = 6
 *     squareFreeBase = 6
 *     indexGroupings.set(6, [nums[5]=6]) -> Map{..., 6: [6]}
 *
 *   currentNumericIndex = 7:
 *     numberToProcess = 7, squareFreeBase = 1
 *     primeCandidate = 2: 2*2 <= 7. 7%2!=0.
 *     primeCandidate = 3: 3*3 > 7. Loop ends.
 *     numberToProcess = 7 (> 1) -> squareFreeBase *= 7 = 7
 *     squareFreeBase = 7
 *     indexGroupings.set(7, [nums[6]=7]) -> Map{..., 7: [7]}
 *
 *   currentNumericIndex = 8:
 *     numberToProcess = 8, squareFreeBase = 1
 *     primeCandidate = 2:
 *       primeOccurrences = 0. 8%2==0 -> primeOccurrences=1, numberToProcess=4.
 *       4%2==0 -> primeOccurrences=2, numberToProcess=2.
 *       2%2==0 -> primeOccurrences=3, numberToProcess=1.
 *     primeOccurrences = 3 (odd) -> squareFreeBase *= 2 = 2.
 *     numberToProcess = 1 (not > 1)
 *     squareFreeBase = 2
 *     indexGroupings.get(2).push(nums[7]=8) -> Map{..., 2: [2, 8]}
 *
 *   Finished processing indices.
 *
 *   Iterating through indexGroupings values:
 *   elementValues = [1, 4]: currentGroupTotal = 1 + 4 = 5. maximumSubsetValue = max(0, 5) = 5.
 *   elementValues = [2, 8]: currentGroupTotal = 2 + 8 = 10. maximumSubsetValue = max(5, 10) = 10.
 *   elementValues = [3]: currentGroupTotal = 3. maximumSubsetValue = max(10, 3) = 10.
 *   elementValues = [5]: currentGroupTotal = 5. maximumSubsetValue = max(10, 5) = 10.
 *   elementValues = [6]: currentGroupTotal = 6. maximumSubsetValue = max(10, 6) = 10.
 *   elementValues = [7]: currentGroupTotal = 7. maximumSubsetValue = max(10, 7) = 10.
 *
 *   Return maximumSubsetValue = 10.
 * Time Complexity: O(N * sqrt(N))
 * Space Complexity: O(N)
 */
var maximumSum = function (nums) {
  const arrayLength = nums.length;
  const indexGroupings = new Map();

  for (
    let currentNumericIndex = 1;
    currentNumericIndex <= arrayLength;
    currentNumericIndex++
  ) {
    let numberToFactor = currentNumericIndex;
    let squareFreeBase = 1;

    for (
      let primeCandidate = 2;
      primeCandidate * primeCandidate <= numberToFactor;
      primeCandidate++
    ) {
      let primeOccurrences = 0;
      while (numberToFactor % primeCandidate === 0) {
        primeOccurrences++;
        numberToFactor /= primeCandidate;
      }
      if (primeOccurrences % 2 === 1) {
        squareFreeBase *= primeCandidate;
      }
    }
    if (numberToFactor > 1) {
      squareFreeBase *= numberToFactor;
    }

    if (!indexGroupings.has(squareFreeBase)) {
      indexGroupings.set(squareFreeBase, []);
    }
    indexGroupings.get(squareFreeBase).push(nums[currentNumericIndex - 1]);
  }

  let maximumElementValueSum = 0;
  for (const elementValues of indexGroupings.values()) {
    const currentGroupTotal = elementValues.reduce(
      (accumulatorValue, currentValue) => accumulatorValue + currentValue,
      0
    );
    maximumElementValueSum = Math.max(
      maximumElementValueSum,
      currentGroupTotal
    );
  }

  return maximumElementValueSum;
};
