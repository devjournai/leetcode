/**
 * Triples With Bitwise And Equal To Zero
 * Intuition: Pre-count every pairwise AND in `andProductFrequencies`, then for each third number add frequencies of masks whose AND with it is 0.
 * Approach: 1. Allocate a 2^16 frequency array. 2. Double loop all pairs, increment `nums[i] & nums[j]`. 3. For each third value, scan all masks with positive count; if `(mask & num)===0` add that count. 4. Return `finalAnswerCount`.
 * Dry Run: nums = [2,1,3]. Pair ANDs include 0 (2&1). 0 & 3 === 0 contributes. All ordered triples with AND 0 are counted (including permutations). Answer 12.
 * Time Complexity: O(N^2 + N * MAX_VAL)
 * Space Complexity: O(MAX_VAL)
 */
var countTriplets = function (nums) {
  const maxPossibleValue = 1 << 16;
  const andProductFrequencies = new Array(maxPossibleValue).fill(0);

  const totalElements = nums.length;

  for (let firstPointer = 0; firstPointer < totalElements; ++firstPointer) {
    for (
      let secondPointer = 0;
      secondPointer < totalElements;
      ++secondPointer
    ) {
      const currentAndPairResult = nums[firstPointer] & nums[secondPointer];
      andProductFrequencies[currentAndPairResult]++;
    }
  }

  let finalAnswerCount = 0;

  for (let thirdPointer = 0; thirdPointer < totalElements; ++thirdPointer) {
    const currentNumForThird = nums[thirdPointer];

    for (
      let currentProductValue = 0;
      currentProductValue < maxPossibleValue;
      ++currentProductValue
    ) {
      if (andProductFrequencies[currentProductValue] > 0) {
        if ((currentProductValue & currentNumForThird) === 0) {
          finalAnswerCount += andProductFrequencies[currentProductValue];
        }
      }
    }
  }

  return finalAnswerCount;
};
