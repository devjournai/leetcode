/**
 * Paint House II
 * Time Complexity: O(n * k)
 * Space Complexity: O(k)
 */
var minCostII = function (initialCosts) {
  const totalHouses = initialCosts.length;
  if (totalHouses === 0) {
    return 0;
  }

  const totalColors = initialCosts[0].length;
  if (totalColors === 0) {
    return 0;
  }

  let minimumCostsBefore = [...initialCosts[0]];

  for (let houseIter = 1; houseIter < totalHouses; houseIter++) {
    let primaryMinVal = Infinity;
    let secondaryMinVal = Infinity;
    let primaryMinIdx = -1;

    let colorScanIndex = 0;
    while (colorScanIndex < totalColors) {
      let previousCostValue = minimumCostsBefore[colorScanIndex];
      if (previousCostValue < primaryMinVal) {
        secondaryMinVal = primaryMinVal;
        primaryMinVal = previousCostValue;
        primaryMinIdx = colorScanIndex;
      } else if (previousCostValue < secondaryMinVal) {
        secondaryMinVal = previousCostValue;
      }
      colorScanIndex++;
    }

    let minimumCostsAfterCurrentHouse = new Array(totalColors);
    let currentHouseColorIndex = 0;
    for (
      currentHouseColorIndex = 0;
      currentHouseColorIndex < totalColors;
      currentHouseColorIndex++
    ) {
      let paintingCostForCurrentColor =
        initialCosts[houseIter][currentHouseColorIndex];
      let costFromPreviousLayer;

      if (currentHouseColorIndex === primaryMinIdx) {
        costFromPreviousLayer = secondaryMinVal;
      } else {
        costFromPreviousLayer = primaryMinVal;
      }
      minimumCostsAfterCurrentHouse[currentHouseColorIndex] =
        paintingCostForCurrentColor + costFromPreviousLayer;
    }
    minimumCostsBefore = minimumCostsAfterCurrentHouse;
  }

  let overallMinimum = Infinity;
  let finalScanIndex = 0;
  while (finalScanIndex < totalColors) {
    if (minimumCostsBefore[finalScanIndex] < overallMinimum) {
      overallMinimum = minimumCostsBefore[finalScanIndex];
    }
    finalScanIndex++;
  }

  return overallMinimum;
};
