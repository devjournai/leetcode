/**
 * Maximize The Number Of Partitions After Operations
 * Intuition: Greedy partitioning by at most k distinct letters is unique once the string is fixed, so the only extra choice is whether (and to which letter) we change one character. Memoized DFS can try keeping or changing the current letter and start a new partition whenever the distinct-letter mask would exceed k.
 * Approach: 1. Recurse on (index, canChange, mask) for the suffix starting at index. 2. Try keeping s[index]; if canChange is still true, also try replacing it with every letter. 3. If the updated mask has more than k bits, start a new partition and reset the mask to the new letter. 4. Memoize with a packed key and add 1 at the end for the last partition.
 * Dry Run: s = "accca", k = 2
 *   1. Start dp(0, true, 0).
 *   2. One change can keep two distinct letters per segment, producing 3 partitions.
 *   3. The search returns 2 extra cuts plus 1 for the final segment, which is 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxPartitionsAfterOperations = function (s, k) {
  const memo = new Map();
  const stringLength = s.length;

  const countBits = (mask) => {
    let bitCount = 0;
    let remaining = mask;
    while (remaining > 0) {
      bitCount += remaining & 1;
      remaining >>>= 1;
    }
    return bitCount;
  };

  const dfs = (index, canChange, mask) => {
    if (index === stringLength) return 0;

    const memoKey = `${index},${canChange ? 1 : 0},${mask}`;
    if (memo.has(memoKey)) return memo.get(memoKey);

    const getResult = (newBit, nextCanChange) => {
      const newMask = mask | newBit;
      if (countBits(newMask) > k) {
        return 1 + dfs(index + 1, nextCanChange, newBit);
      }
      return dfs(index + 1, nextCanChange, newMask);
    };

    let bestPartitions = getResult(1 << (s.charCodeAt(index) - 97), canChange);
    if (canChange) {
      for (let letterIndex = 0; letterIndex < 26; letterIndex++) {
        bestPartitions = Math.max(
          bestPartitions,
          getResult(1 << letterIndex, false)
        );
      }
    }

    memo.set(memoKey, bestPartitions);
    return bestPartitions;
  };

  return dfs(0, true, 0) + 1;
};
