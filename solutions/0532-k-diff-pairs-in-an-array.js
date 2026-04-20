/**
 * K Diff Pairs In An Array
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findPairs = function (nums, k) {
  if (k < 0) {
    return 0;
  }

  let resultCount = 0;

  if (k === 0) {
    const numberFrequencies = new Map();
    for (const iteratedNumber of nums) {
      numberFrequencies.set(
        iteratedNumber,
        (numberFrequencies.get(iteratedNumber) || 0) + 1,
      );
    }

    for (const frequencyValue of numberFrequencies.values()) {
      if (frequencyValue >= 2) {
        resultCount++;
      }
    }
  } else {
    // k > 0
    const distinctValuesSet = new Set(nums);

    for (const individualElement of distinctValuesSet) {
      const requiredPairValue = individualElement + k;
      if (distinctValuesSet.has(requiredPairValue)) {
        resultCount++;
      }
    }
  }

  return resultCount;
};
