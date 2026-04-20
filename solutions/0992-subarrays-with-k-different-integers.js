/**
 * Subarrays With K Different Integers
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
        (elementFrequencies.get(rightElement) || 0) + 1,
      );

      while (elementFrequencies.size > maximumDistinctCount) {
        const leftElement = nums[currentWindowLeft];
        elementFrequencies.set(
          leftElement,
          elementFrequencies.get(leftElement) - 1,
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
