/**
 * Minimum White Tiles After Covering With Carpets
 * Intuition: This problem exhibits optimal substructure and overlapping subproblems, making dynamic programming a suitable approach. We can define a state that tracks the minimum visible white tiles for a prefix of the floor using a certain number of carpets.
 * Approach: 1. Initialize a 2D DP table, `dynamicProgramTable[i][j]`, to store the minimum white tiles visible considering the first `i` tiles of the floor using `j` carpets. The table is initialized with zeros. 2. Iterate `tileProgression` from `1` to `floor.length` (representing the current floor prefix length). 3. Inside, iterate `carpetAllocation` from `0` to `numCarpets` (representing the number of carpets used). 4. For each state `dp[tileProgression][carpetAllocation]`, calculate two possibilities: a) `costIfSkipping`: The cost if we choose not to cover the `(tileProgression-1)`-th tile. This is `dp[tileProgression-1][carpetAllocation]` plus 1 if the `(tileProgression-1)`-th tile is white. b) `costIfApplying`: The cost if we choose to cover the `(tileProgression-1)`-th tile with a carpet. This uses one carpet, and covers `carpetLen` tiles ending at `(tileProgression-1)`. The cost is `dp[Math.max(0, tileProgression - carpetLen)][carpetAllocation - 1]`. This is only possible if `carpetAllocation > 0`. 5. `dp[tileProgression][carpetAllocation]` is the minimum of `costIfSkipping` and `costIfApplying`. 6. The final answer is `dynamicProgramTable[floor.length][numCarpets]`.
 * Dry Run: floor = "1011", numCarpets = 1, carpetLen = 2
 * floorStringLength = 4, numCarpets = 1, carpetLength = 2
 * dynamicProgramTable initialized as 5x2 array of zeros.
 *
 * tileProgression = 1 (floor[0] = '1'):
 *   carpetAllocation = 0: costIfSkipping = dp[0][0] + 1 = 1. costIfApplying = Infinity. dp[1][0] = 1.
 *   carpetAllocation = 1: costIfSkipping = dp[0][1] + 1 = 1. costIfApplying = dp[max(0, 1-2)][0] = dp[0][0] = 0. dp[1][1] = 0.
 * dynamicProgramTable: [[0,0],[1,0],[0,0],[0,0],[0,0]]
 *
 * tileProgression = 2 (floor[1] = '0'):
 *   carpetAllocation = 0: costIfSkipping = dp[1][0] + 0 = 1. costIfApplying = Infinity. dp[2][0] = 1.
 *   carpetAllocation = 1: costIfSkipping = dp[1][1] + 0 = 0. costIfApplying = dp[max(0, 2-2)][0] = dp[0][0] = 0. dp[2][1] = 0.
 * dynamicProgramTable: [[0,0],[1,0],[1,0],[0,0],[0,0]]
 *
 * tileProgression = 3 (floor[2] = '1'):
 *   carpetAllocation = 0: costIfSkipping = dp[2][0] + 1 = 2. costIfApplying = Infinity. dp[3][0] = 2.
 *   carpetAllocation = 1: costIfSkipping = dp[2][1] + 1 = 1. costIfApplying = dp[max(0, 3-2)][0] = dp[1][0] = 1. dp[3][1] = 1.
 * dynamicProgramTable: [[0,0],[1,0],[1,0],[2,1],[0,0]]
 *
 * tileProgression = 4 (floor[3] = '1'):
 *   carpetAllocation = 0: costIfSkipping = dp[3][0] + 1 = 3. costIfApplying = Infinity. dp[4][0] = 3.
 *   carpetAllocation = 1: costIfSkipping = dp[3][1] + 1 = 2. costIfApplying = dp[max(0, 4-2)][0] = dp[2][0] = 1. dp[4][1] = 1.
 * dynamicProgramTable: [[0,0],[1,0],[1,0],[2,1],[3,1]]
 *
 * Result: dp[4][1] = 1.
 * Time Complexity: O(N * M)
 * Space Complexity: O(N * M)
 */
var minimumWhiteTiles = function (floor, numCarpets, carpetLen) {
  const floorStringLength = floor.length;
  const dynamicProgramTable = Array.from(
    { length: floorStringLength + 1 },
    () => Array(numCarpets + 1).fill(0)
  );

  for (
    let tileProgression = 1;
    tileProgression <= floorStringLength;
    tileProgression++
  ) {
    for (
      let carpetAllocation = 0;
      carpetAllocation <= numCarpets;
      carpetAllocation++
    ) {
      const costIfSkipping =
        dynamicProgramTable[tileProgression - 1][carpetAllocation] +
        (floor[tileProgression - 1] === "1" ? 1 : 0);

      let costIfApplying = Infinity;
      if (carpetAllocation > 0) {
        const previousCoveredTileIndex = Math.max(
          0,
          tileProgression - carpetLen
        );
        costIfApplying =
          dynamicProgramTable[previousCoveredTileIndex][carpetAllocation - 1];
      }

      dynamicProgramTable[tileProgression][carpetAllocation] = Math.min(
        costIfSkipping,
        costIfApplying
      );
    }
  }

  return dynamicProgramTable[floorStringLength][numCarpets];
};
