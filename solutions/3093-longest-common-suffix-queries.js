/**
 * Longest Common Suffix Queries
 * Intuition: The problem requires finding strings with the longest common suffix. This is a classic use case for a Trie (prefix tree). Since we're dealing with suffixes, we can build a Trie using the reversed versions of the strings. Each node in the Trie will represent a character in a reversed string, and thus a suffix in the original strings. To handle the tie-breaking rules (smallest length, then smallest index), each Trie node needs to store information about the "best" string that passes through it.
 * Approach:
 * 1. Data Structure: Create a Trie where each node has a `children` map (mapping characters to child nodes) and a `bestStringInfo` object. The `bestStringInfo` object will store `{ length: number, index: number }`, representing the length and original index of the "best" string found so far that has the suffix corresponding to the path from the root to this node. The "best" is defined by the tie-breaking rules: smallest length, then smallest index.
 * 2. Trie Construction:
 *    a. Initialize an empty `root` Trie node with `bestStringInfo` set to `{ length: Infinity, index: -1 }` (sentinel values).
 *    b. Iterate through `wordsContainer` with each `word` and its `index`.
 *    c. For each `word`, traverse the Trie with its *reversed* characters.
 *    d. At the `root` node, and at every subsequent node visited or created along the path for the reversed `word`, update its `bestStringInfo`. The update logic is: if the current `word.length` is less than `node.bestStringInfo.length`, update `node.bestStringInfo` with `(word.length, index)`. If `word.length` is equal to `node.bestStringInfo.length`, but `index` is less than `node.bestStringInfo.index`, update `node.bestStringInfo` with `(word.length, index)`. This ensures each node stores the best string fulfilling the criteria for its corresponding suffix.
 * 3. Query Processing:
 *    a. Initialize an empty array `ans` to store results.
 *    b. For each `query` in `wordsQuery`:
 *    c. Initialize `currentNode` to `root` and `deepestNodeReached` to `root`. `deepestNodeReached` will track the node corresponding to the longest common suffix found between the query and strings in the container.
 *    d. Traverse the Trie using the *reversed* characters of the `query`.
 *    e. If a character path exists, move `currentNode` to the child node and update `deepestNodeReached` to this new `currentNode`.
 *    f. If a character path does not exist, break the traversal loop.
 *    g. After traversing as far as possible, the `bestStringInfo.index` from `deepestNodeReached` is the answer for the current query. Add this index to `ans`.
 * 4. Return `ans`.
 * Dry Run:
 * wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]
 *
 * Trie Building:
 * Initial root: { children: Map(), bestStringInfo: { length: Infinity, index: -1 } }
 *
 * 1. Insert "abcd" (index 0, length 4):
 *    - Update root: { length: 4, index: 0 }
 *    - Traverse "dcba":
 *      - Node 'd': { length: 4, index: 0 }
 *      - Node 'dc': { length: 4, index: 0 }
 *      - Node 'dcb': { length: 4, index: 0 }
 *      - Node 'dcba': { length: 4, index: 0 }
 *
 * 2. Insert "bcd" (index 1, length 3):
 *    - Update root: { length: 3, index: 1 } (3 < 4)
 *    - Traverse "dcb":
 *      - Node 'd': { length: 3, index: 1 } (3 < 4)
 *      - Node 'dc': { length: 3, index: 1 } (3 < 4)
 *      - Node 'dcb': { length: 3, index: 1 } (3 < 4)
 *
 * 3. Insert "xbcd" (index 2, length 4):
 *    - Root not updated (4 not better than 3)
 *    - Traverse "dcbx":
 *      - Node 'd': not updated (4 not better than 3)
 *      - Node 'dc': not updated (4 not better than 3)
 *      - Node 'dcb': not updated (4 not better than 3)
 *      - Node 'dcbx': created, { length: 4, index: 2 }
 *
 * Trie nodes relevant for queries after construction:
 * root.bestStringInfo = { length: 3, index: 1 } (from "bcd")
 * Node for 'd'.bestStringInfo = { length: 3, index: 1 } (from "bcd")
 * Node for 'dc'.bestStringInfo = { length: 3, index: 1 } (from "bcd")
 * Node for 'dcb'.bestStringInfo = { length: 3, index: 1 } (from "bcd")
 * Node for 'dcba'.bestStringInfo = { length: 4, index: 0 } (from "abcd")
 * Node for 'dcbx'.bestStringInfo = { length: 4, index: 2 } (from "xbcd")
 *
 * Query Processing:
 *
 * 1. Query "cd" (reversed "dc"):
 *    - `currentNode = root`, `deepestNodeReached = root`
 *    - char 'd': `currentNode` moves to node 'd', `deepestNodeReached` is node 'd'.
 *    - char 'c': `currentNode` moves to node 'dc', `deepestNodeReached` is node 'dc'.
 *    - End of query. Result: `deepestNodeReached.bestStringInfo.index` which is node 'dc'.bestStringInfo.index = 1.
 *
 * 2. Query "bcd" (reversed "dcb"):
 *    - `currentNode = root`, `deepestNodeReached = root`
 *    - char 'd': `currentNode` moves to node 'd', `deepestNodeReached` is node 'd'.
 *    - char 'c': `currentNode` moves to node 'dc', `deepestNodeReached` is node 'dc'.
 *    - char 'b': `currentNode` moves to node 'dcb', `deepestNodeReached` is node 'dcb'.
 *    - End of query. Result: `deepestNodeReached.bestStringInfo.index` which is node 'dcb'.bestStringInfo.index = 1.
 *
 * 3. Query "xyz" (reversed "zyx"):
 *    - `currentNode = root`, `deepestNodeReached = root`
 *    - char 'z': `root.children` does not have 'z'. Break.
 *    - Result: `deepestNodeReached.bestStringInfo.index` which is `root.bestStringInfo.index` = 1.
 *
 * Final `ans` = [1, 1, 1]. Matches example.
 *
 * Time Complexity: O(S_container + S_query)
 * Space Complexity: O(S_container)
 */
var stringIndices = function (wordsContainer, wordsQuery) {
  function updateBestStringInfo(node, newLength, newIndex) {
    if (newLength < node.bestStringInfo.length) {
      node.bestStringInfo.length = newLength;
      node.bestStringInfo.index = newIndex;
    } else if (newLength === node.bestStringInfo.length) {
      if (newIndex < node.bestStringInfo.index) {
        node.bestStringInfo.index = newIndex;
      }
    }
  }

  const root = {
    children: new Map(),
    bestStringInfo: { length: Infinity, index: -1 },
  };

  for (let i = 0; i < wordsContainer.length; i++) {
    const word = wordsContainer[i];
    const wordLength = word.length;

    let currentNode = root;
    updateBestStringInfo(currentNode, wordLength, i);

    for (let j = wordLength - 1; j >= 0; j--) {
      const char = word[j];
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, {
          children: new Map(),
          bestStringInfo: { length: Infinity, index: -1 },
        });
      }
      currentNode = currentNode.children.get(char);
      updateBestStringInfo(currentNode, wordLength, i);
    }
  }

  const ans = [];
  for (let i = 0; i < wordsQuery.length; i++) {
    const query = wordsQuery[i];
    const queryLength = query.length;

    let currentNode = root;
    let deepestNodeReached = root;

    for (let j = queryLength - 1; j >= 0; j--) {
      const char = query[j];
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
        deepestNodeReached = currentNode;
      } else {
        break;
      }
    }
    ans.push(deepestNodeReached.bestStringInfo.index);
  }

  return ans;
};
