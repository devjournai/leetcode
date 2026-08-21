/**
 * Count Number Of Possible Root Nodes
 * Intuition: We can count the correct guesses for an arbitrary root using DFS. Then, we can efficiently update this count for adjacent nodes by "re-rooting" the tree, without recomputing from scratch.
 * Approach: 1. Build an adjacency list for the tree and a hash set for quick lookup of Bob's guesses. 2. Perform a Depth-First Search (DFS) starting from node 0 (or any arbitrary node) to calculate the number of correct guesses if node 0 is the root. 3. Initialize a counter for valid roots. If the initial root's score meets the 'k' threshold, increment the counter. 4. Perform a second DFS-like traversal (re-rooting) starting from the children of node 0. For each node, calculate its correct guess score by adjusting its parent's score. If moving the root from `parent` to `current` node: if `parent -> current` was a guess, its correctness changes from true to false (decrement score). If `current -> parent` was a guess, its correctness changes from false to true (increment score). 5. If a node's calculated score meets 'k', increment the valid roots counter. Recursively apply this re-rooting logic to its children.
 * Dry Run: edges = [[0,1],[1,2],[1,3]], guesses = [[1,3],[0,1]], k = 1
 * 1. numberOfNodes = 4. adjacencyList = [[1], [0,2,3], [1], [1]]. guessLookupSet = { (1*4+3)=7, (0*4+1)=1 }. finalResultCount = 0.
 * 2. calculateRootZeroCorrect(0, -1):
 *    - curr=0, parent=-1. correctCountDfs=0.
 *    - Neighbor 1: 1!= -1. guessLookupSet.has(0*4+1=1)? Yes. correctCountDfs becomes 1.
 *    - Recurse calculateRootZeroCorrect(1, 0):
 *      - curr=1, parent=0. correctCountDfs=0.
 *      - Neighbor 2: 2!=0. guessLookupSet.has(1*4+2=6)? No.
 *      - Recurse calculateRootZeroCorrect(2, 1): Returns 0. correctCountDfs remains 0.
 *      - Neighbor 3: 3!=0. guessLookupSet.has(1*4+3=7)? Yes. correctCountDfs becomes 1.
 *      - Recurse calculateRootZeroCorrect(3, 1): Returns 0. correctCountDfs remains 1.
 *      - Returns 1.
 *    - Back to curr=0: correctCountDfs (1) += 1 (from child 1) => 2.
 *    - Returns 2.
 * 3. initialRootScore = 2. initialRootScore (2) >= k (1)? Yes. finalResultCount = 1 (Root 0 is valid).
 * 4. neighborsOfRootZero = [1].
 * 5. Loop for neighborIndex from 0 to 0: currentNeighborOfRootZero = 1.
 *    - propagateScores(1, 0, 2):
 *      - rerootNode=1, rerootParent=0, parentGuessScore=2. currentGuessScore = 2.
 *      - guessLookupSet.has(0*4+1=1)? Yes. currentGuessScore = 2 - 1 = 1.
 *      - guessLookupSet.has(1*4+0=4)? No.
 *      - currentGuessScore = 1.
 *      - currentGuessScore (1) >= k (1)? Yes. finalResultCount = 2 (Root 1 is valid).
 *      - Neighbors of 1 (excluding 0): [2,3].
 *      - ForEach childNode:
 *        - childNode=2: propagateScores(2, 1, 1):
 *          - rerootNode=2, rerootParent=1, parentGuessScore=1. currentGuessScore = 1.
 *          - guessLookupSet.has(1*4+2=6)? No.
 *          - guessLookupSet.has(2*4+1=9)? No.
 *          - currentGuessScore = 1.
 *          - currentGuessScore (1) >= k (1)? Yes. finalResultCount = 3 (Root 2 is valid).
 *          - Neighbors of 2 (excluding 1): []. Returns.
 *        - childNode=3: propagateScores(3, 1, 1):
 *          - rerootNode=3, rerootParent=1, parentGuessScore=1. currentGuessScore = 1.
 *          - guessLookupSet.has(1*4+3=7)? Yes. currentGuessScore = 1 - 1 = 0.
 *          - guessLookupSet.has(3*4+1=13)? No.
 *          - currentGuessScore = 0.
 *          - currentGuessScore (0) >= k (1)? No.
 *          - Neighbors of 3 (excluding 1): []. Returns.
 * 6. Return finalResultCount = 3.
 * Time Complexity: O(N + G)
 * Space Complexity: O(N + G)
 */
var rootCount = function (edges, guesses, k) {
  const numberOfNodes = edges.length + 1;
  const adjacencyList = Array.from({ length: numberOfNodes }, () => new Set());
  const guessLookupSet = new Set();

  for (const [edgeNodeA, edgeNodeB] of edges) {
    adjacencyList[edgeNodeA].add(edgeNodeB);
    adjacencyList[edgeNodeB].add(edgeNodeA);
  }

  for (const [guessParent, guessChild] of guesses) {
    guessLookupSet.add(guessParent * numberOfNodes + guessChild);
  }

  let finalResultCount = 0;

  function calculateRootZeroCorrect(currentNodeDfs, parentNodeDfs) {
    let correctCountDfs = 0;
    for (const neighborDfs of adjacencyList[currentNodeDfs]) {
      if (neighborDfs !== parentNodeDfs) {
        if (guessLookupSet.has(currentNodeDfs * numberOfNodes + neighborDfs)) {
          correctCountDfs++;
        }
        correctCountDfs += calculateRootZeroCorrect(
          neighborDfs,
          currentNodeDfs
        );
      }
    }
    return correctCountDfs;
  }

  const initialRootScore = calculateRootZeroCorrect(0, -1);
  if (initialRootScore >= k) {
    finalResultCount++;
  }

  function propagateScores(rerootNode, rerootParent, parentGuessScore) {
    let currentGuessScore = parentGuessScore;

    if (guessLookupSet.has(rerootParent * numberOfNodes + rerootNode)) {
      currentGuessScore--;
    }
    if (guessLookupSet.has(rerootNode * numberOfNodes + rerootParent)) {
      currentGuessScore++;
    }

    if (currentGuessScore >= k) {
      finalResultCount++;
    }

    adjacencyList[rerootNode].forEach((childNode) => {
      if (childNode !== rerootParent) {
        propagateScores(childNode, rerootNode, currentGuessScore);
      }
    });
  }

  let neighborsOfRootZero = Array.from(adjacencyList[0]);
  let neighborIndex = 0;
  for (; neighborIndex < neighborsOfRootZero.length; neighborIndex++) {
    let currentNeighborOfRootZero = neighborsOfRootZero[neighborIndex];
    propagateScores(currentNeighborOfRootZero, 0, initialRootScore);
  }

  return finalResultCount;
};
