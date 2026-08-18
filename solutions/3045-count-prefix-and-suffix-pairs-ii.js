/**
 * Count Prefix and Suffix Pairs II
 * Intuition: word[i] is both a prefix and a suffix of word[j] (i < j) iff the paired characters (word[j][k], word[j][n-1-k]) follow the same path as word[i] for every k. A trie on those character pairs counts earlier words that are prefix-suffix of the current word while inserting in order.
 * Approach: 1. Each trie edge is keyed by (prefix character, suffix character). 2. Insert words from left to right. 3. Walking the current word, add each node's stored count (number of earlier words that ended there and are therefore a prefix-suffix of this word). 4. Increment the terminal node's count after the walk.
 * Dry Run: words = ["a", "aba", "ababa"]. Insert "a" along ('a','a') and mark that node. Insert "aba": the first pair ('a','a') already has count 1, so add 1. Insert "ababa": it walks through the endings of both "a" and "aba", adding 2. Total 3.
 * Time Complexity: O(total characters)
 * Space Complexity: O(total characters)
 */
var countPrefixSuffixPairs = function (words) {
  const trieRoot = { children: new Map(), endedWordCount: 0 };
  let totalPairCount = 0;

  for (const word of words) {
    const wordLength = word.length;
    let currentNode = trieRoot;

    for (
      let characterIndex = 0;
      characterIndex < wordLength;
      characterIndex++
    ) {
      const prefixCharacter = word[characterIndex];
      const suffixCharacter = word[wordLength - 1 - characterIndex];
      const edgeKey =
        prefixCharacter.charCodeAt(0) * 26 + suffixCharacter.charCodeAt(0);

      if (!currentNode.children.has(edgeKey)) {
        currentNode.children.set(edgeKey, {
          children: new Map(),
          endedWordCount: 0,
        });
      }
      currentNode = currentNode.children.get(edgeKey);
      totalPairCount += currentNode.endedWordCount;
    }

    currentNode.endedWordCount++;
  }

  return totalPairCount;
};
