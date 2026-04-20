/**
 * Design Search Autocomplete System
 * Time Complexity: Constructor: O(K_total)
 * Space Complexity: O(K_total + L_current + P_match * L_match).
 */
var AutocompleteSystem = function (sentencesCollection, initialTimes) {
  this.trieRoot = {};
  this.currentSearchPrefix = "";
  this.trieTraversalPointer = this.trieRoot;

  for (
    let sentenceIndex = 0;
    sentenceIndex < sentencesCollection.length;
    sentenceIndex++
  ) {
    this.incorporateSentenceToTrie(
      sentencesCollection[sentenceIndex],
      initialTimes[sentenceIndex],
    );
  }
};

AutocompleteSystem.prototype.incorporateSentenceToTrie = function (
  sentenceText,
  countValue,
) {
  let traversalNode = this.trieRoot;
  for (const charInput of sentenceText) {
    if (!traversalNode[charInput]) {
      traversalNode[charInput] = {};
    }
    traversalNode = traversalNode[charInput];
  }
  traversalNode.sentenceFrequency =
    (traversalNode.sentenceFrequency || 0) + countValue;
};

AutocompleteSystem.prototype.input = function (typedChar) {
  if (typedChar === "#") {
    this.incorporateSentenceToTrie(this.currentSearchPrefix, 1);
    this.currentSearchPrefix = "";
    this.trieTraversalPointer = this.trieRoot;
    return [];
  }

  this.currentSearchPrefix += typedChar;
  let nextHopNode = this.trieTraversalPointer[typedChar];
  let isNewPathCreated = false;

  if (!nextHopNode) {
    this.trieTraversalPointer[typedChar] = {};
    nextHopNode = this.trieTraversalPointer[typedChar];
    isNewPathCreated = true;
  }
  this.trieTraversalPointer = nextHopNode;

  if (isNewPathCreated) {
    return [];
  }

  const foundSuggestions = [];
  this.gatherAllSentencesFromNode(
    this.trieTraversalPointer,
    this.currentSearchPrefix,
    foundSuggestions,
  );

  foundSuggestions.sort((sentenceA, sentenceB) => {
    if (sentenceA.frequencyValue !== sentenceB.frequencyValue) {
      return sentenceB.frequencyValue - sentenceA.frequencyValue;
    }
    return sentenceA.textValue < sentenceB.textValue ? -1 : 1;
  });

  const topSuggestions = [];
  for (
    let resultIndex = 0;
    resultIndex < Math.min(3, foundSuggestions.length);
    resultIndex++
  ) {
    topSuggestions.push(foundSuggestions[resultIndex].textValue);
  }
  return topSuggestions;
};

AutocompleteSystem.prototype.gatherAllSentencesFromNode = function (
  startOfSubtree,
  currentBuiltString,
  resultList,
) {
  if (startOfSubtree.sentenceFrequency !== undefined) {
    resultList.push({
      textValue: currentBuiltString,
      frequencyValue: startOfSubtree.sentenceFrequency,
    });
  }

  const allChildKeys = Object.keys(startOfSubtree);
  for (const childCharName of allChildKeys) {
    if (childCharName !== "sentenceFrequency") {
      const nextNodeInTrie = startOfSubtree[childCharName];
      const concatenatedString = currentBuiltString + childCharName;
      this.gatherAllSentencesFromNode(
        nextNodeInTrie,
        concatenatedString,
        resultList,
      );
    }
  }
};
