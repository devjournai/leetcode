/**
* Maximum Path Quality Of A Graph
* Intuition: This problem requires finding the maximum "quality" of paths that start and end at node 0 within a given time limit. The "quality" is the sum of unique node values along the path. This structure naturally points towards a backtracking (Depth-First Search) approach, where we explore all possible paths while keeping track of the current time taken, the current set of unique nodes visited, and their accumulated value.
* Approach: 1. Represent the graph using an adjacency list where each entry stores `[neighbor_node, travel_time]`. Since edges are undirected, add both directions.
*           2. Initialize a variable `overallMaxQuality` to 0 to store the best quality found.
*           3. Start a Depth-First Search (DFS) from node 0. The initial DFS call will have `currentNode=0`, `remainingTime=maxTime`, `currentQuality=values[0]` (as node 0 is initially visited), and a `visitedNodesSet` containing only 0.
*           4. The DFS function `calculatePathQuality(currentNode, remainingTime, currentQuality, nodesVisitedInPath)` will perform the following:
*              a. Base Case: If `remainingTime` falls below 0, this path is invalid, so terminate the recursion.
*              b. Check for path completion: If `currentNode` is 0, it means we have returned to the starting node. Update `overallMaxQuality` with `Math.max(overallMaxQuality, currentQuality)`.
*              c. Explore Neighbors: Iterate through each `[neighborNode, edgeDuration]` in the adjacency list of `currentNode`.
*                 i. Create a `nextVisitedNodesSet` by cloning `nodesVisitedInPath`. This ensures that each recursive branch has its independent set of unique visited nodes.
*                 ii. Calculate `nextPathAccumulatedQuality`. If `neighborNode` has not been visited in `nextVisitedNodesSet` before, add `nodeValuesArr[neighborNode]` to `currentQuality`. Otherwise, the quality remains the same as `neighborNode` was already counted.
*                 iii. Add `neighborNode` to `nextVisitedNodesSet`.
*                 iv. Recursively call `calculatePathQuality` with `neighborNode`, `remainingTime - edgeDuration`, `nextPathAccumulatedQuality`, and `nextVisitedNodesSet`.
* Dry Run: values = [1,2,3], edges = [[0,1,10],[1,2,15],[0,2,10]], maxTime = 20
* 1. Initialize `totalNodesCount = 3`, `graphAdjacencyList = [[(1,10), (2,10)], [(0,10), (2,15)], [(1,15), (0,10)]]`, `overallMaxQuality = 0`.
* 2. Call `calculatePathQuality(0, 20, 1, {0})`
*    - `currentNodePointer = 0`, `remainingTravelTime = 20`, `currentPathTotalQuality = 1`, `nodesVisitedInPath = {0}`
*    - `remainingTravelTime` (20) not < 0.
*    - `currentNodePointer` (0) === 0. `overallMaxQuality = Math.max(0, 1) = 1`.
*    - Iterate neighbors of 0:
*      - Neighbor (1, 10):
*        - `nextVisitedNodesSet = {0}` (clone of `nodesVisitedInPath`)
*        - `neighborNodeIndex = 1` not in `nextVisitedNodesSet`. `nextPathAccumulatedQuality = 1 + values[1] = 1 + 2 = 3`.
*        - Add 1 to `nextVisitedNodesSet` -> `{0, 1}`.
*        - Call `calculatePathQuality(1, 20-10=10, 3, {0, 1})`
*          - `currentNodePointer = 1`, `remainingTravelTime = 10`, `currentPathTotalQuality = 3`, `nodesVisitedInPath = {0, 1}`
*          - `remainingTravelTime` (10) not < 0. `currentNodePointer` (1) != 0.
*          - Iterate neighbors of 1:
*            - Neighbor (0, 10):
*              - `nextVisitedNodesSet = {0, 1}`. `neighborNodeIndex = 0` in `nextVisitedNodesSet`. `nextPathAccumulatedQuality = 3`.
*              - Call `calculatePathQuality(0, 10-10=0, 3, {0, 1})`
*                - `currentNodePointer = 0`, `remainingTravelTime = 0`, `currentPathTotalQuality = 3`, `nodesVisitedInPath = {0, 1}`
*                - `remainingTravelTime` (0) not < 0.
*                - `currentNodePointer` (0) === 0. `overallMaxQuality = Math.max(1, 3) = 3`.
*                - Iterate neighbors of 0:
*                  - (1, 10): `remainingTravelTime = 0 - 10 = -10`. Call `calculatePathQuality(1, -10, ...)`. Returns.
*                  - (2, 10): `remainingTravelTime = 0 - 10 = -10`. Call `calculatePathQuality(2, -10, ...)`. Returns.
*                - Return from `calculatePathQuality(0, 0, 3, {0, 1})`.
*            - Neighbor (2, 15):
*              - `nextVisitedNodesSet = {0, 1}`. `neighborNodeIndex = 2` not in `nextVisitedNodesSet`. `nextPathAccumulatedQuality = 3 + values[2] = 3 + 3 = 6`.
*              - Add 2 to `nextVisitedNodesSet` -> `{0, 1, 2}`.
*              - Call `calculatePathQuality(2, 10-15=-5, 6, {0, 1, 2})`. Returns.
*          - Return from `calculatePathQuality(1, 10, 3, {0, 1})`.
*      - Neighbor (2, 10):
*        - `nextVisitedNodesSet = {0}`. `neighborNodeIndex = 2` not in `nextVisitedNodesSet`. `nextPathAccumulatedQuality = 1 + values[2] = 1 + 3 = 4`.
*        - Add 2 to `nextVisitedNodesSet` -> `{0, 2}`.
*        - Call `calculatePathQuality(2, 20-10=10, 4, {0, 2})`
*          - `currentNodePointer = 2`, `remainingTravelTime = 10`, `currentPathTotalQuality = 4`, `nodesVisitedInPath = {0, 2}`
*          - `remainingTravelTime` (10) not < 0. `currentNodePointer` (2) != 0.
*          - Iterate neighbors of 2:
*            - Neighbor (1, 15): ... (similar path to -5 time, returns)
*            - Neighbor (0, 10):
*              - `nextVisitedNodesSet = {0, 2}`. `neighborNodeIndex = 0` in `nextVisitedNodesSet`. `nextPathAccumulatedQuality = 4`.
*              - Call `calculatePathQuality(0, 10-10=0, 4, {0, 2})`
*                - `currentNodePointer = 0`, `remainingTravelTime = 0`, `currentPathTotalQuality = 4`, `nodesVisitedInPath = {0, 2}`
*                - `remainingTravelTime` (0) not < 0.
*                - `currentNodePointer` (0) === 0. `overallMaxQuality = Math.max(3, 4) = 4`.
*                - Iterate neighbors of 0: (similar paths to -10 time, returns)
*                - Return from `calculatePathQuality(0, 0, 4, {0, 2})`.
*          - Return from `calculatePathQuality(2, 10, 4, {0, 2})`.
* Return `overallMaxQuality = 4`.
* Time Complexity: O(N^2 * maxTime * D)
* Space Complexity: O(N * maxTime)
*/
var maximalPathQuality = function (values, edges, maxTime) {
    const totalNodesCount = values.length;
    const graphAdjacencyList = Array.from({ length: totalNodesCount }, () => []);

    for (const [firstNodeId, secondNodeId, edgeTimeCost] of edges) {
        graphAdjacencyList[firstNodeId].push([secondNodeId, edgeTimeCost]);
        graphAdjacencyList[secondNodeId].push([firstNodeId, edgeTimeCost]);
    }

    let overallMaxQuality = 0;
    const startNodeVisited = new Set([0]);

    function calculatePathQuality(currentNodePointer, remainingTravelTime, currentPathTotalQuality, nodesVisitedInPath) {
        if (remainingTravelTime < 0) {
            return;
        }

        if (currentNodePointer === 0) {
            overallMaxQuality = Math.max(overallMaxQuality, currentPathTotalQuality);
        }

        for (const [neighborNodeIndex, neighborEdgeDuration] of graphAdjacencyList[currentNodePointer]) {
            const nextVisitedNodesSet = new Set(nodesVisitedInPath);
            let nextPathAccumulatedQuality = currentPathTotalQuality;

            if (!nextVisitedNodesSet.has(neighborNodeIndex)) {
                nextPathAccumulatedQuality += values[neighborNodeIndex];
                nextVisitedNodesSet.add(neighborNodeIndex);
            }

            calculatePathQuality(neighborNodeIndex, remainingTravelTime - neighborEdgeDuration, nextPathAccumulatedQuality, nextVisitedNodesSet);
        }
    }

    calculatePathQuality(0, maxTime, values[0], startNodeVisited);

    return overallMaxQuality;
};