/**
 * Count Number Of Nice Subarrays
 * Intuition: A subarray is nice when it contains exactly k odds. Prefix odd counts turn that into “how many earlier prefixes had oddCount-k”.
 * Approach: 1. Map oddFrequencyMap starts as {0:1}. 2. Scan nums, adding 1 to currentOddCount for each odd. 3. Add oddFrequencyMap[currentOddCount-k] to the answer. 4. Increment the frequency of currentOddCount. 5. Return totalNiceSubarrays.
 * Dry Run: nums = [1,1,2,1,1], k = 3
 *   start map {0:1}, odd=0, ans=0
 *   1: odd=1, need=-2 miss, map {0:1,1:1}
 *   1: odd=2, need=-1 miss, map {0:1,1:1,2:1}
 *   2: odd=2, need=-1 miss, map {0:1,1:1,2:2}
 *   1: odd=3, need=0 -> +1, map {...,3:1} ans=1
 *   1: odd=4, need=1 -> +1, ans=2. Return 2.
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
      (oddFrequencyMap.get(currentOddCount) || 0) + 1
    );
  }

  return totalNiceSubarrays;
};
