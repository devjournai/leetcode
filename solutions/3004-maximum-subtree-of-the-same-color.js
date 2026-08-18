/**
 * Maximum Subtree Of The Same Color
 * Intuition: A subtree is monochromatic if its root and all its children (recursively) have the same color. We can determine this property and the size of such a subtree using a post-order traversal (DFS), propagating information upwards.
 * Approach: 1. Construct an adjacency list representation of the tree from the given edges. 2. Initialize a global variable `overallMaximum` to track the largest monochromatic subtree found, starting with 1 (for a single node). 3. Define a recursive Depth First Search (DFS) helper function, `calculateSubtreeInfo`, which takes the `currentVertex` and its `previousVertex` as parameters. This function will return a pair: `[isMonochromatic, monochromaticSubtreeSize]`. `isMonochromatic` indicates if the subtree rooted at `currentVertex` (and all its children) is entirely of the same color as `currentVertex`. `monochromaticSubtreeSize` is the size of this monochromatic subtree if `isMonochromatic` is true, otherwise it's 0. 4. Inside `calculateSubtreeInfo`: Initialize `isEntirelySameColor` to true and `cumulativeNodeCount` to 1 (for the current vertex itself). 5. Iterate through all `adjacentVertex`es of `currentVertex`. If an `adjacentVertex` is not the `previousVertex`, recursively call `calculateSubtreeInfo` for it. 6. If the recursive call indicates that the child's subtree is NOT monochromatic OR the child's color does NOT match the `currentVertex`'s color, then set `isEntirelySameColor` to false. 7. Otherwise (if child is monochromatic and matches color), add the child's `monochromaticSubtreeSize` to `cumulativeNodeCount`. 8. After visiting all children, if `isEntirelySameColor` is still true, update `overallMaximum` with `cumulativeNodeCount` and return `[true, cumulativeNodeCount]`. 9. Otherwise, return `[false, 0]`. 10. Start the DFS from node 0 with a dummy `previousVertex` (e.g., -1). 11. Return `overallMaximum`.
 * Dry Run:
 * Input: edges = [[0,1],[0,2],[1,3],[1,4]], colors = [0,0,0,0,0]
 * totalNodes = 5
 * adjacencyMatrix = [[1,2], [0,3,4], [0], [1], [1]]
 * overallMaximum = 1
 *
 * calculateSubtreeInfo(0, -1)
 *   currentVertex = 0, previousVertex = -1
 *   isEntirelySameColor = true, cumulativeNodeCount = 1
 *
 *   adjacentVertex = 1 (from adjacencyMatrix[0])
 *     calculateSubtreeInfo(1, 0)
 *       currentVertex = 1, previousVertex = 0
 *       isEntirelySameColor = true, cumulativeNodeCount = 1
 *
 *       adjacentVertex = 3 (from adjacencyMatrix[1])
 *         calculateSubtreeInfo(3, 1)
 *           currentVertex = 3, previousVertex = 1
 *           isEntirelySameColor = true, cumulativeNodeCount = 1
 *           No children (other than previous)
 *           isEntirelySameColor is true. overallMaximum = max(1, 1) = 1.
 *           Returns [true, 1]
 *       childIsMonochromatic = true, childMonochromaticSize = 1
 *       colorsArray[3] (0) === colorsArray[1] (0). Condition false.
 *       cumulativeNodeCount += 1 -> 2
 *
 *       adjacentVertex = 4 (from adjacencyMatrix[1])
 *         calculateSubtreeInfo(4, 1)
 *           currentVertex = 4, previousVertex = 1
 *           isEntirelySameColor = true, cumulativeNodeCount = 1
 *           No children (other than previous)
 *           isEntirelySameColor is true. overallMaximum = max(1, 1) = 1.
 *           Returns [true, 1]
 *       childIsMonochromatic = true, childMonochromaticSize = 1
 *       colorsArray[4] (0) === colorsArray[1] (0). Condition false.
 *       cumulativeNodeCount += 1 -> 3
 *
 *       All children of 1 processed. isEntirelySameColor is true. overallMaximum = max(1, 3) = 3.
 *       Returns [true, 3]
 *   childIsMonochromatic = true, childMonochromaticSize = 3
 *   colorsArray[1] (0) === colorsArray[0] (0). Condition false.
 *   cumulativeNodeCount += 3 -> 4
 *
 *   adjacentVertex = 2 (from adjacencyMatrix[0])
 *     calculateSubtreeInfo(2, 0)
 *       currentVertex = 2, previousVertex = 0
 *       isEntirelySameColor = true, cumulativeNodeCount = 1
 *       No children (other than previous)
 *       isEntirelySameColor is true. overallMaximum = max(3, 1) = 3.
 *       Returns [true, 1]
 *   childIsMonochromatic = true, childMonochromaticSize = 1
 *   colorsArray[2] (0) === colorsArray[0] (0). Condition false.
 *   cumulativeNodeCount += 1 -> 5
 *
 *   All children of 0 processed. isEntirelySameColor is true. overallMaximum = max(3, 5) = 5.
 *   Returns [true, 5]
 *
 * Final Return: overallMaximum = 5
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumSubtreeSize = function (edges, colorsArray) {
  const totalNodes = colorsArray.length;
  const adjacencyMatrix = new Array(totalNodes).fill().map(() => []);

  for (const [firstNode, secondNode] of edges) {
    adjacencyMatrix[firstNode].push(secondNode);
    adjacencyMatrix[secondNode].push(firstNode);
  }

  let overallMaximum = 1;

  function calculateSubtreeInfo(currentVertex, previousVertex) {
    let cumulativeNodeCount = 1;
    let isEntirelySameColor = true;

    for (const adjacentVertex of adjacencyMatrix[currentVertex]) {
      if (adjacentVertex !== previousVertex) {
        const [childIsMonochromatic, childMonochromaticSize] =
          calculateSubtreeInfo(adjacentVertex, currentVertex);

        if (
          !childIsMonochromatic ||
          colorsArray[adjacentVertex] !== colorsArray[currentVertex]
        ) {
          isEntirelySameColor = false;
        } else {
          cumulativeNodeCount += childMonochromaticSize;
        }
      }
    }

    if (isEntirelySameColor) {
      overallMaximum = Math.max(overallMaximum, cumulativeNodeCount);
      return [true, cumulativeNodeCount];
    }

    return [false, 0];
  }

  calculateSubtreeInfo(0, -1);

  return overallMaximum;
};
