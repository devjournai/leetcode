/**
 * Paths In Maze That Lead To Same Room
 * Intuition: A cycle of length 3 involves three distinct rooms connected in a triangle. To count unique triangles, iterate through each room, then its distinct neighbors, and check if those neighbors are also connected to each other, enforcing an ordering to avoid overcounting.
 * Approach:
 * 1. Represent the maze as an adjacency list where each room maps to a set of its direct neighbors. Using a Set allows for O(1) average time complexity for checking if a direct connection exists between two rooms.
 * 2. Initialize a counter to keep track of the number of unique 3-cycles found.
 * 3. Iterate through each room, starting from room 1 up to 'n' (inclusive). Let this current room be `currentVertex`.
 * 4. For each `currentVertex`, retrieve its list of direct neighbors.
 * 5. Iterate through all distinct pairs of these neighbors, let's call them `vertexA` and `vertexB`. The inner loops ensure that `vertexA` and `vertexB` are distinct neighbors of `currentVertex`.
 * 6. For each pair (`vertexA`, `vertexB`), apply two conditions to ensure uniqueness and triangle formation:
 *    a. Check if `vertexA` is numerically greater than `currentVertex` AND `vertexB` is numerically greater than `currentVertex`. This specific ordering condition ensures that each unique triangle (e.g., 1-2-3) is counted exactly once when `currentVertex` is the smallest-numbered room in that triangle (e.g., when `currentVertex` is 1 for the 1-2-3 triangle).
 *    b. Check if `vertexA` and `vertexB` are directly connected to each other (i.e., an edge exists between them in the adjacency list).
 * 7. If both conditions (6a and 6b) are true, it means a unique 3-cycle involving `currentVertex`, `vertexA`, and `vertexB` has been found. Increment the 3-cycle counter.
 * 8. After iterating through all rooms and their neighbor pairs, return the final count of unique 3-cycles.
 * Dry Run:
 * n = 4, corridors = [[1,2],[1,3],[2,3],[2,4],[3,4]]
 *
 * Initial adjacencyStructure:
 * 1: {2, 3}
 * 2: {1, 3, 4}
 * 3: {1, 2, 4}
 * 4: {2, 3}
 *
 * triangleCount = 0
 *
 * currentVertex = 1:
 *   neighborsList = [2, 3]
 *   firstNeighborIndex = 0, vertexA = 2
 *   secondNeighborIndex = 1, vertexB = 3
 *     Condition (vertexA > currentVertex && vertexB > currentVertex): (2 > 1 && 3 > 1) is true.
 *     Condition (adjacencyStructure[vertexA].has(vertexB)): adjacencyStructure[2].has(3) is true.
 *     Both true, triangleCount becomes 1. (Triangle: 1-2-3)
 *
 * currentVertex = 2:
 *   neighborsList = [1, 3, 4]
 *   Pairs (vertexA, vertexB) considered:
 *   (1,3): vertexA (1) > currentVertex (2) is false. Skip.
 *   (1,4): vertexA (1) > currentVertex (2) is false. Skip.
 *   (3,4):
 *     Condition (vertexA > currentVertex && vertexB > currentVertex): (3 > 2 && 4 > 2) is true.
 *     Condition (adjacencyStructure[vertexA].has(vertexB)): adjacencyStructure[3].has(4) is true.
 *     Both true, triangleCount becomes 2. (Triangle: 2-3-4)
 *
 * currentVertex = 3:
 *   neighborsList = [1, 2, 4]
 *   Pairs (vertexA, vertexB) considered:
 *   (1,2): vertexA (1) > currentVertex (3) is false. Skip.
 *   (1,4): vertexA (1) > currentVertex (3) is false. Skip.
 *   (2,4): vertexA (2) > currentVertex (3) is false. Skip.
 *
 * currentVertex = 4:
 *   neighborsList = [2, 3]
 *   Pairs (vertexA, vertexB) considered:
 *   (2,3): vertexA (2) > currentVertex (4) is false. Skip.
 *
 * Final triangleCount = 2.
 * Time Complexity: O(N + M + sum(deg(v)^2))
 * Space Complexity: O(N + M)
 */
var numberOfPaths = function (n, corridors) {
  const adjacencyStructure = Array.from({ length: n + 1 }, () => new Set());

  for (const corridorPair of corridors) {
    const firstRoom = corridorPair[0];
    const secondRoom = corridorPair[1];
    adjacencyStructure[firstRoom].add(secondRoom);
    adjacencyStructure[secondRoom].add(firstRoom);
  }

  let triangleCount = 0;

  for (let currentVertex = 1; currentVertex <= n; currentVertex++) {
    const neighborsList = Array.from(adjacencyStructure[currentVertex]);

    for (
      let firstNeighborIndex = 0;
      firstNeighborIndex < neighborsList.length;
      firstNeighborIndex++
    ) {
      for (
        let secondNeighborIndex = firstNeighborIndex + 1;
        secondNeighborIndex < neighborsList.length;
        secondNeighborIndex++
      ) {
        const vertexA = neighborsList[firstNeighborIndex];
        const vertexB = neighborsList[secondNeighborIndex];

        if (
          vertexA > currentVertex &&
          vertexB > currentVertex &&
          adjacencyStructure[vertexA].has(vertexB)
        ) {
          triangleCount++;
        }
      }
    }
  }

  return triangleCount;
};
