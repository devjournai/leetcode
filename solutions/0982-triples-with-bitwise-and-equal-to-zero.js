/**
 * Triples With Bitwise And Equal To Zero
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
