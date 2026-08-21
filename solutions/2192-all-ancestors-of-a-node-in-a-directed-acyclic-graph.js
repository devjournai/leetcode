/**
 * All Ancestors Of A Node In A Directed Acyclic Graph
 * Intuition: To find all ancestors of a node, we can traverse the graph in reverse. If node 'u' is an ancestor of 'v', it means 'u' can reach 'v'. In a reversed graph, this means 'v' can reach 'u'. By performing a traversal (like DFS) from each node 'v' in the reversed graph, all nodes reachable from 'v' (excluding 'v' itself) are its ancestors. Memoization helps to avoid redundant computations for nodes whose ancestors have already been determined.
 * Approach: 1. Initialize a reversed adjacency list `graphStructure` where `graphStructure[targetNode]` contains `sourceNode` if there's an edge `sourceNode -> targetNode`. 2. Initialize an array of Sets `ancestorCollection` to store ancestors for each node, using Sets to handle duplicates efficiently. 3. Iterate through each node from 0 to `totalNodes - 1`. For each node, call a recursive helper function `discoverAncestors`. 4. The `discoverAncestors` function takes a `currentConsideredNode`. It first checks if ancestors for this node have already been computed (memoization). If so, it returns. 5. Otherwise, it iterates through `immediateParent` nodes in `graphStructure[currentConsideredNode]`. For each `immediateParent`, it adds the `immediateParent` to `ancestorCollection[currentConsideredNode]`, recursively calls `discoverAncestors` for the `immediateParent`, and then copies all `transitiveAncestor`s from `ancestorCollection[immediateParent]` to `ancestorCollection[currentConsideredNode]`. 6. Finally, convert each Set in `ancestorCollection` to a sorted array and return the result.
 * Dry Run:
 *   n = 3, edges = [[0,1], [0,2]]
 *   totalNodes = 3
 *   graphEdges = [[0,1], [0,2]]
 *
 *   1. `graphStructure = [[], [], []]`
 *      `ancestorCollection = [Set(), Set(), Set()]`
 *
 *   2. Build reversed graph:
 *      Edge [0,1]: `graphStructure[1].push(0)` -> `graphStructure = [[], [0], []]`
 *      Edge [0,2]: `graphStructure[2].push(0)` -> `graphStructure = [[], [0], [0]]`
 *
 *   3. Main loop (using `nodeIdentifier`):
 *      `nodeIdentifier = 0`: `discoverAncestors(0)`
 *          - `currentConsideredNode = 0`. `ancestorCollection[0].size` is 0.
 *          - `graphStructure[0]` is `[]`. No parents. Returns.
 *          `ancestorCollection` remains `[Set(), Set(), Set()]`
 *
 *      `nodeIdentifier = 1`: `discoverAncestors(1)`
 *          - `currentConsideredNode = 1`. `ancestorCollection[1].size` is 0.
 *          - `graphStructure[1]` is `[0]`. `immediateParent = 0`.
 *              - `ancestorCollection[1].add(0)` -> `ancestorCollection[1] = {0}`
 *              - Call `discoverAncestors(0)`:
 *                  - `currentConsideredNode = 0`. `ancestorCollection[0].size` is 0.
 *                  - `graphStructure[0]` is `[]`. No parents. Returns.
 *              - `ancestorCollection[0]` is empty. Loop for `transitiveAncestor` doesn't run.
 *          - Returns.
 *          `ancestorCollection` is now `[Set(), {0}, Set()]`
 *
 *      `nodeIdentifier = 2`: `discoverAncestors(2)`
 *          - `currentConsideredNode = 2`. `ancestorCollection[2].size` is 0.
 *          - `graphStructure[2]` is `[0]`. `immediateParent = 0`.
 *              - `ancestorCollection[2].add(0)` -> `ancestorCollection[2] = {0}`
 *              - Call `discoverAncestors(0)`:
 *                  - `currentConsideredNode = 0`. `ancestorCollection[0].size` is 0.
 *                  - `graphStructure[0]` is `[]`. No parents. Returns.
 *              - `ancestorCollection[0]` is empty. Loop for `transitiveAncestor` doesn't run.
 *          - Returns.
 *          `ancestorCollection` is now `[Set(), {0}, {0}]`
 *
 *   4. After main loop, `ancestorCollection = [Set(), {0}, {0}]`
 *
 *   5. Result formatting:
 *      - For `ancestorCollection[0]`: `Array.from(Set())` -> `[]`
 *      - For `ancestorCollection[1]`: `Array.from({0})` -> `[0]` (sorted)
 *      - For `ancestorCollection[2]`: `Array.from({0})` -> `[0]` (sorted)
 *
 *   Final Result: `[[], [0], [0]]`
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var getAncestors = function (n, edges) {
  const totalNodes = n;
  const graphEdges = edges;

  const graphStructure = Array.from({ length: totalNodes }, () => []);
  const ancestorCollection = Array.from(
    { length: totalNodes },
    () => new Set()
  );

  for (const [sourceNode, targetNode] of graphEdges) {
    graphStructure[targetNode].push(sourceNode);
  }

  let nodeIdentifier = 0;
  while (nodeIdentifier < totalNodes) {
    discoverAncestors(nodeIdentifier);
    nodeIdentifier++;
  }

  const finalResult = ancestorCollection.map((ancestorSetEntry) => {
    const sortedAncestors = Array.from(ancestorSetEntry).sort(
      (valueA, valueB) => valueA - valueB
    );
    return sortedAncestors;
  });

  return finalResult;

  function discoverAncestors(currentConsideredNode) {
    if (ancestorCollection[currentConsideredNode].size > 0) {
      return;
    }

    for (const immediateParent of graphStructure[currentConsideredNode]) {
      ancestorCollection[currentConsideredNode].add(immediateParent);
      discoverAncestors(immediateParent);

      for (const transitiveAncestor of ancestorCollection[immediateParent]) {
        ancestorCollection[currentConsideredNode].add(transitiveAncestor);
      }
    }
  }
};
