/**
 * Sentence Similarity Ii
 * Time Complexity: O(W + P * α(W) + S * α(W))
 * Space Complexity: O(W)
 */
var areSentencesSimilarTwo = function (sentence1, sentence2, similarPairs) {
  if (sentence1.length !== sentence2.length) {
    return false;
  }

  let wordIdentityCounter = 0;
  const wordIdentityMap = new Map();

  function getOrCreateWordIdentity(currentWord) {
    if (!wordIdentityMap.has(currentWord)) {
      wordIdentityMap.set(currentWord, wordIdentityCounter);
      wordIdentityCounter++;
    }
    return wordIdentityMap.get(currentWord);
  }

  for (const s1Word of sentence1) {
    getOrCreateWordIdentity(s1Word);
  }
  for (const s2Word of sentence2) {
    getOrCreateWordIdentity(s2Word);
  }
  for (const similarWordPair of similarPairs) {
    getOrCreateWordIdentity(similarWordPair[0]);
    getOrCreateWordIdentity(similarWordPair[1]);
  }

  const parentNodes = new Array(wordIdentityCounter);
  const groupSizes = new Array(wordIdentityCounter).fill(1);

  for (let nodeIndex = 0; nodeIndex < wordIdentityCounter; nodeIndex++) {
    parentNodes[nodeIndex] = nodeIndex;
  }

  function findRepresentative(childNodeId) {
    if (parentNodes[childNodeId] === childNodeId) {
      return childNodeId;
    }
    parentNodes[childNodeId] = findRepresentative(parentNodes[childNodeId]);
    return parentNodes[childNodeId];
  }

  function uniteSets(idOne, idTwo) {
    let rootOne = findRepresentative(idOne);
    let rootTwo = findRepresentative(idTwo);

    if (rootOne !== rootTwo) {
      if (groupSizes[rootOne] < groupSizes[rootTwo]) {
        let tempSwap = rootOne;
        rootOne = rootTwo;
        rootTwo = tempSwap;
      }
      parentNodes[rootTwo] = rootOne;
      groupSizes[rootOne] += groupSizes[rootTwo];
      return true;
    }
    return false;
  }

  for (const pairEntry of similarPairs) {
    const wordFirstOfPair = pairEntry[0];
    const wordSecondOfPair = pairEntry[1];

    const idFirstOfPair = getOrCreateWordIdentity(wordFirstOfPair);
    const idSecondOfPair = getOrCreateWordIdentity(wordSecondOfPair);

    uniteSets(idFirstOfPair, idSecondOfPair);
  }

  const lengthIterator = sentence1.length;
  for (let wordIndex = 0; wordIndex < lengthIterator; wordIndex++) {
    const currentWordSentence1 = sentence1[wordIndex];
    const currentWordSentence2 = sentence2[wordIndex];

    if (currentWordSentence1 === currentWordSentence2) {
      continue;
    }

    const idSentence1Word = wordIdentityMap.get(currentWordSentence1);
    const idSentence2Word = wordIdentityMap.get(currentWordSentence2);

    if (
      findRepresentative(idSentence1Word) !==
      findRepresentative(idSentence2Word)
    ) {
      return false;
    }
  }

  return true;
};
