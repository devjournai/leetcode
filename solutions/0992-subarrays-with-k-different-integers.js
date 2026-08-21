/**
 * Subarrays With K Different Integers
 * Intuition: Number of subarrays with exactly k distinct = (at most k) − (at most k−1), each counted with a sliding window over `elementFrequencies.size`.
 * Approach: 1. `calculateSubarraysAtMostK` grows right, shrinks left while size > limit, adds window length each step. 2. Return `calculateSubarraysAtMostK(k) - calculateSubarraysAtMostK(k-1)`.
 * Dry Run: nums = [1,2,1,2,3], k=2. At most 2 is 10, at most 1 is 3, difference 7.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var subarraysWithKDistinct = function (nums, k) {
  const calculateSubarraysAtMostK = (maximumDistinctCount) => {
    if (maximumDistinctCount < 0) {
      return 0;
    }

    const elementFrequencies = new Map();
    let currentWindowLeft = 0;
    let totalGoodSubarrays = 0;

    for (
      let currentWindowRight = 0;
      currentWindowRight < nums.length;
      currentWindowRight++
    ) {
      const rightElement = nums[currentWindowRight];
      elementFrequencies.set(
        rightElement,
        (elementFrequencies.get(rightElement) || 0) + 1
      );

      while (elementFrequencies.size > maximumDistinctCount) {
        const leftElement = nums[currentWindowLeft];
        elementFrequencies.set(
          leftElement,
          elementFrequencies.get(leftElement) - 1
        );
        if (elementFrequencies.get(leftElement) === 0) {
          elementFrequencies.delete(leftElement);
        }
        currentWindowLeft++;
      }

      totalGoodSubarrays += currentWindowRight - currentWindowLeft + 1;
    }

    return totalGoodSubarrays;
  };

  const countExactK = calculateSubarraysAtMostK(k);
  const countExactKMinusOne = calculateSubarraysAtMostK(k - 1);

  return countExactK - countExactKMinusOne;
};
