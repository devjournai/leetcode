/**
 * Synonymous Sentences
 * Time Complexity: O(|V| + |E| + K^W * W * log(K^W))
 * Space Complexity: O(|V| + |E| + K^W * W)
 */
var generateSentences = function (synonymGroups, initialText) {
  const equivalenceStructure = new Map();

  for (
    let pairIterator = 0;
    pairIterator < synonymGroups.length;
    pairIterator++
  ) {
    const currentSynPair = synonymGroups[pairIterator];
    const firstElement = currentSynPair[0];
    const secondElement = currentSynPair[1];

    if (!equivalenceStructure.has(firstElement)) {
      equivalenceStructure.set(firstElement, []);
    }
    if (!equivalenceStructure.has(secondElement)) {
      equivalenceStructure.set(secondElement, []);
    }
    equivalenceStructure.get(firstElement).push(secondElement);
    equivalenceStructure.get(secondElement).push(firstElement);
  }

  const inputSentenceWords = initialText.split(" ");
  const allPossibleSentences = [];

  const fetchWordEquivalents = (queryWord) => {
    if (!equivalenceStructure.has(queryWord)) {
      return [queryWord];
    }

    const componentVisited = new Set();
    const bfsTraversalQueue = [queryWord];
    const currentEquivalents = [];

    while (bfsTraversalQueue.length > 0) {
      const processingNode = bfsTraversalQueue.shift();
      if (componentVisited.has(processingNode)) {
        continue;
      }

      componentVisited.add(processingNode);
      currentEquivalents.push(processingNode);

      const neighbors = equivalenceStructure.get(processingNode);
      for (
        let neighborLoopIndex = 0;
        neighborLoopIndex < neighbors.length;
        neighborLoopIndex++
      ) {
        const neighborOfNode = neighbors[neighborLoopIndex];
        if (!componentVisited.has(neighborOfNode)) {
          bfsTraversalQueue.push(neighborOfNode);
        }
      }
    }

    const sortedEquivalentWords = currentEquivalents.sort();
    return sortedEquivalentWords;
  };

  const buildSentencesRecursive = (
    currentIndexInSentence,
    currentSentenceFragments,
  ) => {
    if (currentIndexInSentence === inputSentenceWords.length) {
      allPossibleSentences.push(currentSentenceFragments.join(" "));
      return;
    }

    const wordAtCurrentPosition = inputSentenceWords[currentIndexInSentence];
    const synonymOptions = fetchWordEquivalents(wordAtCurrentPosition);

    for (const selectedOptionWord of synonymOptions) {
      currentSentenceFragments.push(selectedOptionWord);
      buildSentencesRecursive(
        currentIndexInSentence + 1,
        currentSentenceFragments,
      );
      currentSentenceFragments.pop();
    }
  };

  buildSentencesRecursive(0, []);
  return allPossibleSentences.sort();
};
