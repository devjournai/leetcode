/**
 * Minimum Operations To Convert Number
 * Intuition: The problem asks for the minimum number of operations to transform one number into another. This is a classic shortest path problem on an unweighted graph, where numbers are nodes and operations define edges. Breadth-First Search (BFS) is the optimal algorithm for finding the shortest path in such graphs.
 * Approach: 1. Initialize a queue for BFS, starting with the `initialValue` and 0 operations. Also, maintain a set to keep track of `exploredNodes` to prevent cycles and redundant computations. 2. In a loop, dequeue a `presentNumber` and its `currentDepth` (operations count). 3. For each `currentOperand` in the `inputNumbers` array, generate three potential `nextCandidate` values by adding, subtracting, and XORing with the `presentNumber`. 4. For each `nextCandidate`: if it equals the `targetValue`, return `currentDepth + 1` as the minimum operations. 5. If `nextCandidate` is within the valid range `[0, 1000]` and has not been `exploredNodes` yet, mark it as `exploredNodes` and enqueue it with `currentDepth + 1`. 6. If the queue becomes empty and `targetValue` was not reached, return -1.
 * Dry Run:
 * Input: nums = [2, 4, 6], start = 3, goal = 7
 * 1. Initialize `operationSequence = [[3, 0]]`, `exploredNodes = {3}`.
 * 2. Dequeue `[3, 0]`. `presentNumber = 3`, `currentDepth = 0`.
 *    - For `kdx = 0`, `currentOperand = 2`:
 *      `operationOutcomes = [3 + 2, 3 - 2, 3 ^ 2] = [5, 1, 1]`.
 *      - `nextCandidateValue = 5`: `5 !== 7`. `0 <= 5 <= 1000` and `5` not in `exploredNodes`. Add `5` to `exploredNodes`. Enqueue `[5, 1]`. `exploredNodes = {3, 5}`. `operationSequence = [[5, 1]]`.
 *      - `nextCandidateValue = 1`: `1 !== 7`. `0 <= 1 <= 1000` and `1` not in `exploredNodes`. Add `1` to `exploredNodes`. Enqueue `[1, 1]`. `exploredNodes = {3, 5, 1}`. `operationSequence = [[5, 1], [1, 1]]`.
 *      - `nextCandidateValue = 1`: `1 !== 7`. `0 <= 1 <= 1000` but `1` is in `exploredNodes`. Skip.
 *    - For `kdx = 1`, `currentOperand = 4`:
 *      `operationOutcomes = [3 + 4, 3 - 4, 3 ^ 4] = [7, -1, 7]`.
 *      - `nextCandidateValue = 7`: `7 === 7` (targetValue). Return `currentDepth + 1 = 0 + 1 = 1`.
 * Output: 1
 * Time Complexity: O(M * N)
 * Space Complexity: O(M)
*/
var minimumOperations = function (nums, start, goal) {
  const operationSequence = [[start, 0]];
  const exploredNodes = new Set([start]);

  while (operationSequence.length > 0) {
    const [presentNumber, currentDepth] = operationSequence.shift();

    for (let kdx = 0; kdx < nums.length; kdx++) {
      const currentOperand = nums[kdx];

      const operationOutcomes = [
        presentNumber + currentOperand,
        presentNumber - currentOperand,
        presentNumber ^ currentOperand
      ];

      for (let jdx = 0; jdx < operationOutcomes.length; jdx++) {
        const nextCandidateValue = operationOutcomes[jdx];

        if (nextCandidateValue === goal) {
          return currentDepth + 1;
        }

        if (nextCandidateValue >= 0 && nextCandidateValue <= 1000 && !exploredNodes.has(nextCandidateValue)) {
          exploredNodes.add(nextCandidateValue);
          operationSequence.push([nextCandidateValue, currentDepth + 1]);
        }
      }
    }
  }

  return -1;
};