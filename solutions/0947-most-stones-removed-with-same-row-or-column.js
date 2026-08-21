/**
 * Most Stones Removed With Same Row Or Column
 * Intuition: Stones that share a row or column are in one connected component; you can remove all but one stone per component. Answer is n − (number of components).
 * Approach: 1. Union-Find on stone indices (`searchRoot`/`unifySets`). 2. First stone in a row/column becomes that row/column’s representative; later stones union with it. 3. Count distinct roots. 4. Return stoneCount − that size.
 * Dry Run: stones (0,0),(0,1),(1,0) all connect through row 0 / col 0 → 1 component → remove 2.
 * Time Complexity: O(N * α(N))
 * Space Complexity: O(N)
 */
var removeStones = function (stones) {
  const parentMap = new Map();

  const searchRoot = (nodeIdentifier) => {
    if (!parentMap.has(nodeIdentifier)) {
      parentMap.set(nodeIdentifier, nodeIdentifier);
    }
    if (parentMap.get(nodeIdentifier) !== nodeIdentifier) {
      parentMap.set(nodeIdentifier, searchRoot(parentMap.get(nodeIdentifier)));
    }
    return parentMap.get(nodeIdentifier);
  };

  const unifySets = (firstNode, secondNode) => {
    const rootOne = searchRoot(firstNode);
    const rootTwo = searchRoot(secondNode);
    if (rootOne !== rootTwo) {
      parentMap.set(rootOne, rootTwo);
    }
  };

  const stoneCount = stones.length;
  const rowRepresentativeTracker = new Map();
  const columnRepresentativeTracker = new Map();

  for (let indexVar = 0; indexVar < stoneCount; indexVar++) {
    const currentStoneLocation = stones[indexVar];
    const currentStoneRow = currentStoneLocation[0];
    const currentStoneColumn = currentStoneLocation[1];

    if (rowRepresentativeTracker.has(currentStoneRow)) {
      unifySets(indexVar, rowRepresentativeTracker.get(currentStoneRow));
    } else {
      rowRepresentativeTracker.set(currentStoneRow, indexVar);
    }

    if (columnRepresentativeTracker.has(currentStoneColumn)) {
      unifySets(indexVar, columnRepresentativeTracker.get(currentStoneColumn));
    } else {
      columnRepresentativeTracker.set(currentStoneColumn, indexVar);
    }
  }

  const distinctRootSet = new Set();
  for (let iterateIndex = 0; iterateIndex < stoneCount; iterateIndex++) {
    distinctRootSet.add(searchRoot(iterateIndex));
  }

  return stoneCount - distinctRootSet.size;
};
