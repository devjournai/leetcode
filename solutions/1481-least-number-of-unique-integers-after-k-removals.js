/**
 * Least Number Of Unique Integers After K Removals
 * Time Complexity: O(N + U log U)
 * Space Complexity: O(U)
 */
var findLeastNumOfUniqueInts = function (inputNumbers, removalCount) {
  const elementFrequencyMap = new Map();
  for (const numberValue of inputNumbers) {
    elementFrequencyMap.set(
      numberValue,
      (elementFrequencyMap.get(numberValue) || 0) + 1,
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
