/**
 * Number Of Nodes With Value One
 * Intuition: The final state of a node (0 or 1) depends on the parity of the total number of times it has been flipped. A node is flipped if it's directly targeted by a query, or if any of its ancestors are targeted by a query. We can efficiently track direct flips per node and then propagate the effective flip parity down the tree from parent to child in a single pass.
 * Approach: 1. Initialize an array, `directQueryOccurrences`, to count how many times each node is directly targeted by a query. 2. Iterate through the `queries` array, incrementing `directQueryOccurrences` for each queried node. 3. Initialize another array, `computedFlipParity`, to store the effective flip parity (0 or 1) for each node after considering all ancestor flips. 4. Initialize a counter `nodesWithValueOne` to 0. 5. Iterate through nodes from 1 to `n`:
 *    a. Calculate the `parentIdentifier` for the current node.
 *    b. Determine `inheritedEffect` from the parent's `computedFlipParity`. For the root node (1), this is 0.
 *    c. Sum the `directQueryOccurrences` for the current node and the `inheritedEffect`.
 *    d. Store this sum modulo 2 into `computedFlipParity` for the current node. This value represents the final state of the node (1 if odd flips, 0 if even).
 *    e. If `computedFlipParity` for the current node is 1, increment `nodesWithValueOne`.
 * 6. Return `nodesWithValueOne`.
 * Dry Run: n = 7, queries = [3, 7, 3]
 * 1. `directQueryOccurrences` = `new Array(8).fill(0)` -> `[0,0,0,0,0,0,0,0]`
 * 2. Process queries:
 *    - query 3: `directQueryOccurrences[3]` becomes 1.
 *    - query 7: `directQueryOccurrences[7]` becomes 1.
 *    - query 3: `directQueryOccurrences[3]` becomes 2.
 *    Final `directQueryOccurrences`: `[0,0,0,2,0,0,0,1]`
 * 3. `computedFlipParity` = `new Array(8).fill(0)` -> `[0,0,0,0,0,0,0,0]`
 * 4. `nodesWithValueOne` = 0
 * 5. Iterate `currentNodeLabel` from 1 to 7:
 *    - `currentNodeLabel = 1`: `parentIdentifier = 0`. `inheritedEffect = 0`. `currentTotalEffect = directQueryOccurrences[1] + inheritedEffect = 0 + 0 = 0`. `computedFlipParity[1] = 0 % 2 = 0`. `nodesWithValueOne` = 0.
 *    - `currentNodeLabel = 2`: `parentIdentifier = 1`. `inheritedEffect = computedFlipParity[1] = 0`. `currentTotalEffect = directQueryOccurrences[2] + inheritedEffect = 0 + 0 = 0`. `computedFlipParity[2] = 0 % 2 = 0`. `nodesWithValueOne` = 0.
 *    - `currentNodeLabel = 3`: `parentIdentifier = 1`. `inheritedEffect = computedFlipParity[1] = 0`. `currentTotalEffect = directQueryOccurrences[3] + inheritedEffect = 2 + 0 = 2`. `computedFlipParity[3] = 2 % 2 = 0`. `nodesWithValueOne` = 0.
 *    - `currentNodeLabel = 4`: `parentIdentifier = 2`. `inheritedEffect = computedFlipParity[2] = 0`. `currentTotalEffect = directQueryOccurrences[4] + inheritedEffect = 0 + 0 = 0`. `computedFlipParity[4] = 0 % 2 = 0`. `nodesWithValueOne` = 0.
 *    - `currentNodeLabel = 5`: `parentIdentifier = 2`. `inheritedEffect = computedFlipParity[2] = 0`. `currentTotalEffect = directQueryOccurrences[5] + inheritedEffect = 0 + 0 = 0`. `computedFlipParity[5] = 0 % 2 = 0`. `nodesWithValueOne` = 0.
 *    - `currentNodeLabel = 6`: `parentIdentifier = 3`. `inheritedEffect = computedFlipParity[3] = 0`. `currentTotalEffect = directQueryOccurrences[6] + inheritedEffect = 0 + 0 = 0`. `computedFlipParity[6] = 0 % 2 = 0`. `nodesWithValueOne` = 0.
 *    - `currentNodeLabel = 7`: `parentIdentifier = 3`. `inheritedEffect = computedFlipParity[3] = 0`. `currentTotalEffect = directQueryOccurrences[7] + inheritedEffect = 1 + 0 = 1`. `computedFlipParity[7] = 1 % 2 = 1`. `nodesWithValueOne` becomes 1.
 * 6. Return `nodesWithValueOne` (which is 1).
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N)
 */
var numberOfNodes = function (n, queries) {
  const directQueryOccurrences = new Array(n + 1).fill(0);

  for (const singleQuery of queries) {
    directQueryOccurrences[singleQuery]++;
  }

  const computedFlipParity = new Array(n + 1).fill(0);
  let nodesWithValueOne = 0;

  for (let currentNodeLabel = 1; currentNodeLabel <= n; currentNodeLabel++) {
    let inheritedEffect = 0;
    if (currentNodeLabel !== 1) {
      // Not the root
      const parentIdentifier = Math.floor(currentNodeLabel / 2);
      inheritedEffect = computedFlipParity[parentIdentifier];
    }

    const currentDirectEffect = directQueryOccurrences[currentNodeLabel];
    const currentTotalEffect = currentDirectEffect + inheritedEffect;

    computedFlipParity[currentNodeLabel] = currentTotalEffect % 2;

    if (computedFlipParity[currentNodeLabel] === 1) {
      nodesWithValueOne++;
    }
  }

  return nodesWithValueOne;
};
