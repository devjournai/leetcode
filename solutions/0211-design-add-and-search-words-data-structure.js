/**
 * Design Add And Search Words Data Structure
 * Time Complexity: O(L)
 * Space Complexity: O(N*L)
 */
var WordDictionary = function () {
  this.rootNode = {};
};

WordDictionary.prototype.addWord = function (wordInput) {
  let currentPosition = this.rootNode;

  for (const characterToAdd of wordInput) {
    if (!currentPosition[characterToAdd]) {
      currentPosition[characterToAdd] = {};
    }
    currentPosition = currentPosition[characterToAdd];
  }

  currentPosition.isEndOfWordFlag = true;
};

WordDictionary.prototype.search = function (searchInput) {
  const targetWordLength = searchInput.length;

  const recursiveSearch = (nodeToExplore, indexInWord) => {
    if (indexInWord === targetWordLength) {
      return nodeToExplore.isEndOfWordFlag === true;
    }

    const currentSearchChar = searchInput[indexInWord];

    if (currentSearchChar === ".") {
      for (const childIdentifier in nodeToExplore) {
        if (childIdentifier === "isEndOfWordFlag") {
          continue;
        }
        if (recursiveSearch(nodeToExplore[childIdentifier], indexInWord + 1)) {
          return true;
        }
      }
      return false;
    } else {
      const nextBranch = nodeToExplore[currentSearchChar];
      if (nextBranch) {
        return recursiveSearch(nextBranch, indexInWord + 1);
      } else {
        return false;
      }
    }
  };

  return recursiveSearch(this.rootNode, 0);
};
