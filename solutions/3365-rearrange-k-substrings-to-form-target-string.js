/**
 * Rearrange K Substrings to Form Target String
 * Intuition: `s` is split into `k` equal blocks of length `n/k`. Those blocks may be permuted arbitrarily, so `s` can become `t` iff the two strings have the same multiset of blocks.
 * Approach: 1. `blockSize = s.length / k`. 2. Count occurrences of each block in `s` and in `t`. 3. Return whether the two frequency maps are equal.
 * Dry Run: s="abcd", t="cdab", k=2. Blocks s: ab, cd; t: cd, ab. Same multiset → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isPossibleToRearrange = function (s, t, k) {
  const blockSize = s.length / k;
  const sourceCount = new Map();
  const targetCount = new Map();

  const addBlock = (text, countMap) => {
    for (let start = 0; start < text.length; start += blockSize) {
      const block = text.slice(start, start + blockSize);
      countMap.set(block, (countMap.get(block) || 0) + 1);
    }
  };

  addBlock(s, sourceCount);
  addBlock(t, targetCount);

  if (sourceCount.size !== targetCount.size) {
    return false;
  }
  for (const [block, frequency] of sourceCount) {
    if (targetCount.get(block) !== frequency) {
      return false;
    }
  }
  return true;
};
