/**
 * Minimum Fuel Cost To Report To The Capital
 * Intuition: The problem involves minimizing fuel for representatives to converge at a capital in a tree structure. Each representative from a subtree must eventually reach its parent, incurring fuel cost based on car capacity. A bottom-up approach (DFS) from leaves to the root effectively calculates people in subtrees and aggregates fuel costs at each node as groups merge upwards.
 * Approach: 1. Construct an adjacency list (graph) from the given roads. 2. Initialize a global variable `totalFuelConsumed` to zero. 3. Define a recursive Depth First Search (DFS) function `depthFirstSearch(currentNodeId, previousNodeId)` that returns the count of representatives in the subtree rooted at `currentNodeId`. 4. Inside the DFS, initialize `peopleInSubtree` to 1 (for the current node's representative). 5. Iterate through `currentNodeId`'s neighbors. For each `neighborNodeId` that is not `previousNodeId`, recursively call `depthFirstSearch(neighborNodeId, currentNodeId)` to get `childSubtreePeople` and add this to `peopleInSubtree`. 6. If `currentNodeId` is not the capital (city 0), calculate `fuelUnitsRequired = Math.ceil(peopleInSubtree / carSeats)` and add this to `totalFuelConsumed`. 7. Return `peopleInSubtree`. 8. Call `depthFirstSearch(0, -1)` to start the traversal from the capital (city 0) with a dummy parent -1. 9. Return `totalFuelConsumed`.
 * Dry Run: roads = [[0,1],[0,2],[0,3]], seats = 5
 * numberOfCities = 4
 * adjacencyStructure = {0: [1,2,3], 1: [0], 2: [0], 3: [0]}
 * totalFuelConsumed = 0
 *
 * depthFirstSearch(currentNodeId=0, previousNodeId=-1):
 *   peopleInSubtree = 1 (for node 0)
 *
 *   neighborNodeId=1: (1 != -1)
 *     childSubtreePeople = depthFirstSearch(currentNodeId=1, previousNodeId=0):
 *       peopleInSubtree = 1 (for node 1)
 *       (No other neighbors for 1 besides 0)
 *       (currentNodeId=1 != 0) => fuelUnitsRequired = ceil(1/5) = 1. totalFuelConsumed = 0 + 1 = 1.
 *       Returns 1.
 *     peopleInSubtree = 1 + 1 = 2
 *
 *   neighborNodeId=2: (2 != -1)
 *     childSubtreePeople = depthFirstSearch(currentNodeId=2, previousNodeId=0):
 *       peopleInSubtree = 1 (for node 2)
 *       (No other neighbors for 2 besides 0)
 *       (currentNodeId=2 != 0) => fuelUnitsRequired = ceil(1/5) = 1. totalFuelConsumed = 1 + 1 = 2.
 *       Returns 1.
 *     peopleInSubtree = 2 + 1 = 3
 *
 *   neighborNodeId=3: (3 != -1)
 *     childSubtreePeople = depthFirstSearch(currentNodeId=3, previousNodeId=0):
 *       peopleInSubtree = 1 (for node 3)
 *       (No other neighbors for 3 besides 0)
 *       (currentNodeId=3 != 0) => fuelUnitsRequired = ceil(1/5) = 1. totalFuelConsumed = 2 + 1 = 3.
 *       Returns 1.
 *     peopleInSubtree = 3 + 1 = 4
 *
 *   (currentNodeId=0 == 0) => Skip fuel calculation for capital.
 *   Returns 4.
 *
 * Final totalFuelConsumed = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumFuelCost = function (inputRoads, carSeats) {
  const numberOfCities = inputRoads.length + 1;
  const adjacencyStructure = Array.from({ length: numberOfCities }, () => []);

  for (const roadConnection of inputRoads) {
    const firstCity = roadConnection[0];
    const secondCity = roadConnection[1];
    adjacencyStructure[firstCity].push(secondCity);
    adjacencyStructure[secondCity].push(firstCity);
  }

  let totalFuelConsumed = 0;

  const depthFirstSearch = (currentNodeId, previousNodeId) => {
    let peopleInSubtree = 1;

    for (const neighborNodeId of adjacencyStructure[currentNodeId]) {
      if (neighborNodeId !== previousNodeId) {
        const childSubtreePeople = depthFirstSearch(
          neighborNodeId,
          currentNodeId
        );
        peopleInSubtree += childSubtreePeople;
      }
    }

    if (currentNodeId !== 0) {
      const fuelUnitsRequired = Math.ceil(peopleInSubtree / carSeats);
      totalFuelConsumed += fuelUnitsRequired;
    }

    return peopleInSubtree;
  };

  depthFirstSearch(0, -1);
  return totalFuelConsumed;
};
