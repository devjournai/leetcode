/**
 * Node With Highest Edge Score
 * Intuition: The problem asks to calculate an "edge score" for each node, which is the sum of labels of nodes pointing to it. After computing all scores, we need to find the node with the maximum score, preferring the smallest index in case of ties. This suggests a two-pass approach: first, compute all scores by iterating through the edges; second, find the maximum score and its corresponding node from the computed scores.
 * Approach: 1. Initialize an array `nodeScores` of size `n` (where `n` is the number of nodes) with all elements set to zero. This array will store the accumulated edge score for each node. 2. Iterate through the input `edges` array. For each `sourceNodeLabel` (index) from 0 to `n-1`, the value `edges[sourceNodeLabel]` gives the `destinationNodeLabel`. Add the `sourceNodeLabel` to `nodeScores[destinationNodeLabel]`. 3. Initialize `maximumScoreAchieved` to 0 and `nodeWithHighestScore` to 0. These will track the highest score encountered and the index of the node that achieved it, respectively. 4. Iterate through the `nodeScores` array from `currentProcessingIndex` 0 to `n-1`. 5. For each `currentProcessingIndex`, if `nodeScores[currentProcessingIndex]` is greater than `maximumScoreAchieved`, update `maximumScoreAchieved` to `nodeScores[currentProcessingIndex]` and `nodeWithHighestScore` to `currentProcessingIndex`. The strict greater than (`>`) ensures that if multiple nodes have the same highest score, the one with the smallest index (encountered first) is maintained. 6. Return `nodeWithHighestScore`.
 * Dry Run: edges = [1, 0, 0, 0, 0] (n=5)
 *
 * 1. Initialize:
 *    numberOfNodes = 5
 *    nodeScores = [0, 0, 0, 0, 0]
 *
 * 2. First Pass (forEach): Calculate scores
 *    - sourceNodeLabel = 0, destinationNodeLabel = edges[0] = 1: nodeScores[1] += 0; => nodeScores = [0, 0, 0, 0, 0]
 *    - sourceNodeLabel = 1, destinationNodeLabel = edges[1] = 0: nodeScores[0] += 1; => nodeScores = [1, 0, 0, 0, 0]
 *    - sourceNodeLabel = 2, destinationNodeLabel = edges[2] = 0: nodeScores[0] += 2; => nodeScores = [3, 0, 0, 0, 0]
 *    - sourceNodeLabel = 3, destinationNodeLabel = edges[3] = 0: nodeScores[0] += 3; => nodeScores = [6, 0, 0, 0, 0]
 *    - sourceNodeLabel = 4, destinationNodeLabel = edges[4] = 0: nodeScores[0] += 4; => nodeScores = [10, 0, 0, 0, 0]
 *    End of first pass. nodeScores = [10, 0, 0, 0, 0]
 *
 * 3. Initialize for second pass:
 *    maximumScoreAchieved = 0
 *    nodeWithHighestScore = 0
 *
 * 4. Second Pass (for loop): Find highest score and node
 *    - currentProcessingIndex = 0:
 *      scoreAtCurrentIndex = nodeScores[0] = 10
 *      10 > 0 (true)
 *      maximumScoreAchieved = 10
 *      nodeWithHighestScore = 0
 *    - currentProcessingIndex = 1:
 *      scoreAtCurrentIndex = nodeScores[1] = 0
 *      0 > 10 (false)
 *    - currentProcessingIndex = 2:
 *      scoreAtCurrentIndex = nodeScores[2] = 0
 *      0 > 10 (false)
 *    - currentProcessingIndex = 3:
 *      scoreAtCurrentIndex = nodeScores[3] = 0
 *      0 > 10 (false)
 *    - currentProcessingIndex = 4:
 *      scoreAtCurrentIndex = nodeScores[4] = 0
 *      0 > 10 (false)
 *    End of second pass.
 *
 * 5. Return nodeWithHighestScore = 0.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var edgeScore = function (edges) {
  const numberOfNodes = edges.length;
  const nodeScores = new Array(numberOfNodes).fill(0);

  edges.forEach((destinationNodeLabel, sourceNodeLabel) => {
    nodeScores[destinationNodeLabel] += sourceNodeLabel;
  });

  let maximumScoreAchieved = 0;
  let nodeWithHighestScore = 0;

  for (
    let currentProcessingIndex = 0;
    currentProcessingIndex < numberOfNodes;
    currentProcessingIndex++
  ) {
    const scoreAtCurrentIndex = nodeScores[currentProcessingIndex];
    if (scoreAtCurrentIndex > maximumScoreAchieved) {
      maximumScoreAchieved = scoreAtCurrentIndex;
      nodeWithHighestScore = currentProcessingIndex;
    }
  }

  return nodeWithHighestScore;
};
