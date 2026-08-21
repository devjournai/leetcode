/**
 * Flower Planting With No Adjacent
 * Intuition: The graph is 4-colorable with degree at most 3, so each garden always has a free color among 1..4 after looking at neighbors.
 * Approach: 1. Build undirected adjacency sets (1-indexed gardens shifted to 0). 2. For each garden, collect neighbor colors. 3. Assign the first color in 1..4 that is unused.
 * Dry Run: n=3, paths=[[1,2],[2,3],[3,1]].
 *   - Garden 0 takes 1, garden 1 cannot use 1 so 2, garden 2 cannot use 1 or 2 so 3. [1,2,3].
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
