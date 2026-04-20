/**
 * Largest Values From Labels
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
      secondItemData.itemValue - firstItemData.itemValue,
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
