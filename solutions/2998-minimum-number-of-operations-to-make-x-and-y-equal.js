/**
 * Minimum Number Of Operations To Make X And Y Equal
 * Intuition: The problem asks for the minimum number of operations, which inherently suggests a Breadth-First Search (BFS) approach. We can model the numbers as nodes in an unweighted graph, and the allowed operations (divide by 11, divide by 5, decrement by 1, increment by 1) as edges. BFS guarantees finding the shortest path (minimum operations) in such a graph.
 * Approach:
 * 1. Initialize a queue to store pairs of `[number, operationsCount]` starting with `[x, 0]`.
 * 2. Initialize a set to keep track of visited numbers to avoid cycles and redundant computations. Add `x` to this set.
 * 3. While the queue is not empty, dequeue the current state `[currentValue, currentOperations]`.
 * 4. If `currentValue` is equal to `y`, we have found the shortest path, so return `currentOperations`.
 * 5. Generate all possible next numbers from `currentValue` using the four allowed operations.
 *    a. If `currentValue` is a multiple of 11, add `currentValue / 11` to potential next states.
 *    b. If `currentValue` is a multiple of 5, add `currentValue / 5` to potential next states.
 *    c. Add `currentValue - 1` to potential next states.
 *    d. Add `currentValue + 1` to potential next states.
 * 6. For each generated `nextNumberCandidate`:
 *    a. Check if `nextNumberCandidate` is valid (non-negative and within a reasonable upper bound, e.g., 10000 as per problem constraints and typical BFS optimizations for these ranges) and has not been visited before.
 *    b. If valid and unvisited, add `nextNumberCandidate` to the visited set and enqueue `[nextNumberCandidate, currentOperations + 1]`.
 * 7. If the queue becomes empty and `y` was not reached, it implies `y` is unreachable, though problem constraints usually guarantee reachability.
 * Dry Run: x = 4, y = 2
 * explorationQueue = [[4, 0]]
 * reachedNumbers = {4}
 *
 * 1. Dequeue [currentNumberProcessed = 4, operationsCount = 0]
 *    currentNumberProcessed (4) != targetValueY (2)
 *    potentialNextStates: [3, 5] (4 is not divisible by 11 or 5)
 *    - nextNumberCandidate = 3: Valid, not visited. Add 3 to reachedNumbers. Enqueue [3, 1].
 *    - nextNumberCandidate = 5: Valid, not visited. Add 5 to reachedNumbers. Enqueue [5, 1].
 *    explorationQueue = [[3, 1], [5, 1]]
 *    reachedNumbers = {4, 3, 5}
 *
 * 2. Dequeue [currentNumberProcessed = 3, operationsCount = 1]
 *    currentNumberProcessed (3) != targetValueY (2)
 *    potentialNextStates: [2, 4]
 *    - nextNumberCandidate = 2: Valid, not visited. Add 2 to reachedNumbers. Enqueue [2, 2].
 *    - nextNumberCandidate = 4: Valid, visited. Skip.
 *    explorationQueue = [[5, 1], [2, 2]]
 *    reachedNumbers = {4, 3, 5, 2}
 *
 * 3. Dequeue [currentNumberProcessed = 5, operationsCount = 1]
 *    currentNumberProcessed (5) != targetValueY (2)
 *    potentialNextStates: [1, 4, 6] (5 is divisible by 5, so 5/5 = 1)
 *    - nextNumberCandidate = 1: Valid, not visited. Add 1 to reachedNumbers. Enqueue [1, 2].
 *    - nextNumberCandidate = 4: Valid, visited. Skip.
 *    - nextNumberCandidate = 6: Valid, not visited. Add 6 to reachedNumbers. Enqueue [6, 2].
 *    explorationQueue = [[2, 2], [1, 2], [6, 2]]
 *    reachedNumbers = {4, 3, 5, 2, 1, 6}
 *
 * 4. Dequeue [currentNumberProcessed = 2, operationsCount = 2]
 *    currentNumberProcessed (2) == targetValueY (2). Return operationsCount = 2.
 * Time Complexity: O(max(x, y))
 * Space Complexity: O(max(x, y))
 */
var minimumOperationsToMakeEqual = function (initialValueX, targetValueY) {
  const explorationQueue = [[initialValueX, 0]];
  const reachedNumbers = new Set();
  reachedNumbers.add(initialValueX);

  while (explorationQueue.length > 0) {
    const [currentNumberProcessed, operationsCount] = explorationQueue.shift();

    if (currentNumberProcessed === targetValueY) {
      return operationsCount;
    }

    const potentialNextStates = [];

    if (currentNumberProcessed % 11 === 0) {
      potentialNextStates.push(currentNumberProcessed / 11);
    }
    if (currentNumberProcessed % 5 === 0) {
      potentialNextStates.push(currentNumberProcessed / 5);
    }
    potentialNextStates.push(currentNumberProcessed - 1);
    potentialNextStates.push(currentNumberProcessed + 1);

    for (const nextNumberCandidate of potentialNextStates) {
      if (
        nextNumberCandidate >= 0 &&
        nextNumberCandidate <= 10000 + 11 &&
        !reachedNumbers.has(nextNumberCandidate)
      ) {
        reachedNumbers.add(nextNumberCandidate);
        explorationQueue.push([nextNumberCandidate, operationsCount + 1]);
      }
    }
  }
};
