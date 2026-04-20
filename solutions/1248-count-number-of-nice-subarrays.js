/**
 * Count Number Of Nice Subarrays
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var numberOfSubarrays = function (nums, k) {
  const oddFrequencyMap = new Map([[0, 1]]);
  let currentOddCount = 0;
  let totalNiceSubarrays = 0;

  for (const singleNumber of nums) {
    currentOddCount += singleNumber % 2;

    const neededOddCount = currentOddCount - k;
    if (oddFrequencyMap.has(neededOddCount)) {
      totalNiceSubarrays += oddFrequencyMap.get(neededOddCount);
    }

    oddFrequencyMap.set(
      currentOddCount,
      (oddFrequencyMap.get(currentOddCount) || 0) + 1,
    );
  }

  return totalNiceSubarrays;
};
