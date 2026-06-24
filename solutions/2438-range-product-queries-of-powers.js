/**
 * Range Product Queries Of Powers
 * Intuition: The problem asks to find products of powers of 2. The powers of 2 that sum to `n` are precisely its set bits in binary representation. For example, if `n` is 13 (binary 1101), its set bits are at positions 0, 2, and 3, corresponding to 2^0=1, 2^2=4, and 2^3=8. The product of a range of these powers can be efficiently calculated by iterating through the specified range in the pre-computed powers array and applying modulo arithmetic.
 * Approach: 1. Construct an array `basePowers` containing powers of 2 that sum to `n`. This is achieved by iterating through the bits of `n`: if the k-th bit is set, then 2^k is added to `basePowers`. This naturally sorts `basePowers` in non-decreasing order. 2. Initialize an empty array `finalResults` to store the answers for each query. 3. For each query `[rangeStart, rangeEnd]` in the input `queries` array, calculate the product of `basePowers[powerElementIndex]` for `powerElementIndex` from `rangeStart` to `rangeEnd`. 4. Ensure that the product is taken modulo `10^9 + 7` at each multiplication step to prevent overflow. 5. Add the computed product to `finalResults`. 6. Return `finalResults`.
 * Dry Run: n = 13, queries = [[0,0], [1,2]]
 * moduloValue = 10^9 + 7
 *
 * 1. Generate basePowers:
 *    initialNumber = 13 (binary 1101)
 *    basePowers = []
 *    remainingNumber = 13
 *    currentBit = 0
 *    - Loop 1: (remainingNumber & 1) is 1. basePowers.push(1 << 0) => basePowers = [1]. remainingNumber = 6. currentBit = 1.
 *    - Loop 2: (remainingNumber & 1) is 0. remainingNumber = 3. currentBit = 2.
 *    - Loop 3: (remainingNumber & 1) is 1. basePowers.push(1 << 2) => basePowers = [1, 4]. remainingNumber = 1. currentBit = 3.
 *    - Loop 4: (remainingNumber & 1) is 1. basePowers.push(1 << 3) => basePowers = [1, 4, 8]. remainingNumber = 0. currentBit = 4.
 *    Loop terminates. basePowers = [1, 4, 8].
 *
 * 2. Process queries:
 *    queryRequests = [[0,0], [1,2]]
 *    finalResults = []
 *
 *    - queryIteration = 0: currentQuery = [0,0]
 *      rangeStart = 0, rangeEnd = 0
 *      currentRangeProduct = 1
 *      - Inner loop (powerElementIndex from 0 to 0):
 *        - powerElementIndex = 0: currentRangeProduct = (1 * basePowers[0]) % moduloValue = (1 * 1) % moduloValue = 1.
 *      Inner loop ends.
 *      finalResults.push(1) => finalResults = [1].
 *
 *    - queryIteration = 1: currentQuery = [1,2]
 *      rangeStart = 1, rangeEnd = 2
 *      currentRangeProduct = 1
 *      - Inner loop (powerElementIndex from 1 to 2):
 *        - powerElementIndex = 1: currentRangeProduct = (1 * basePowers[1]) % moduloValue = (1 * 4) % moduloValue = 4.
 *        - powerElementIndex = 2: currentRangeProduct = (4 * basePowers[2]) % moduloValue = (4 * 8) % moduloValue = 32.
 *      Inner loop ends.
 *      finalResults.push(32) => finalResults = [1, 32].
 *
 *    Loop terminates.
 *
 * 3. Return finalResults = [1, 32].
 *
 * Time Complexity: O(log N + Q * log N)
 * Space Complexity: O(log N + Q)
 */
var productQueries = function (n, queries) {
  const moduloValue = 1e9 + 7;
  const basePowers = [];
  let remainingNumber = n;
  let currentBit = 0;

  while (remainingNumber > 0) {
    if ((remainingNumber & 1) === 1) {
      basePowers.push(1 << currentBit);
    }
    remainingNumber >>= 1;
    currentBit++;
  }

  const finalResults = [];
  let queryIteration = 0;

  for (queryIteration = 0; queryIteration < queries.length; queryIteration++) {
    const currentQuery = queries[queryIteration];
    const rangeStart = currentQuery[0];
    const rangeEnd = currentQuery[1];
    let currentRangeProduct = 1;
    let powerElementIndex = rangeStart;

    for (
      powerElementIndex = rangeStart;
      powerElementIndex <= rangeEnd;
      powerElementIndex++
    ) {
      currentRangeProduct =
        (currentRangeProduct * basePowers[powerElementIndex]) % moduloValue;
    }
    finalResults.push(currentRangeProduct);
  }

  return finalResults;
};
