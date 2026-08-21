/**
 * Maximum Score Of A Node Sequence
 * Intuition: A valid sequence has length 4: `p1 - p2 - p3 - p4`. The problem asks for the maximum sum of scores. Since all scores are positive, we want to pick nodes with the highest scores possible. We can iterate over all possible middle edges `(p2, p3)`. For each such edge, we need to find `p1` (a neighbor of `p2`) and `p4` (a neighbor of `p3`) such that all four nodes are distinct and their scores are maximized. To efficiently find the best `p1` and `p4`, we can pre-process the adjacency list of each node, sorting its neighbors by score in descending order and keeping only the top few (e.g., 3) to reduce redundant checks without missing optimal solutions.
 * Approach:
 * 1. Initialize an adjacency list, `nodeAdjacenciesMap`, for `totalNodesCount` nodes. Each element will be an array representing neighbors.
 * 2. Populate `nodeAdjacenciesMap` by iterating through `edgeConnections`. For each edge `[vertexA, vertexB]`, add `vertexB` to `nodeAdjacenciesMap[vertexA]` and `vertexA` to `nodeAdjacenciesMap[vertexB]`.
 * 3. Optimize `nodeAdjacenciesMap`: For each node from `0` to `totalNodesCount - 1`, sort its list of neighbors `currentNeighborList` in descending order based on their scores from `nodeScoresArray`. Then, truncate `currentNeighborList` to keep only the top 3 highest-scoring neighbors. This pruning is valid because when considering an edge `(midNodeOne, midNodeTwo)`, `outerNodeCandidateOne` (neighbor of `midNodeOne`) must not be `midNodeTwo`, and `outerNodeCandidateTwo` (neighbor of `midNodeTwo`) must not be `midNodeOne` or `outerNodeCandidateOne`. At most two nodes can be explicitly excluded from a node's neighbors, so the top 3 distinct neighbors provide enough candidates.
 * 4. Initialize `maxSequenceScore` to `-1`.
 * 5. Iterate through each `edgeConnections[iterationIndex]` (which implicitly represents the middle edge `(midNodeOne, midNodeTwo)` of the `outerNodeCandidateOne - midNodeOne - midNodeTwo - outerNodeCandidateTwo` sequence).
 * 6. For each `outerNodeCandidateOne` in `nodeAdjacenciesMap[midNodeOne]`:
 *    a. Ensure `outerNodeCandidateOne` is not `midNodeTwo` (to maintain distinct nodes in the sequence).
 * 7. For each `outerNodeCandidateTwo` in `nodeAdjacenciesMap[midNodeTwo]`:
 *    a. Ensure `outerNodeCandidateTwo` is not `midNodeOne` (to maintain distinct nodes).
 *    b. Ensure `outerNodeCandidateTwo` is not `outerNodeCandidateOne` (to maintain distinct nodes).
 *    c. If all conditions are met, calculate the `currentSequenceTotal`: `nodeScoresArray[outerNodeCandidateOne] + nodeScoresArray[midNodeOne] + nodeScoresArray[midNodeTwo] + nodeScoresArray[outerNodeCandidateTwo]`. Update `maxSequenceScore` with the maximum found so far.
 * 8. Return `maxSequenceScore`.
 * Dry Run:
 * Scores: [1, 2, 3, 4]
 * Edges: [[0,1], [1,2], [2,3]]
 *
 * 1. `totalNodesCount = 4`, `nodeScoresArray = [1,2,3,4]`, `edgeConnections = [[0,1], [1,2], [2,3]]`.
 * 2. `nodeAdjacenciesMap` initialization: `[[], [], [], []]`
 * 3. Populate `nodeAdjacenciesMap`:
 *    - `edgePair = [0,1]`: `nodeAdjacenciesMap[0]=[1]`, `nodeAdjacenciesMap[1]=[0]` -> `[[1], [0], [], []]`
 *    - `edgePair = [1,2]`: `nodeAdjacenciesMap[1].push(2)`, `nodeAdjacenciesMap[2].push(1)` -> `[[1], [0,2], [1], []]`
 *    - `edgePair = [2,3]`: `nodeAdjacenciesMap[2].push(3)`, `nodeAdjacenciesMap[3].push(2)` -> `[[1], [0,2], [1,3], [2]]`
 * 4. Prune `nodeAdjacenciesMap` (sort neighbors by score descending, keep top 3):
 *    - `currentNodeIdentifier = 0`: `nodeAdjacenciesMap[0]` is `[1]`. `nodeScoresArray[1]=2`. Length 1 <= 3. No change.
 *    - `currentNodeIdentifier = 1`: `nodeAdjacenciesMap[1]` is `[0,2]`. `nodeScoresArray[0]=1, nodeScoresArray[2]=3`. Sorted: `[2,0]`. Length 2 <= 3. No change.
 *    - `currentNodeIdentifier = 2`: `nodeAdjacenciesMap[2]` is `[1,3]`. `nodeScoresArray[1]=2, nodeScoresArray[3]=4`. Sorted: `[3,1]`. Length 2 <= 3. No change.
 *    - `currentNodeIdentifier = 3`: `nodeAdjacenciesMap[3]` is `[2]`. `nodeScoresArray[2]=3`. Length 1 <= 3. No change.
 *    Resulting `nodeAdjacenciesMap`: `[[1], [2,0], [3,1], [2]]`
 * 5. `maxSequenceScore = -1`.
 * 6. Iterate `edgeConnections`:
 *    a. `iterationIndex = 0`, `currentEdgeSegment = [0,1]`: `midNodeOne=0`, `midNodeTwo=1`.
 *       - `outerNodeCandidateOne` from `nodeAdjacenciesMap[0]` (`[1]`):
 *         - `outerNodeCandidateOne = 1`. Is `1 === midNodeTwo (1)`? Yes. Skip this `outerNodeCandidateOne`.
 *       (No valid sequence found for this middle edge.)
 *    b. `iterationIndex = 1`, `currentEdgeSegment = [1,2]`: `midNodeOne=1`, `midNodeTwo=2`.
 *       - `outerNodeCandidateOne` from `nodeAdjacenciesMap[1]` (`[2,0]`):
 *         - `outerNodeCandidateOne = 2`. Is `2 === midNodeTwo (2)`? Yes. Skip this `outerNodeCandidateOne`.
 *         - `outerNodeCandidateOne = 0`. Is `0 === midNodeTwo (2)`? No. Proceed.
 *           - `outerNodeCandidateTwo` from `nodeAdjacenciesMap[2]` (`[3,1]`):
 *             - `outerNodeCandidateTwo = 3`. Is `3 === midNodeOne (1)`? No. Is `3 === outerNodeCandidateOne (0)`? No. Proceed.
 *               - Valid sequence `0-1-2-3`. `currentSequenceTotal`: `nodeScoresArray[0]+nodeScoresArray[1]+nodeScoresArray[2]+nodeScoresArray[3] = 1+2+3+4 = 10`.
 *               - `maxSequenceScore = Math.max(-1, 10) = 10`.
 *             - `outerNodeCandidateTwo = 1`. Is `1 === midNodeOne (1)`? Yes. Skip this `outerNodeCandidateTwo`.
 *    c. `iterationIndex = 2`, `currentEdgeSegment = [2,3]`: `midNodeOne=2`, `midNodeTwo=3`.
 *       - `outerNodeCandidateOne` from `nodeAdjacenciesMap[2]` (`[3,1]`):
 *         - `outerNodeCandidateOne = 3`. Is `3 === midNodeTwo (3)`? Yes. Skip this `outerNodeCandidateOne`.
 *         - `outerNodeCandidateOne = 1`. Is `1 === midNodeTwo (3)`? No. Proceed.
 *           - `outerNodeCandidateTwo` from `nodeAdjacenciesMap[3]` (`[2]`):
 *             - `outerNodeCandidateTwo = 2`. Is `2 === midNodeOne (2)`? Yes. Skip this `outerNodeCandidateTwo`.
 *       (No valid sequence found for this middle edge.)
 *
 * 7. Return `maxSequenceScore = 10`.
 * Time Complexity: O(E * log(D_max) + E)
 * Space Complexity: O(N + E)
 */
var maximumScore = function (nodeScoresArray, edgeConnections) {
  const totalNodesCount = nodeScoresArray.length;
  const nodeAdjacenciesMap = new Array(totalNodesCount)
    .fill(null)
    .map(() => []);

  for (const edgePair of edgeConnections) {
    const firstVertex = edgePair[0];
    const secondVertex = edgePair[1];
    nodeAdjacenciesMap[firstVertex].push(secondVertex);
    nodeAdjacenciesMap[secondVertex].push(firstVertex);
  }

  for (
    let currentNodeIdentifier = 0;
    currentNodeIdentifier < totalNodesCount;
    currentNodeIdentifier++
  ) {
    nodeAdjacenciesMap[currentNodeIdentifier].sort(
      (neighborOne, neighborTwo) => {
        return nodeScoresArray[neighborTwo] - nodeScoresArray[neighborOne];
      }
    );
    if (nodeAdjacenciesMap[currentNodeIdentifier].length > 3) {
      nodeAdjacenciesMap[currentNodeIdentifier] = nodeAdjacenciesMap[
        currentNodeIdentifier
      ].slice(0, 3);
    }
  }

  let maxSequenceScore = -1;

  for (
    let iterationIndex = 0;
    iterationIndex < edgeConnections.length;
    iterationIndex++
  ) {
    const currentEdgeSegment = edgeConnections[iterationIndex];
    const midNodeOne = currentEdgeSegment[0];
    const midNodeTwo = currentEdgeSegment[1];

    for (const outerNodeCandidateOne of nodeAdjacenciesMap[midNodeOne]) {
      if (outerNodeCandidateOne === midNodeTwo) {
        continue;
      }

      for (const outerNodeCandidateTwo of nodeAdjacenciesMap[midNodeTwo]) {
        if (
          outerNodeCandidateTwo === midNodeOne ||
          outerNodeCandidateTwo === outerNodeCandidateOne
        ) {
          continue;
        }
        const currentSequenceTotal =
          nodeScoresArray[midNodeOne] +
          nodeScoresArray[midNodeTwo] +
          nodeScoresArray[outerNodeCandidateOne] +
          nodeScoresArray[outerNodeCandidateTwo];
        maxSequenceScore = Math.max(maxSequenceScore, currentSequenceTotal);
      }
    }
  }

  return maxSequenceScore;
};
