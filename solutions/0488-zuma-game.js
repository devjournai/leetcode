/**
 * Zuma Game
 * Intuition: Insert a hand ball next to a matching group (or between two groups that can merge), then repeatedly collapse any run of 3+ same colors. Search the fewest insertions to clear the board, memoizing board + remaining hand.
 * Approach: 1. Count hand colors. 2. `resolveBoard` loops until stable: scan groups, delete length ≥ 3, restart scan. 3. DFS: empty board → 0; empty hand → -1. Key is board plus sorted `color+count`. 4. For each color still in hand, try each insert index (skip obviously useless splits), recurse on the resolved board, take min steps+1. Restore the hand count. 5. Cache -1 or that min.
 * Dry Run: board = "RR", hand = "R".
 *   - Insert R next to the pair → "RRR"; `resolveBoard` deletes the group of 3 → empty board. DFS returns 1.
 *   - board = "WRRBBW", hand = "RB": every insertion leaves leftover balls that cannot be cleared → -1.
 * Time Complexity: O(S_B * S_H * H_C * L^3)
 * Space Complexity: O(S_B * S_H * (L + H_C))
 */
var findMinStep = function (board, hand) {
  const handInventory = {};
  for (const singleBall of hand) {
    handInventory[singleBall] = (handInventory[singleBall] || 0) + 1;
  }

  const globalMemoization = new Map();

  function generateHandKeyString(handBallCounts) {
    const availableBallsList = [];
    const handBallColors = Object.keys(handBallCounts);

    for (const colorName of handBallColors) {
      if (handBallCounts[colorName] > 0) {
        availableBallsList.push([colorName, handBallCounts[colorName]]);
      }
    }

    availableBallsList.sort((itemOne, itemTwo) =>
      itemOne[0].localeCompare(itemTwo[0])
    );

    let handStringIdentifier = "";
    for (const colorCountPair of availableBallsList) {
      handStringIdentifier += colorCountPair[0] + colorCountPair[1];
    }
    return handStringIdentifier;
  }

  function resolveBoard(currentBoardString) {
    let boardModified = true;
    let dynamicBoardString = currentBoardString;

    while (boardModified) {
      boardModified = false;
      let boardScanIndex = 0;

      while (boardScanIndex < dynamicBoardString.length) {
        let groupEndIndex = boardScanIndex;
        while (
          groupEndIndex < dynamicBoardString.length &&
          dynamicBoardString[groupEndIndex] ===
            dynamicBoardString[boardScanIndex]
        ) {
          groupEndIndex++;
        }

        if (groupEndIndex - boardScanIndex >= 3) {
          dynamicBoardString =
            dynamicBoardString.substring(0, boardScanIndex) +
            dynamicBoardString.substring(groupEndIndex);
          boardModified = true;
          boardScanIndex = 0;
        } else {
          boardScanIndex++;
        }
      }
    }
    return dynamicBoardString;
  }

  function depthFirstSearch(currentBoardState, currentHandState) {
    if (currentBoardState.length === 0) return 0;

    const handColorsPresent = Object.keys(currentHandState);
    let allHandBallsUsed = true;
    for (const colorKey of handColorsPresent) {
      if (currentHandState[colorKey] > 0) {
        allHandBallsUsed = false;
        break;
      }
    }
    if (allHandBallsUsed) return -1;

    const memoizationKey =
      currentBoardState + generateHandKeyString(currentHandState);
    if (globalMemoization.has(memoizationKey)) {
      return globalMemoization.get(memoizationKey);
    }

    let minimumRequiredSteps = Infinity;

    for (const currentChosenColor of handColorsPresent) {
      if (currentHandState[currentChosenColor] <= 0) continue;

      currentHandState[currentChosenColor]--;

      for (
        let insertPosition = 0;
        insertPosition <= currentBoardState.length;
        insertPosition++
      ) {
        if (insertPosition > 0 && insertPosition < currentBoardState.length) {
          const charBefore = currentBoardState[insertPosition - 1];
          const charAfter = currentBoardState[insertPosition];
          if (
            charBefore !== currentChosenColor &&
            charAfter !== currentChosenColor &&
            charBefore !== charAfter
          ) {
            continue;
          }
        }

        let boardWithNewBall =
          currentBoardState.slice(0, insertPosition) +
          currentChosenColor +
          currentBoardState.slice(insertPosition);
        let boardAfterRemovals = resolveBoard(boardWithNewBall);

        const subsequentOperationResult = depthFirstSearch(
          boardAfterRemovals,
          currentHandState
        );

        if (subsequentOperationResult !== -1) {
          minimumRequiredSteps = Math.min(
            minimumRequiredSteps,
            subsequentOperationResult + 1
          );
        }
      }
      currentHandState[currentChosenColor]++;
    }

    const finalResultForState =
      minimumRequiredSteps === Infinity ? -1 : minimumRequiredSteps;
    globalMemoization.set(memoizationKey, finalResultForState);
    return finalResultForState;
  }

  return depthFirstSearch(board, handInventory);
};
