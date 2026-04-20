/**
 * Stream Of Characters
 * Time Complexity: O(sum(word.length) + Q * MaxStreamLength)
 * Space Complexity: O(sum(word.length) + MaxStreamLength)
 */
var StreamChecker = function (words) {
  this.reverseTrieStructure = {};
  this.characterStreamAccumulator = [];

  const constructReverseTriePath = (wordEntry, trieRootReference) => {
    let currentNodeForTrieBuild = trieRootReference;
    wordEntry
      .split("")
      .reverse()
      .forEach((individualChar) => {
        if (!currentNodeForTrieBuild[individualChar]) {
          currentNodeForTrieBuild[individualChar] = {};
        }
        currentNodeForTrieBuild = currentNodeForTrieBuild[individualChar];
      });
    currentNodeForTrieBuild.isWordEndMarker = true;
  };

  words.forEach((wordEntry) => {
    constructReverseTriePath(wordEntry, this.reverseTrieStructure);
  });
};

StreamChecker.prototype.query = function (letterParameter) {
  this.characterStreamAccumulator.push(letterParameter);
  let currentTrieSearchPosition = this.reverseTrieStructure;
  let backwardIterator = this.characterStreamAccumulator.length - 1;

  while (backwardIterator >= 0) {
    const characterToExamine =
      this.characterStreamAccumulator[backwardIterator];
    if (!currentTrieSearchPosition[characterToExamine]) {
      return false;
    }
    currentTrieSearchPosition = currentTrieSearchPosition[characterToExamine];
    if (currentTrieSearchPosition.isWordEndMarker) {
      return true;
    }
    backwardIterator--;
  }

  return false;
};
