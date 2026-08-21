/**
 * Largest Values From Labels
 * Intuition: Maximize the sum by taking the globally largest values first, subject to numWanted items and at most useLimit per label — a greedy sort plus a per-label counter.
 * Approach: 1. Pair value with label and sort by value descending. 2. Walk the list; take an item if under numWanted and that label’s count < useLimit. 3. Return the accumulated sum.
 * Dry Run: values=[5,4,3,2,1], labels=[1,1,2,2,3], numWanted=3, useLimit=1. Take 5 (label1), 3 (label2), 1 (label3) → 9.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var largestValsFromLabels = function (values, labels, numWanted, useLimit) {
  const itemDetailList = values.map((valElement, indexPosition) => ({
    itemValue: valElement,
    itemLabel: labels[indexPosition],
  }));

  itemDetailList.sort(
    (firstItemData, secondItemData) =>
      secondItemData.itemValue - firstItemData.itemValue
  );

  const labelOccurrencesMap = new Map();
  let cumulativeSum = 0;
  let itemsChosenCount = 0;

  for (const currentProcessedItem of itemDetailList) {
    const currentItemVal = currentProcessedItem.itemValue;
    const currentItemLab = currentProcessedItem.itemLabel;

    const labelCurrentPickedCount =
      labelOccurrencesMap.get(currentItemLab) || 0;

    if (itemsChosenCount < numWanted && labelCurrentPickedCount < useLimit) {
      cumulativeSum += currentItemVal;
      labelOccurrencesMap.set(currentItemLab, labelCurrentPickedCount + 1);
      itemsChosenCount++;
    }
  }

  return cumulativeSum;
};
