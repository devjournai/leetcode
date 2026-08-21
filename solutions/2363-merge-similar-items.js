/**
 * Merge Similar Items
 * Intuition: A hash map (or Map in JavaScript) is suitable to aggregate weights by value, as it provides efficient lookups and updates for unique item values.
 * Approach: 1. Initialize a Map to store item values as keys and their summed weights as values. 2. Iterate through the first list of items, updating the Map for each item's value and weight. 3. Iterate through the second list of items, again updating the Map for each item's value and weight. 4. Convert the entries from the Map into a 2D array format. 5. Sort this resulting array based on the item values in ascending order.
 * Dry Run:
 *   items1 = [[1,1],[4,5]]
 *   items2 = [[1,4],[2,3]]
 *
 *   1. valueWeightMap = new Map()
 *
 *   2. Processing items1 (for...of loop):
 *      - itemEntry1 = [1,1]: currentValue1 = 1, currentWeight1 = 1. valueWeightMap.set(1, (0) + 1) -> {1: 1}
 *      - itemEntry1 = [4,5]: currentValue1 = 4, currentWeight1 = 5. valueWeightMap.set(4, (0) + 5) -> {1: 1, 4: 5}
 *
 *   3. Processing items2 (for loop with index):
 *      - index2 = 0, itemEntry2 = [1,4]: currentValue2 = 1, currentWeight2 = 4. valueWeightMap.set(1, (1) + 4) -> {1: 5, 4: 5}
 *      - index2 = 1, itemEntry2 = [2,3]: currentValue2 = 2, currentWeight2 = 3. valueWeightMap.set(2, (0) + 3) -> {1: 5, 4: 5, 2: 3}
 *
 *   4. Converting map to array (forEach method):
 *      - aggregatedList = []
 *      - For {1: 5}: mapValueKey = 1, mapWeightSum = 5. processedItem = [1, 5]. aggregatedList = [[1, 5]]
 *      - For {4: 5}: mapValueKey = 4, mapWeightSum = 5. processedItem = [4, 5]. aggregatedList = [[1, 5], [4, 5]]
 *      - For {2: 3}: mapValueKey = 2, mapWeightSum = 3. processedItem = [2, 3]. aggregatedList = [[1, 5], [4, 5], [2, 3]]
 *
 *   5. Sorting aggregatedList:
 *      - finalSortedResult = [[1, 5], [2, 3], [4, 5]]
 *
 *   Return: [[1, 5], [2, 3], [4, 5]]
 * Time Complexity: O((N + M) log (N + M))
 * Space Complexity: O(N + M)
 */
var mergeSimilarItems = function (items1, items2) {
  const valueWeightMap = new Map();

  for (const itemEntry1 of items1) {
    const currentValue1 = itemEntry1[0];
    const currentWeight1 = itemEntry1[1];
    valueWeightMap.set(
      currentValue1,
      (valueWeightMap.get(currentValue1) || 0) + currentWeight1
    );
  }

  for (let index2 = 0; index2 < items2.length; index2++) {
    const itemEntry2 = items2[index2];
    const currentValue2 = itemEntry2[0];
    const currentWeight2 = itemEntry2[1];
    valueWeightMap.set(
      currentValue2,
      (valueWeightMap.get(currentValue2) || 0) + currentWeight2
    );
  }

  const aggregatedList = [];
  valueWeightMap.forEach((mapWeightSum, mapValueKey) => {
    const processedItem = [mapValueKey, mapWeightSum];
    aggregatedList.push(processedItem);
  });

  const finalSortedResult = aggregatedList.sort(
    (itemA, itemB) => itemA[0] - itemB[0]
  );

  return finalSortedResult;
};
