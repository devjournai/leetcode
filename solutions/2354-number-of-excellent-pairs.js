/**
 * Number Of Excellent Pairs
 * Intuition: The problem condition `popcount(num1 | num2) + popcount(num1 & num2) >= k` can be simplified using the bitwise identity `popcount(A | B) + popcount(A & B) = popcount(A) + popcount(B)`. Thus, we only need to find pairs of numbers (num1, num2) such that `popcount(num1) + popcount(num2) >= k`. The problem asks for distinct pairs (a, b) and (c, d) if `a != c` or `b != d`. This implies we should consider unique numbers from `nums` and then count how many distinct numbers have a certain popcount.
 * Approach: 1. Extract all unique numbers from the input array `nums` into a Set. 2. For each unique number, calculate its popcount (number of set bits). 3. Store the frequencies of these popcounts in a Map, where keys are popcounts and values are the count of unique numbers having that popcount. 4. Iterate through all possible pairs of popcounts stored in the Map. If the sum of a pair of popcounts is greater than or equal to `k`, multiply their corresponding frequencies (from the Map) and add to the total count.
 * Dry Run: nums = [1, 2, 2, 3], k = 3
 * 1. uniqueNumbers (Set):
 *    - Add 1: {1}
 *    - Add 2: {1, 2}
 *    - Add 2 (no change): {1, 2}
 *    - Add 3: {1, 2, 3}
 *    Result: uniqueNumbers = {1, 2, 3}
 *
 * 2. popcountCounts (Map):
 *    - Process 1: popcount(1) = 1. popcountCounts = {1: 1}
 *    - Process 2: popcount(2) = 1. popcountCounts = {1: 2} (increment count for popcount 1)
 *    - Process 3: popcount(3) = 2. popcountCounts = {1: 2, 2: 1}
 *    Result: popcountCounts = {1: 2, 2: 1}
 *
 * 3. allPopcounts (Array): [1, 2]
 * 4. excellentPairCount = 0
 *
 * 5. Nested while loops (over allPopcounts):
 *    - outerLoopIndex = 0 (firstPopcount = 1, firstPopcountFrequency = 2)
 *      - innerLoopIndex = 0 (secondPopcount = 1, secondPopcountFrequency = 2)
 *        - sumOfBitCounts = 1 + 1 = 2. Is 2 >= 3? No.
 *      - innerLoopIndex = 1 (secondPopcount = 2, secondPopcountFrequency = 1)
 *        - sumOfBitCounts = 1 + 2 = 3. Is 3 >= 3? Yes.
 *        - excellentPairCount += 2 * 1 = 2. excellentPairCount = 2.
 *    - outerLoopIndex = 1 (firstPopcount = 2, firstPopcountFrequency = 1)
 *      - innerLoopIndex = 0 (secondPopcount = 1, secondPopcountFrequency = 2)
 *        - sumOfBitCounts = 2 + 1 = 3. Is 3 >= 3? Yes.
 *        - excellentPairCount += 1 * 2 = 2. excellentPairCount = 2 + 2 = 4.
 *      - innerLoopIndex = 1 (secondPopcount = 2, secondPopcountFrequency = 1)
 *        - sumOfBitCounts = 2 + 2 = 4. Is 4 >= 3? Yes.
 *        - excellentPairCount += 1 * 1 = 1. excellentPairCount = 4 + 1 = 5.
 *
 * Final Result: 5
 * Time Complexity: O(N * log(maxNum) + P^2)
 * Space Complexity: O(N + P)
 */
var countExcellentPairs = function (nums, k) {
  const uniqueNumbers = new Set();
  for (const currentNumber of nums) {
    uniqueNumbers.add(currentNumber);
  }

  const popcountCounts = new Map();
  uniqueNumbers.forEach(function (numberToProcess) {
    const currentBitCount = numberToProcess
      .toString(2)
      .split("0")
      .join("").length;
    const existingCount = popcountCounts.get(currentBitCount) || 0;
    popcountCounts.set(currentBitCount, existingCount + 1);
  });

  let excellentPairCount = 0;
  const allPopcounts = Array.from(popcountCounts.keys());

  let outerLoopIndex = 0;
  while (outerLoopIndex < allPopcounts.length) {
    const firstPopcount = allPopcounts[outerLoopIndex];
    const firstPopcountFrequency = popcountCounts.get(firstPopcount);

    let innerLoopIndex = 0;
    while (innerLoopIndex < allPopcounts.length) {
      const secondPopcount = allPopcounts[innerLoopIndex];
      const secondPopcountFrequency = popcountCounts.get(secondPopcount);

      const sumOfBitCounts = firstPopcount + secondPopcount;
      if (sumOfBitCounts >= k) {
        excellentPairCount += firstPopcountFrequency * secondPopcountFrequency;
      }
      innerLoopIndex++;
    }
    outerLoopIndex++;
  }

  return excellentPairCount;
};
