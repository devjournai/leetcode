/**
 * Count Ways To Build Rooms In An Ant Colony
 * Intuition: The prevRoom array is a tree. Ways to interleave child subtrees is multinomial: (size-1)! / ∏ childSize! times the children’s ways.
 * Approach: 1. Build `adjLists`, factorials and inverse factorials mod 1e9+7. 2. DFS `calculateSubtreeWays`: multiply child ways by invFact[childCount], then × fact[subtree-1]. 3. Return ways at root 0.
 * Dry Run: prevRoom=[-1,0,1]. Chain 0-1-2 has only 1 order. Return 1.
 * Time Complexity: O(N * log(MOD))
 * Space Complexity: O(N)
 */
var waysToBuildRooms = function (prevRoom) {
  const numRooms = prevRoom.length;
  const primeModulus = 1000000007;

  const adjLists = Array(numRooms)
    .fill()
    .map(() => []);
  const factValues = Array(numRooms + 1).fill(1n);
  const invFactValues = Array(numRooms + 1).fill(1n);

  for (let roomIdx = 1; roomIdx <= numRooms; roomIdx++) {
    factValues[roomIdx] =
      (factValues[roomIdx - 1] * BigInt(roomIdx)) % BigInt(primeModulus);
  }

  function findModInverse(valueA, valueM) {
    const originalM = valueM;
    let xZero = 0n;
    let xOne = 1n;
    let tempQ;

    while (valueA > 1n) {
      tempQ = valueA / valueM;
      [valueA, valueM] = [valueM, valueA % valueM];
      [xZero, xOne] = [xOne - tempQ * xZero, xZero];
    }
    return xOne < 0n ? xOne + originalM : xOne;
  }

  for (let countIdx = 1; countIdx <= numRooms; countIdx++) {
    invFactValues[countIdx] = findModInverse(
      factValues[countIdx],
      BigInt(primeModulus)
    );
  }

  for (let currentRoom = 1; currentRoom < numRooms; currentRoom++) {
    adjLists[prevRoom[currentRoom]].push(currentRoom);
  }

  function calculateSubtreeWays(currentNode) {
    let totalSubtreeNodes = 1;
    let totalWaysForSubtree = 1n;

    for (const childRoom of adjLists[currentNode]) {
      const [childRoomCount, childRoomWays] = calculateSubtreeWays(childRoom);
      totalSubtreeNodes += childRoomCount;
      totalWaysForSubtree =
        (totalWaysForSubtree * childRoomWays * invFactValues[childRoomCount]) %
        BigInt(primeModulus);
    }

    return [
      totalSubtreeNodes,
      (totalWaysForSubtree * factValues[totalSubtreeNodes - 1]) %
        BigInt(primeModulus),
    ];
  }

  const finalResult = calculateSubtreeWays(0);
  return Number(finalResult[1]);
};
