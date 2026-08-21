/**
 * Least Number Of Unique Integers After K Removals
 * Intuition: Removing the rarest values first eliminates whole unique integers fastest. Sort frequencies ascending and greedily subtract from k.
 * Approach: 1. Count frequencies in a Map. 2. Sort the frequency list. 3. While k covers the next frequency, subtract it and drop one unique. 4. Return remaining unique count.
 * Dry Run: arr = [5,5,4], k = 1
 *   - freq 4:1, 5:2 sorted [1,2]
 *   - remove the single 4, uniques become 1
 * Time Complexity: O(N + U log U)
 * Space Complexity: O(U)
 */
var findLeastNumOfUniqueInts = function (inputNumbers, removalCount) {
  const elementFrequencyMap = new Map();
  for (const numberValue of inputNumbers) {
    elementFrequencyMap.set(
      numberValue,
      (elementFrequencyMap.get(numberValue) || 0) + 1
    );
  }

  const allFrequencies = Array.from(elementFrequencyMap.values());
  allFrequencies.sort((freqA, freqB) => freqA - freqB);

  let finalUniqueEntities = allFrequencies.length;
  let availableRemovals = removalCount;

  for (const currentFrequencyItem of allFrequencies) {
    if (availableRemovals >= currentFrequencyItem) {
      availableRemovals -= currentFrequencyItem;
      finalUniqueEntities--;
    } else {
      break;
    }
  }

  return finalUniqueEntities;
};
