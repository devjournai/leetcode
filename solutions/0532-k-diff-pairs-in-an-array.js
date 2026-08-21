/**
 * K Diff Pairs In An Array
 * Intuition: Unique pairs `(x, x+k)` with `k>=0`. For k=0 count values that appear at least twice; otherwise check a set for `x+k`.
 * Approach: 1. If `k<0` return 0. 2. If `k===0`, frequency-map and count values with freq ≥ 2. 3. Else put nums in a Set and for each distinct `x` increment if `x+k` is in the set.
 * Dry Run: nums = [3,1,4,1,5], k = 2.
 *   - Distinct {1,3,4,5}. Pairs 1+2=3, 3+2=5. Count 2. (4+2=6 missing.)
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
        (numberFrequencies.get(iteratedNumber) || 0) + 1
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
