/**
 * Longest Common Prefix of K Strings After Removal
 * Intuition: A prefix of length L is a k-common prefix iff at least k words share those L characters. A trie counts visits per node. Removing one word only changes counts along its path, so we can query the longest still-valid length after each deletion.
 * Approach: 1. Insert every word, incrementing node counts. When a node's count first reaches k, register that depth. 2. Track how many k-valid nodes exist at each length in a max-ordered set of lengths. 3. For each word, erase it, record the current max length (0 if none), then re-insert.
 * Dry Run: words = ["abc","abd","ab"], k = 2.
 *   - After all inserts, length 2 ("ab") has count >= 2.
 *   - Remove "abc": "ab" still appears in "abd" and "ab" → 2.
 *   - Remove "ab": only "abc"/"abd" share "ab" → 2.
 * Time Complexity: O(total characters)
 * Space Complexity: O(total characters)
 */
var longestCommonPrefix = function (words, k) {
  const trieRoot = { children: new Array(26).fill(null), count: 0 };
  const prefixLengthsCount = new Map();
  const prefixLengths = new Set();

  const insertWord = (word) => {
    let node = trieRoot;
    for (let i = 0; i < word.length; i++) {
      const sz = i + 1;
      const index = word.charCodeAt(i) - 97;
      if (node.children[index] === null) {
        node.children[index] = { children: new Array(26).fill(null), count: 0 };
      }
      node = node.children[index];
      node.count++;
      if (node.count >= k) {
        const nextCount = (prefixLengthsCount.get(sz) || 0) + 1;
        prefixLengthsCount.set(sz, nextCount);
        if (nextCount === 1) {
          prefixLengths.add(sz);
        }
      }
    }
  };

  const eraseWord = (word) => {
    let node = trieRoot;
    for (let i = 0; i < word.length; i++) {
      const sz = i + 1;
      const index = word.charCodeAt(i) - 97;
      node = node.children[index];
      if (node.count === k) {
        const nextCount = prefixLengthsCount.get(sz) - 1;
        prefixLengthsCount.set(sz, nextCount);
        if (nextCount === 0) {
          prefixLengths.delete(sz);
        }
      }
      node.count--;
    }
  };

  const getLongestCommonPrefix = () => {
    if (prefixLengths.size === 0) {
      return 0;
    }
    let longest = 0;
    for (const length of prefixLengths) {
      longest = Math.max(longest, length);
    }
    return longest;
  };

  for (const word of words) {
    insertWord(word);
  }

  const answer = new Array(words.length);
  for (let i = 0; i < words.length; i++) {
    eraseWord(words[i]);
    answer[i] = getLongestCommonPrefix();
    insertWord(words[i]);
  }

  return answer;
};
