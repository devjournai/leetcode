/**
 * Stream Of Characters
 * Intuition: Queries append letters to a stream. A reversed trie of words lets us walk the stream backward and stop at the first word end.
 * Approach: 1. Insert each word reversed into a nested-object trie, marking ends. 2. On query, push the letter. 3. Walk from the newest letter backward through the trie. 4. Return true on an end marker; false if a child is missing.
 * Dry Run: words = ["cd","f"], queries c,d.
 *   - Trie has d->c and f. After "c" no word. After "d" walk d then c, hit end -> true.
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
