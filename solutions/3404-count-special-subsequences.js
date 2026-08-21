/**
 * Count Special Subsequences
 * Intuition: We need indices p < q < r < s with a gap of at least 1 between neighbors and nums[p] * nums[r] == nums[q] * nums[s], i.e. reduced fractions nums[p]/nums[q] == nums[s]/nums[r].
 * Approach: 1. Sweep r from left to right with q = r - 2. 2. Before querying, add all pairs (p, q) with p <= q - 2 into a 2D count of reduced (nums[p]/g, nums[q]/g). 3. For each s >= r + 2, add count[nums[s]/g][nums[r]/g].
 * Dry Run: nums = [1,2,3,4,3,6,4]. One special tuple is (0,2,4,5): 1*3 == 3*1 after matching ratios 1/3 and 6/3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(MAX^2)
 */

var numberOfSubsequences = function (nums) {
  const gcd = (firstValue, secondValue) => {
    while (secondValue !== 0) {
      const remainder = firstValue % secondValue;
      firstValue = secondValue;
      secondValue = remainder;
    }
    return firstValue;
  };

  const length = nums.length;
  const maximumValue = Math.max(...nums);
  const reducedPairCount = Array.from({ length: maximumValue + 1 }, () =>
    new Array(maximumValue + 1).fill(0)
  );
  let specialCount = 0;

  for (let thirdIndex = 4; thirdIndex <= length - 3; thirdIndex++) {
    const secondIndex = thirdIndex - 2;
    for (let firstIndex = 0; firstIndex <= secondIndex - 2; firstIndex++) {
      const divisor = gcd(nums[firstIndex], nums[secondIndex]);
      reducedPairCount[nums[firstIndex] / divisor][
        nums[secondIndex] / divisor
      ]++;
    }
    for (
      let fourthIndex = thirdIndex + 2;
      fourthIndex < length;
      fourthIndex++
    ) {
      const divisor = gcd(nums[fourthIndex], nums[thirdIndex]);
      specialCount +=
        reducedPairCount[nums[fourthIndex] / divisor][
          nums[thirdIndex] / divisor
        ];
    }
  }

  return specialCount;
};
