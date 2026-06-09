/**
 * Maximum White Tiles Covered By A Carpet
 * Intuition: This problem can be efficiently solved using a sliding window approach after sorting the tile segments. As we slide the carpet's starting position (left end), we expand its right end to cover as many tiles as possible. We keep track of the total white tiles covered within the current carpet span, updating the maximum found so far. The key is to manage the `currentWindowTotal` correctly to represent the sum of fully covered tiles, while temporarily considering partial tiles for the maximum.
 * Approach:
 * 1. Sort the input `tiles` array by their starting positions (`li`) in ascending order. This allows for a linear scan with two pointers.
 * 2. Initialize `maxOverallCovered` to 0, which will store the global maximum number of white tiles covered.
 * 3. Initialize `windowAccumulatedLength` to 0, which represents the sum of lengths of tiles that are fully enclosed within the current sliding window.
 * 4. Initialize `rightBoundaryIdx` to 0, serving as the right pointer for the sliding window.
 * 5. Use a `while` loop for `leftBoundaryIdx` (the left pointer) to iterate through each tile, effectively setting the start of the carpet at `tiles[leftBoundaryIdx][0]`.
 * 6. Inside the outer loop, calculate `carpetReach = tiles[leftBoundaryIdx][0] + carpetLen - 1`, which is the absolute maximum coordinate the current carpet can reach.
 * 7. Use an inner `while` loop to advance `rightBoundaryIdx`:
 *    a. Continue as long as `rightBoundaryIdx` is within array bounds and the start of `tiles[rightBoundaryIdx]` is less than or equal to `carpetReach`.
 *    b. If the end of `tiles[rightBoundaryIdx]` is also less than or equal to `carpetReach`, the entire tile is covered. Add its full length to `windowAccumulatedLength` and increment `rightBoundaryIdx`.
 *    c. If `tiles[rightBoundaryIdx][1]` extends beyond `carpetReach`, only a partial segment of this tile can be covered. Calculate this `partialCoverageAmount` and temporarily add it to `windowAccumulatedLength` to find the maximum for this specific carpet placement. Update `maxOverallCovered` with `Math.max(maxOverallCovered, windowAccumulatedLength)`. Then, subtract `partialCoverageAmount` from `windowAccumulatedLength` to revert its state, as `windowAccumulatedLength` is meant to track only fully covered tiles. Break the inner loop, as `rightBoundaryIdx` cannot extend further for this carpet.
 * 8. After the inner loop, update `maxOverallCovered` again with `Math.max(maxOverallCovered, windowAccumulatedLength)` to capture scenarios where all tiles within the carpet were fully covered without any partial edge tile.
 * 9. If `rightBoundaryIdx` has reached the total number of tiles, it means all available tiles have been processed, so break the outer loop.
 * 10. Subtract the length of `tiles[leftBoundaryIdx]` from `windowAccumulatedLength`. This tile is now conceptually "leaving" the left side of the sliding window.
 * 11. Increment `leftBoundaryIdx`.
 * 12. Finally, return `maxOverallCovered`.
 * Dry Run: tiles = [[1,5],[10,12],[15,20]], carpetLen = 7
 * 1. orderedTiles = [[1,5],[10,12],[15,20]]
 * 2. maxOverallCovered = 0, windowAccumulatedLength = 0, rightBoundaryIdx = 0, leftBoundaryIdx = 0
 * 3. leftBoundaryIdx = 0 (examining tile [1,5]):
 *    carpetReach = 1 + 7 - 1 = 7
 *    Inner while (rightBoundaryIdx=0):
 *      - orderedTiles[0][0]=1 <= 7. True.
 *      - orderedTiles[0][1]=5 <= 7. True (full tile).
 *      - windowAccumulatedLength += (5-1+1) = 5. windowAccumulatedLength = 5.
 *      - rightBoundaryIdx = 1.
 *    Inner while (rightBoundaryIdx=1):
 *      - orderedTiles[1][0]=10 <= 7. False. Inner loop ends.
 *    maxOverallCovered = Math.max(0, 5) = 5.
 *    rightBoundaryIdx (1) !== orderedTiles.length (3).
 *    windowAccumulatedLength -= (orderedTiles[0][1]-orderedTiles[0][0]+1) = 5. windowAccumulatedLength = 0.
 *    leftBoundaryIdx = 1.
 * 4. leftBoundaryIdx = 1 (examining tile [10,12]):
 *    carpetReach = 10 + 7 - 1 = 16
 *    Inner while (rightBoundaryIdx=1):
 *      - orderedTiles[1][0]=10 <= 16. True.
 *      - orderedTiles[1][1]=12 <= 16. True (full tile).
 *      - windowAccumulatedLength += (12-10+1) = 3. windowAccumulatedLength = 3.
 *      - rightBoundaryIdx = 2.
 *    Inner while (rightBoundaryIdx=2):
 *      - orderedTiles[2][0]=15 <= 16. True.
 *      - orderedTiles[2][1]=20 <= 16. False (partial tile).
 *      - partialCoverageAmount = 16 - 15 + 1 = 2.
 *      - maxOverallCovered = Math.max(5, 3 + 2) = 5.
 *      - windowAccumulatedLength -= 2. windowAccumulatedLength = 1.
 *      - Break inner loop.
 *    maxOverallCovered = Math.max(5, 1) = 5.
 *    rightBoundaryIdx (2) !== orderedTiles.length (3).
 *    windowAccumulatedLength -= (orderedTiles[1][1]-orderedTiles[1][0]+1) = 3. windowAccumulatedLength = 1 - 3 = -2.
 *    leftBoundaryIdx = 2.
 * 5. leftBoundaryIdx = 2 (examining tile [15,20]):
 *    carpetReach = 15 + 7 - 1 = 21
 *    Inner while (rightBoundaryIdx=2):
 *      - orderedTiles[2][0]=15 <= 21. True.
 *      - orderedTiles[2][1]=20 <= 21. True (full tile).
 *      - windowAccumulatedLength += (20-15+1) = 6. windowAccumulatedLength = -2 + 6 = 4.
 *      - rightBoundaryIdx = 3.
 *    Inner while (rightBoundaryIdx=3):
 *      - 3 < 3. False. Inner loop ends.
 *    maxOverallCovered = Math.max(5, 4) = 5.
 *    rightBoundaryIdx (3) === orderedTiles.length (3). Break outer loop.
 * 6. Return maxOverallCovered = 5. (Wait, carpet [15,21] covers [15,20] which is 6 tiles. My manual trace has an error.
 * Let's recheck step 5.
 * At step 5, windowAccumulatedLength becomes 4.
 * Then maxOverallCovered = max(5,4)=5. This should be 6.
 * Issue: `windowAccumulatedLength = -2 + 6 = 4`. This sum needs to be compared against `maxOverallCovered`.
 * My dry run has error, it should be `max(5,4) = 5`.
 * Ah, in the provided solution: `result = Math.max(result, covered);` happens *twice*.
 * Once after partial calculation and again after inner loop finishes.
 * My step 5: `maxOverallCovered = Math.max(5, 6) = 6`. This is the one that updates with the full length.
 * My dry run was missing the last `maxOverallCovered` update, the actual final update: `maxOverallCovered = Math.max(5, 6)` should be 6.
 * Corrected Step 5: `windowAccumulatedLength = 4`. `maxOverallCovered = Math.max(5, 4)` is 5. This is wrong.
 * This suggests the `windowAccumulatedLength` is not solely for full tiles.
 * The reference `covered` is a running total. It can go negative. It gets a temporary boost from partial tiles, then that boost is removed.
 * My dry run for [[10,20],[30,40]], carpetLen = 15 was correct, which gave 11.
 * My dry run for [[1,5],[10,12],[15,20]], carpetLen = 7.
 * Corrected step 5.
 * 5. leftBoundaryIdx = 2 (examining tile [15,20]):
 *    carpetReach = 15 + 7 - 1 = 21
 *    Inner while (rightBoundaryIdx=2):
 *      - orderedTiles[2][0]=15 <= 21. True.
 *      - orderedTiles[2][1]=20 <= 21. True (full tile).
 *      - windowAccumulatedLength += (20-15+1) = 6. `windowAccumulatedLength` was -2. Now it's -2+6 = 4.
 *      - rightBoundaryIdx = 3.
 *    Inner while (rightBoundaryIdx=3):
 *      - 3 < 3. False. Inner loop ends.
 *    maxOverallCovered = Math.max(5, windowAccumulatedLength (4)) = 5.
 *    rightBoundaryIdx (3) === orderedTiles.length (3). Break outer loop.
 * Return maxOverallCovered = 5.
 *
 * The correct answer for `[[1,5],[10,12],[15,20]], carpetLen = 7` is 6.
 * Carpet `[15,21]` covers `[15,20]` for 6 tiles.
 * The reference solution yields 6 for this input.
 * This means my interpretation of `windowAccumulatedLength` in the dry run is still problematic compared to the reference.
 * The reference solution's `covered` is total covered by the current carpet segment `[tiles[i][0], carpetEnd]`.
 * Let's restart Dry Run with reference `covered` interpretation: Total length currently covered.
 * `tiles = [[1,5],[10,12],[15,20]], carpetLen = 7`
 * `maxOverallCovered = 0`, `currentCoveredLength = 0`, `rightTileIndex = 0`, `leftTileIndex = 0`
 * 1. `leftTileIndex = 0` (tile `[1,5]`): `carpetEnd = 7`
 *    Inner loop (`rightTileIndex = 0`): `tiles[0]` is `[1,5]`. `5 <= 7`. Full.
 *      `currentCoveredLength += (5-1+1) = 5`. `currentCoveredLength = 5`.
 *      `rightTileIndex = 1`.
 *    Inner loop (`rightTileIndex = 1`): `tiles[1]` is `[10,12]`. `10 <= 7`. False. Loop ends.
 *    `maxOverallCovered = Math.max(0, 5) = 5`.
 *    `rightTileIndex (1) !== 3`.
 *    `currentCoveredLength -= (tiles[0][1] - tiles[0][0] + 1) = 5`. `currentCoveredLength = 0`.
 *    `leftTileIndex = 1`.
 * 2. `leftTileIndex = 1` (tile `[10,12]`): `carpetEnd = 16`
 *    Inner loop (`rightTileIndex = 1`): `tiles[1]` is `[10,12]`. `12 <= 16`. Full.
 *      `currentCoveredLength += (12-10+1) = 3`. `currentCoveredLength = 3`.
 *      `rightTileIndex = 2`.
 *    Inner loop (`rightTileIndex = 2`): `tiles[2]` is `[15,20]`. `15 <= 16`. True. `20 <= 16`. False. Partial.
 *      `currentCoveredLength += (16-15+1) = 2`. `currentCoveredLength = 3 + 2 = 5`.
 *      `maxOverallCovered = Math.max(5, 5) = 5`.
 *      `currentCoveredLength -= 2`. `currentCoveredLength = 3`.
 *      Break.
 *    `maxOverallCovered = Math.max(5, 3) = 5`.
 *    `rightTileIndex (2) !== 3`.
 *    `currentCoveredLength -= (tiles[1][1] - tiles[1][0] + 1) = 3`. `currentCoveredLength = 0`.
 *    `leftTileIndex = 2`.
 * 3. `leftTileIndex = 2` (tile `[15,20]`): `carpetEnd = 21`
 *    Inner loop (`rightTileIndex = 2`): `tiles[2]` is `[15,20]`. `20 <= 21`. Full.
 *      `currentCoveredLength += (20-15+1) = 6`. `currentCoveredLength = 6`.
 *      `rightTileIndex = 3`.
 *    Inner loop (`rightTileIndex = 3`): `3 < 3`. False. Loop ends.
 *    `maxOverallCovered = Math.max(5, 6) = 6`.
 *    `rightTileIndex (3) === 3`. Break.
 * Return `maxOverallCovered = 6`. This trace is consistent with the provided solution and correct.
 * The interpretation `windowAccumulatedLength` is the key. It needs to hold the total current covered length by the window `[leftTileIndex, rightTileIndex-1]` (or including partial `rightTileIndex`).
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumWhiteTiles = function (tiles, carpetLen) {
  tiles.sort(
    (firstElement, secondElement) => firstElement[0] - secondElement[0],
  );

  let maxOverallCovered = 0;
  let currentCoveredLength = 0;
  let rightTileIndex = 0;
  let leftTileIndex = 0;

  while (leftTileIndex < tiles.length) {
    const carpetEndPosition = tiles[leftTileIndex][0] + carpetLen - 1;

    while (
      rightTileIndex < tiles.length &&
      tiles[rightTileIndex][0] <= carpetEndPosition
    ) {
      const currentTileEnd = tiles[rightTileIndex][1];
      const currentTileStart = tiles[rightTileIndex][0];

      if (currentTileEnd <= carpetEndPosition) {
        currentCoveredLength += currentTileEnd - currentTileStart + 1;
        rightTileIndex++;
      } else {
        // Current tile extends beyond the carpet end
        currentCoveredLength += carpetEndPosition - currentTileStart + 1;
        maxOverallCovered = Math.max(maxOverallCovered, currentCoveredLength);
        currentCoveredLength -= carpetEndPosition - currentTileStart + 1; // Remove partial contribution
        break;
      }
    }

    maxOverallCovered = Math.max(maxOverallCovered, currentCoveredLength);

    if (rightTileIndex === tiles.length) {
      break;
    }

    // Prepare for the next iteration: remove the tile leaving the window from the left
    const leavingTileStart = tiles[leftTileIndex][0];
    const leavingTileEnd = tiles[leftTileIndex][1];
    currentCoveredLength -= leavingTileEnd - leavingTileStart + 1;

    leftTileIndex++;
  }

  return maxOverallCovered;
};
