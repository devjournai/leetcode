/**
 * Longest Word In Dictionary
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var longestWord = function (words) {
  class TrieNode {
    constructor() {
      this.children = new Map();
      this.isWordEnd = false;
    }
  }

  const trieRoot = new TrieNode();

  for (const sourceWord of words) {
    let nodeTraversal = trieRoot;
    for (const characterElement of sourceWord) {
      if (!nodeTraversal.children.has(characterElement)) {
        nodeTraversal.children.set(characterElement, new TrieNode());
      }
      nodeTraversal = nodeTraversal.children.get(characterElement);
    }
    nodeTraversal.isWordEnd = true;
  }

  let finalLongestWord = "";
  const wordQueue = [];
  let queueFrontPointer = 0;

  const sortedRootChildrenKeys = Array.from(trieRoot.children.keys()).sort();

  for (const initialChar of sortedRootChildrenKeys) {
    const firstNodeCandidate = trieRoot.children.get(initialChar);
    if (firstNodeCandidate.isWordEnd) {
      wordQueue.push({
        nodeReference: firstNodeCandidate,
        currentPathWord: initialChar,
      });
    }
  }

  while (queueFrontPointer < wordQueue.length) {
    const queueEntry = wordQueue[queueFrontPointer];
    queueFrontPointer++;

    const currentProcessingNode = queueEntry.nodeReference;
    const completeWordFormed = queueEntry.currentPathWord;

    if (completeWordFormed.length > finalLongestWord.length) {
      finalLongestWord = completeWordFormed;
    } else if (completeWordFormed.length === finalLongestWord.length) {
      if (completeWordFormed < finalLongestWord) {
        finalLongestWord = completeWordFormed;
      }
    }

    const currentChildrenKeys = Array.from(
      currentProcessingNode.children.keys(),
    ).sort();
    for (const childSymbol of currentChildrenKeys) {
      const childReferenceNode =
        currentProcessingNode.children.get(childSymbol);
      if (childReferenceNode.isWordEnd) {
        const nextCandidateWord = completeWordFormed + childSymbol;
        wordQueue.push({
          nodeReference: childReferenceNode,
          currentPathWord: nextCandidateWord,
        });
      }
    }
  }

  return finalLongestWord;
};
