/**
 * The Number Of Good Subsets
 * Intuition: Good subsets are those whose product is square-free (i.e., each prime factor appears at most once). This problem can be modeled as a dynamic programming problem using bitmasks to track the distinct prime factors present in a subset's product.
 * Approach: 1. Count the occurrences of each number (1-30) from the input array `nums` into a frequency map. 2. Define a list of prime numbers up to 30. 3. Initialize a DP array `goodSubsetsCountDP` where `goodSubsetsCountDP[mask]` stores the count of good subsets whose product yields the prime factors represented by `mask`. Initialize `goodSubsetsCountDP[0]` to 1, representing the empty product (or product of only ones). 4. Handle the number 1: Each occurrence of 1 can either be included or excluded, effectively doubling the number of ways for any existing subset. So, multiply `goodSubsetsCountDP[0]` by `2^(frequency of 1)`. 5. Iterate through numbers from 2 to 30. For each number, first determine if it is square-free and, if so, generate a bitmask representing its prime factors. Numbers containing repeated prime factors (e.g., 4=2*2, 6=2*3 but 4 is not square-free) are skipped. 6. If a number `currentCandidateNumber` is square-free with `primeFactorMask`, iterate through all existing `existingSubsetMask` in `goodSubsetsCountDP`. If `primeFactorMask` and `existingSubsetMask` do not share any common prime factors (`(existingSubsetMask & primeFactorMask) === 0`), then new good subsets can be formed. Update `goodSubsetsCountDP[existingSubsetMask | primeFactorMask]` by adding `priorDPStates[existingSubsetMask] * numberFrequencies[currentCandidateNumber]`. Use a snapshot of `goodSubsetsCountDP` from before processing `currentCandidateNumber` to avoid using `currentCandidateNumber` with itself multiple times. 7. Finally, sum up all values in `goodSubsetsCountDP` from `mask = 1` to the maximum mask. This sum represents the total count of good subsets with a product of one or more distinct prime numbers.
 * Dry Run: nums = [1, 2, 3]
 *   moduloValue = 1e9 + 7
 *   primeFactorsList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] (length 10)
 *   numberFrequencies = [0, 1:1, 2:1, 3:1, ...] (size 31)
 *   goodSubsetsCountDP = new Array(1024).fill(0)
 *   goodSubsetsCountDP[0] = 1
 *   numberFrequencies[1] = 1. oneIterationIndex = 0: goodSubsetsCountDP[0] = (1 * 2) % moduloValue = 2
 *   goodSubsetsCountDP = [2, 0, 0, ...]
 *
 *   candidateNumberIteration = 2:
 *     numberFrequencies[2] = 1.
 *     primeFactorMask = 0. isSquareFreeCandidate = true.
 *     primeIterator = 0 (primeFactorsList[0] = 2): tempNumberForFactorization = 2. factorOccurrenceCount = 1. primeFactorMask = (0 | (1 << 0)) = 1. tempNumberForFactorization = 1.
 *     primeIterator = 1 (primeFactorsList[1] = 3): tempNumberForFactorization = 1. factorOccurrenceCount = 0.
 *     ... (remaining primes) ...
 *     isSquareFreeCandidate remains true. primeFactorMask = 1 (represents prime 2).
 *     priorDPStates = [2, 0, 0, ...] (a copy of goodSubsetsCountDP before considering 2)
 *     maskStateIterator = 0: (0 & 1) === 0.
 *       goodSubsetsCountDP[0 | 1] = (goodSubsetsCountDP[1] + priorDPStates[0] * numberFrequencies[2]) % moduloValue
 *       goodSubsetsCountDP[1] = (0 + 2 * 1) % moduloValue = 2
 *     maskStateIterator = 1: (1 & 1) !== 0. (skip)
 *     ...
 *   goodSubsetsCountDP = [2, 2, 0, 0, ...] (mask 0: {}, {1} | mask 1: {2}, {1,2})
 *
 *   candidateNumberIteration = 3:
 *     numberFrequencies[3] = 1.
 *     primeFactorMask = 0. isSquareFreeCandidate = true.
 *     primeIterator = 0 (primeFactorsList[0] = 2): tempNumberForFactorization = 3. factorOccurrenceCount = 0.
 *     primeIterator = 1 (primeFactorsList[1] = 3): tempNumberForFactorization = 3. factorOccurrenceCount = 1. primeFactorMask = (0 | (1 << 1)) = 2. tempNumberForFactorization = 1.
 *     ... (remaining primes) ...
 *     isSquareFreeCandidate remains true. primeFactorMask = 2 (represents prime 3).
 *     priorDPStates = [2, 2, 0, 0, ...] (copy before considering 3)
 *     maskStateIterator = 0: (0 & 2) === 0.
 *       goodSubsetsCountDP[0 | 2] = (goodSubsetsCountDP[2] + priorDPStates[0] * numberFrequencies[3]) % moduloValue
 *       goodSubsetsCountDP[2] = (0 + 2 * 1) % moduloValue = 2
 *     maskStateIterator = 1: (1 & 2) === 0.
 *       goodSubsetsCountDP[1 | 2] = (goodSubsetsCountDP[3] + priorDPStates[1] * numberFrequencies[3]) % moduloValue
 *       goodSubsetsCountDP[3] = (0 + 2 * 1) % moduloValue = 2
 *     maskStateIterator = 2: (2 & 2) !== 0. (skip)
 *     maskStateIterator = 3: (3 & 2) !== 0. (skip)
 *     ...
 *   goodSubsetsCountDP = [2, 2, 2, 2, ...] (mask 0: {}, {1} | mask 1: {2}, {1,2} | mask 2: {3}, {1,3} | mask 3: {2,3}, {1,2,3})
 *
 *   finalGoodSubsetsTotal calculation:
 *   totalSumIterator = 1: finalGoodSubsetsTotal = (0 + goodSubsetsCountDP[1]) % moduloValue = 2
 *   totalSumIterator = 2: finalGoodSubsetsTotal = (2 + goodSubsetsCountDP[2]) % moduloValue = 4
 *   totalSumIterator = 3: finalGoodSubsetsTotal = (4 + goodSubsetsCountDP[3]) % moduloValue = 6
 *   Result: 6.
 * Time Complexity: O(N + M * P + M * 2^P)
 * Space Complexity: O(M + 2^P)
 */
var numberOfGoodSubsets = function (nums) {
  const moduloValue = 1e9 + 7;
  const primeFactorsList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const numberFrequencies = new Array(31).fill(0);

  for (
    let arrayElementIndex = 0;
    arrayElementIndex < nums.length;
    arrayElementIndex++
  ) {
    numberFrequencies[nums[arrayElementIndex]]++;
  }

  const goodSubsetsCountDP = new Array(1 << primeFactorsList.length).fill(0);
  goodSubsetsCountDP[0] = 1;

  for (
    let oneIterationIndex = 0;
    oneIterationIndex < numberFrequencies[1];
    oneIterationIndex++
  ) {
    goodSubsetsCountDP[0] = (goodSubsetsCountDP[0] * 2) % moduloValue;
  }

  for (
    let candidateNumberIteration = 2;
    candidateNumberIteration <= 30;
    candidateNumberIteration++
  ) {
    if (numberFrequencies[candidateNumberIteration] === 0) continue;

    let primeFactorMask = 0;
    let isSquareFreeCandidate = true;
    let tempNumberForFactorization = candidateNumberIteration;

    for (
      let primeIterator = 0;
      primeIterator < primeFactorsList.length;
      primeIterator++
    ) {
      let factorOccurrenceCount = 0;
      let currentPrimeDivisor = primeFactorsList[primeIterator];
      while (tempNumberForFactorization % currentPrimeDivisor === 0) {
        factorOccurrenceCount++;
        tempNumberForFactorization /= currentPrimeDivisor;
      }
      if (factorOccurrenceCount > 1) {
        isSquareFreeCandidate = false;
        break;
      }
      if (factorOccurrenceCount === 1) {
        primeFactorMask |= 1 << primeIterator;
      }
    }

    if (!isSquareFreeCandidate) continue;

    const priorDPStates = Array.from(goodSubsetsCountDP); // Using Array.from for distinct control flow

    for (
      let maskStateIterator = 0;
      maskStateIterator < 1 << primeFactorsList.length;
      maskStateIterator++
    ) {
      if ((maskStateIterator & primeFactorMask) === 0) {
        goodSubsetsCountDP[maskStateIterator | primeFactorMask] =
          (goodSubsetsCountDP[maskStateIterator | primeFactorMask] +
            priorDPStates[maskStateIterator] *
              numberFrequencies[candidateNumberIteration]) %
          moduloValue;
      }
    }
  }

  let finalGoodSubsetsTotal = 0;
  for (
    let totalSumIterator = 1;
    totalSumIterator < 1 << primeFactorsList.length;
    totalSumIterator++
  ) {
    finalGoodSubsetsTotal =
      (finalGoodSubsetsTotal + goodSubsetsCountDP[totalSumIterator]) %
      moduloValue;
  }

  return finalGoodSubsetsTotal;
};
