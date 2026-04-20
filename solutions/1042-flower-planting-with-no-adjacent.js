/**
 * Flower Planting With No Adjacent
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var gardenNoAdj = function (n, paths) {
  const gardenGraph = new Array(n).fill(null).map(() => new Set());
  const flowerSelections = new Array(n).fill(0);

  for (const currentPathEntry of paths) {
    const [gardenA, gardenB] = currentPathEntry;
    gardenGraph[gardenA - 1].add(gardenB - 1);
    gardenGraph[gardenB - 1].add(gardenA - 1);
  }

  for (let currentGardenIdx = 0; currentGardenIdx < n; currentGardenIdx++) {
    const forbiddenFlowerTypes = new Set();
    const neighborsOfCurrentGarden = gardenGraph[currentGardenIdx];

    for (const connectedGardenIdx of neighborsOfCurrentGarden) {
      forbiddenFlowerTypes.add(flowerSelections[connectedGardenIdx]);
    }

    for (
      let potentialFlowerType = 1;
      potentialFlowerType <= 4;
      potentialFlowerType++
    ) {
      if (!forbiddenFlowerTypes.has(potentialFlowerType)) {
        flowerSelections[currentGardenIdx] = potentialFlowerType;
        break;
      }
    }
  }

  return flowerSelections;
};
