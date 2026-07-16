/**
* Construct The Longest New String
* Intuition: The core constraint is to avoid "AAA" and "BBB". This implies that "AA" and "BB" strings cannot be placed consecutively (e.g., "AAAA" or "BBBB"). To maximize their usage, we must alternate them, forming patterns like "AABBAABB..." or "BBAABBAA...". The 'AB' strings are neutral; they do not violate the "AAA" or "BBB" rule when placed anywhere, thus all available 'AB' strings can be used. Each string ('AA', 'BB', 'AB') contributes a fixed length of 2 characters.
* Approach: 1. Determine the maximum number of "AA" and "BB" blocks that can be arranged without creating "AAA" or "BBB". This is achieved by alternating them. We can always form `Math.min(x, y)` pairs of "AA" and "BB" (e.g., "AABB"). This accounts for `2 * Math.min(x, y)` blocks. If `x` and `y` are not equal, we will have an excess of either "AA" or "BB" strings. We can append exactly one additional block of the more abundant type (e.g., if we had more "AA"s, we can add "AA" at the end of a "BB" sequence like "...BBAA"). So, if `x !== y`, one extra block is added. The total "AA"/"BB" blocks are `2 * Math.min(x, y) + (x !== y ? 1 : 0)`. 2. Include all 'AB' strings. Since 'AB' strings do not violate the "AAA" or "BBB" rule, all `z` of them can be appended anywhere in the string. 3. Calculate the total length. Each string ('AA', 'BB', 'AB') has a length of 2. Therefore, the total maximum length is 2 times the sum of the maximum allowed "AA"/"BB" blocks and all "AB" blocks.
* Dry Run: Input: x = 2, y = 3, z = 1
        1. `minimumPairs = Math.min(2, 3) = 2`.
        2. `blocksFromPaired = minimumPairs * 2 = 2 * 2 = 4`.
        3. `x !== y` is `2 !== 3`, which is `true`.
        4. `additionalBlockCount = 1`.
        5. `totalAlternatingBlocks = blocksFromPaired + additionalBlockCount = 4 + 1 = 5`.
        6. `overallBlockSum = totalAlternatingBlocks + z = 5 + 1 = 6`.
        7. `maximumLength = overallBlockSum * 2 = 6 * 2 = 12`.
        Constructed example: We use 2 'AA's and 3 'BB's, forming `BBAABBAA` (5 blocks, length 10). Then we add 1 'AB' anywhere, e.g., `BBAABBAAAB` (6 blocks, length 12).
* Time Complexity: O(1)
* Space Complexity: O(1)
*/
var longestString = function (x, y, z) {
  const minimumPairs = Math.min(x, y);
  const blocksFromPaired = minimumPairs * 2;
  const additionalBlockCount = x !== y ? 1 : 0;
  const totalAlternatingBlocks = blocksFromPaired + additionalBlockCount;
  const overallBlockSum = totalAlternatingBlocks + z;
  const maximumLength = overallBlockSum * 2;
  return maximumLength;
};
