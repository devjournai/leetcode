/**
 * Sum Of Prefix Scores Of Strings
 * Intuition: A Trie (prefix tree) can efficiently store and count occurrences of all prefixes within a set of strings. By augmenting each Trie node with a counter that tracks how many original words pass through it, we can determine the score for any given prefix by summing these counters during a traversal.
 * Approach: 1. Define a TrieNode class with a map for children and a counter for prefix occurrences. 2. Build a Trie by iterating through each word in the input array. For every character in a word, traverse or create the corresponding node in the Trie and increment its prefix counter. 3. Initialize an empty array to store results. 4. Iterate through each word in the input array again. For each word, traverse the Trie from the root, accumulating the prefix counters of all nodes visited along the path. This sum represents the total prefix score for the current word. 5. Add this accumulated score to the results array. 6. Return the results array.
 * Dry Run: words = ["ab", "abc"]
 * TrieNode structure: { descendants: Map, pathOccurrences: 0 }
 * 1. Build Trie:
 *    - trieOrigin = {}
 *    - For "ab":
 *      - 'a': trieOrigin.descendants.set('a', nodeA), nodeA.pathOccurrences = 1.
 *      - 'b': nodeA.descendants.set('b', nodeB), nodeB.pathOccurrences = 1.
 *    - For "abc":
 *      - 'a': nodeA.pathOccurrences = 2.
 *      - 'b': nodeB.pathOccurrences = 2.
 *      - 'c': nodeB.descendants.set('c', nodeC), nodeC.pathOccurrences = 1.
 *    Resulting Trie:
 *    trieOrigin -> 'a'(count:2) -> 'b'(count:2) -> 'c'(count:1)
 * 2. Calculate Scores:
 *    - calculatedResults = []
 *    - For "ab":
 *      - 'a': totalPrefixScore += nodeA.pathOccurrences (2). totalPrefixScore = 2.
 *      - 'b': totalPrefixScore += nodeB.pathOccurrences (2). totalPrefixScore = 4.
 *      - calculatedResults.push(4). calculatedResults = [4].
 *    - For "abc":
 *      - 'a': totalPrefixScore += nodeA.pathOccurrences (2). totalPrefixScore = 2.
 *      - 'b': totalPrefixScore += nodeB.pathOccurrences (2). totalPrefixScore = 4.
 *      - 'c': totalPrefixScore += nodeC.pathOccurrences (1). totalPrefixScore = 5.
 *      - calculatedResults.push(5). calculatedResults = [4, 5].
 * Final result: [4, 5]
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var sumPrefixScores = function (words) {
  class TrieVertex {
    constructor() {
      this.descendants = new Map();
      this.pathOccurrences = 0;
    }
  }

  const trieOrigin = new TrieVertex();

  for (const eachEntry of words) {
    let nodeForTraversal = trieOrigin;
    for (const characterToProcess of eachEntry) {
      if (!nodeForTraversal.descendants.has(characterToProcess)) {
        const newBranchPoint = new TrieVertex();
        nodeForTraversal.descendants.set(characterToProcess, newBranchPoint);
      }
      nodeForTraversal = nodeForTraversal.descendants.get(characterToProcess);
      nodeForTraversal.pathOccurrences++;
    }
  }

  const calculatedResults = [];

  for (const entryToScore of words) {
    let scoreNavigationNode = trieOrigin;
    let totalPrefixScore = 0;
    for (const scoreCharacter of entryToScore) {
      scoreNavigationNode = scoreNavigationNode.descendants.get(scoreCharacter);
      totalPrefixScore += scoreNavigationNode.pathOccurrences;
    }
    calculatedResults.push(totalPrefixScore);
  }

  return calculatedResults;
};
