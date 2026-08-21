/**
 * Number Of Islands II
 * Intuition: Each new land is a new island, then union-find merges it with 4-adjacent lands already placed (path compression + union by rank). Duplicate positions just report the current count.
 * Approach: 1. Key cells as row*n+col. 2. If the key exists, push islandsTotal and continue. 3. Else increment islands, make a singleton. 4. For each in-bound neighbor that exists, unite (decrement islands when roots differ). 5. Push the count after each position.
 * Dry Run: m=3,n=3, positions=[[0,0],[0,1],[1,2],[2,1]].
 *   - (0,0)→1. (0,1)→2 then union with (0,0)→1. (1,2)→2. (2,1)→3.
 *   - Return [1,1,2,3].
 * Time Complexity: O(k * α(m*n))
 * Space Complexity: O(m * n)
 */
var numIslands2 = function (m, n, positions) {
  const parentDictionary = new Map();
  const rankDictionary = new Map();
  const answerList = [];
  const movementDirections = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let islandsTotal = 0;

  const findSet = (elementIdentifier) => {
    if (parentDictionary.get(elementIdentifier) === elementIdentifier) {
      return elementIdentifier;
    }
    const representativeElement = findSet(
      parentDictionary.get(elementIdentifier)
    );
    parentDictionary.set(elementIdentifier, representativeElement);
    return representativeElement;
  };

  const uniteSets = (itemA, itemB) => {
    const rootA = findSet(itemA);
    const rootB = findSet(itemB);

    if (rootA !== rootB) {
      const rankValueA = rankDictionary.get(rootA);
      const rankValueB = rankDictionary.get(rootB);

      if (rankValueA < rankValueB) {
        parentDictionary.set(rootA, rootB);
      } else if (rankValueA > rankValueB) {
        parentDictionary.set(rootB, rootA);
      } else {
        parentDictionary.set(rootB, rootA);
        rankDictionary.set(rootA, rankValueA + 1);
      }
      islandsTotal--;
    }
  };

  for (const positionPair of positions) {
    const currentGridRow = positionPair[0];
    const currentGridCol = positionPair[1];
    const currentCellKey = currentGridRow * n + currentGridCol;

    if (parentDictionary.has(currentCellKey)) {
      answerList.push(islandsTotal);
      continue;
    }

    islandsTotal++;
    parentDictionary.set(currentCellKey, currentCellKey);
    rankDictionary.set(currentCellKey, 0);

    for (const deltaPair of movementDirections) {
      const deltaRowMovement = deltaPair[0];
      const deltaColMovement = deltaPair[1];

      const neighborRowCoordinate = currentGridRow + deltaRowMovement;
      const neighborColCoordinate = currentGridCol + deltaColMovement;

      if (
        neighborRowCoordinate >= 0 &&
        neighborRowCoordinate < m &&
        neighborColCoordinate >= 0 &&
        neighborColCoordinate < n
      ) {
        const neighborCellKey =
          neighborRowCoordinate * n + neighborColCoordinate;
        if (parentDictionary.has(neighborCellKey)) {
          uniteSets(currentCellKey, neighborCellKey);
        }
      }
    }
    answerList.push(islandsTotal);
  }

  return answerList;
};
