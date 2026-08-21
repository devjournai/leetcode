class TrieNode {
  constructor() {
    this.childNodes = new Map();
    this.isRootTerminus = false;
  }
}

class TrieStructure {
  constructor() {
    this.trieBase = new TrieNode();
  }

  insertWord(wordToInsert) {
    let currentPositionNode = this.trieBase;
    for (const charSymbol of wordToInsert) {
      if (!currentPositionNode.childNodes.has(charSymbol)) {
        currentPositionNode.childNodes.set(charSymbol, new TrieNode());
      }
      currentPositionNode = currentPositionNode.childNodes.get(charSymbol);
    }
    currentPositionNode.isRootTerminus = true;
  }

  findShortestRoot(searchTargetWord) {
    let navigatorNode = this.trieBase;
    let currentStemBuilder = [];
    let shortestRootFound = null;

    for (
      let elementPosition = 0;
      elementPosition < searchTargetWord.length;
      elementPosition++
    ) {
      const charComponent = searchTargetWord[elementPosition];

      if (!navigatorNode.childNodes.has(charComponent)) {
        break;
      }

      navigatorNode = navigatorNode.childNodes.get(charComponent);
      currentStemBuilder.push(charComponent);

      if (navigatorNode.isRootTerminus) {
        shortestRootFound = currentStemBuilder.join("");
        break;
      }
    }
    return shortestRootFound;
  }
}

/**
 * Replace Words
 * Intuition: A trie of dictionary roots lets each sentence word stop at the first complete root along its path, which is the shortest prefix successor.
 * Approach: 1. `insertWord` every dictionary root. 2. Split the sentence. 3. `findShortestRoot` walks until `isRootTerminus` or a missing child. 4. Replace with that stem or keep the token; join with spaces.
 * Dry Run: dictionary=["cat","bat"], sentence="the cattle was rattled".
 *   - "cattle" hits "cat" at terminus. "rattled" has no root. Result "the cat was rattled".
 * Time Complexity: O(Sum(L_root) + Total_Sentence_Length)
 * Space Complexity: O(Sum(L_root) + Total_Sentence_Length)
 */
var replaceWords = function (dictionaryCollection, inputPhrase) {
  const prefixTree = new TrieStructure();
  for (const rootEntry of dictionaryCollection) {
    prefixTree.insertWord(rootEntry);
  }

  const tokenizedPhrase = inputPhrase.split(" ");
  const finalOutputWords = [];

  for (const phraseToken of tokenizedPhrase) {
    const identifiedRoot = prefixTree.findShortestRoot(phraseToken);
    if (identifiedRoot !== null) {
      finalOutputWords.push(identifiedRoot);
    } else {
      finalOutputWords.push(phraseToken);
    }
  }

  return finalOutputWords.join(" ");
};
