/**
 * Count Paths That Can Form A Palindrome In A Tree
 * Intuition: A path's characters can form a palindrome if at most one character appears an odd number of times. We can represent character parity counts using a bitmask. The parity of characters on a path from node U to node V is equivalent to XORing the bitmasks of the paths from the root to U and from the root to V. We need to find pairs (U, V) such that their XORed path mask is 0 (all even counts) or a power of 2 (exactly one odd count).
 * Approach: 1. Transform the parent array into an adjacency list representation of the tree for easy traversal. 2. Perform a Depth First Search (DFS) starting from the root (node 0) to calculate the path mask from the root to each node. 3. During the DFS, maintain a frequency map (mask -> count) of path masks encountered so far on the current traversal path (ancestors and previously visited siblings' subtrees). 4. For each node being visited, calculate its path mask from the root. Then, query the frequency map for two types of masks: a) the current node's mask itself (this covers paths where both nodes have the same root-path mask, resulting in an XOR of 0), and b) the current node's mask XORed with each possible single-bit mask (1 << k for k from 0 to 25, covering paths with one character having an odd count). Add the counts found in the frequency map to the total result. 5. After processing a node, add its path mask to the frequency map, incrementing its count. The DFS naturally counts each valid pair (u, v) exactly once, ensuring that 'u' is encountered before 'v' in the traversal order, which implicitly satisfies the u < v condition required by the problem by avoiding double-counting or invalid pair formation.
 * Dry Run:
 * parent = [-1, 0, 0], s = "abc" (meaning s[1]='b', s[2]='c' for edges 1-0 and 2-0 respectively).
 *
 * 1. Initialize `totalNodes = 3`.
 * 2. Create `treeStructure = [[1, 2], [], []]` (adjacency list).
 * 3. Initialize `maskCountsStorage = new Map([[0, 1]])`. This accounts for the path from root to root having mask 0.
 * 4. Initialize `overallResult = 0`.
 *
 * 5. Call `exploreNode(0, 0)`:
 *    - `currentIdentifier = 0`, `currentMaskValue = 0`.
 *    - Loop through `childIdentifier` in `treeStructure[0]` (which are `1`, `2`):
 *
 *      - **First Child: `childIdentifier = 1`**
 *        - `charValue = s[1].charCodeAt(0) - 97` = 'b' - 'a' = 1.
 *        - `nextMaskValue = 0 ^ (1 << 1)` = `2` (binary `10`).
 *        - `overallResult += maskCountsStorage.get(2) || 0` => `overallResult = 0 + 0 = 0`.
 *        - Loop `singleBitOffset` from 0 to 25:
 *          - When `singleBitOffset = 1`: `checkMask = 2 ^ (1 << 1)` = `0`.
 *            `overallResult += maskCountsStorage.get(0) || 0` => `overallResult = 0 + 1 = 1`. (Counts path (0,1), mask is `0 ^ 2 = 2`, which is a palindrome mask).
 *          - Other `singleBitOffset` values result in masks not in `maskCountsStorage` (e.g., `2 ^ (1 << 0) = 3`).
 *        - `maskCountsStorage.set(2, (maskCountsStorage.get(2) || 0) + 1)` => `maskCountsStorage = {0: 1, 2: 1}`.
 *        - Call `exploreNode(1, 2)`:
 *          - `currentIdentifier = 1`, `currentMaskValue = 2`.
 *          - `treeStructure[1]` is empty. Returns.
 *
 *      - **Second Child: `childIdentifier = 2`**
 *        - `charValue = s[2].charCodeAt(0) - 97` = 'c' - 'a' = 2.
 *        - `nextMaskValue = 0 ^ (1 << 2)` = `4` (binary `100`).
 *        - `overallResult += maskCountsStorage.get(4) || 0` => `overallResult = 1 + 0 = 1`.
 *        - Loop `singleBitOffset` from 0 to 25:
 *          - When `singleBitOffset = 2`: `checkMask = 4 ^ (1 << 2)` = `0`.
 *            `overallResult += maskCountsStorage.get(0) || 0` => `overallResult = 1 + 1 = 2`. (Counts path (0,2), mask is `0 ^ 4 = 4`, which is a palindrome mask).
 *          - Other `singleBitOffset` values result in masks not in `maskCountsStorage` (e.g., `4 ^ (1 << 1) = 6`).
 *        - `maskCountsStorage.set(4, (maskCountsStorage.get(4) || 0) + 1)` => `maskCountsStorage = {0: 1, 2: 1, 4: 1}`.
 *        - Call `exploreNode(2, 4)`:
 *          - `currentIdentifier = 2`, `currentMaskValue = 4`.
 *          - `treeStructure[2]` is empty. Returns.
 *
 *    - Loop for `treeStructure[0]` finishes. Returns.
 *
 * 6. Final `overallResult = 2`.
 *
 * This dry run correctly identifies paths (0,1) and (0,2) as palindrome-formable. Path (1,2) (characters 'b', 'c') forms 'bc', which is not a palindrome, and is not counted.
 * Time Complexity: O(N * ALPHABET_SIZE)
 * Space Complexity: O(N + ALPHABET_SIZE)
 */
var countPalindromePaths = function (parent, s) {
  const totalNodes = parent.length;
  const treeStructure = Array.from({ length: totalNodes }, () => []);

  for (let nodeIndex = 1; nodeIndex < totalNodes; nodeIndex++) {
    treeStructure[parent[nodeIndex]].push(nodeIndex);
  }

  const maskCountsStorage = new Map([[0, 1]]);
  let overallResult = 0;

  function exploreNode(currentIdentifier, currentMaskValue) {
    for (const childIdentifier of treeStructure[currentIdentifier]) {
      const charValue = s.charCodeAt(childIdentifier) - 97;
      const nextMaskValue = currentMaskValue ^ (1 << charValue);

      overallResult += maskCountsStorage.get(nextMaskValue) || 0;

      for (let singleBitOffset = 0; singleBitOffset < 26; singleBitOffset++) {
        overallResult +=
          maskCountsStorage.get(nextMaskValue ^ (1 << singleBitOffset)) || 0;
      }

      maskCountsStorage.set(
        nextMaskValue,
        (maskCountsStorage.get(nextMaskValue) || 0) + 1,
      );
      exploreNode(childIdentifier, nextMaskValue);
    }
  }

  exploreNode(0, 0);
  return overallResult;
};
