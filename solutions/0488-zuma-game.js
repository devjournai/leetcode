/**
 * Zuma Game
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

    availableBallsList.sort((itemOne, itemTwo) => itemOne[0].localeCompare(itemTwo[0]));

    let handStringIdentifier = '';
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
        while (groupEndIndex < dynamicBoardString.length && dynamicBoardString[groupEndIndex] === dynamicBoardString[boardScanIndex]) {
          groupEndIndex++;
        }

        if (groupEndIndex - boardScanIndex >= 3) {
          dynamicBoardString = dynamicBoardString.substring(0, boardScanIndex) + dynamicBoardString.substring(groupEndIndex);
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

    const memoizationKey = currentBoardState + generateHandKeyString(currentHandState);
    if (globalMemoization.has(memoizationKey)) {
      return globalMemoization.get(memoizationKey);
    }

    let minimumRequiredSteps = Infinity;

    for (const currentChosenColor of handColorsPresent) {
      if (currentHandState[currentChosenColor] <= 0) continue;

      currentHandState[currentChosenColor]--;

      for (let insertPosition = 0; insertPosition <= currentBoardState.length; insertPosition++) {
        if (insertPosition > 0 && insertPosition < currentBoardState.length) {
          const charBefore = currentBoardState[insertPosition - 1];
          const charAfter = currentBoardState[insertPosition];
          if (charBefore !== currentChosenColor && charAfter !== currentChosenColor && charBefore !== charAfter) {
            continue;
          }
        }

        let boardWithNewBall = currentBoardState.slice(0, insertPosition) + currentChosenColor + currentBoardState.slice(insertPosition);
        let boardAfterRemovals = resolveBoard(boardWithNewBall);

        const subsequentOperationResult = depthFirstSearch(boardAfterRemovals, currentHandState);

        if (subsequentOperationResult !== -1) {
          minimumRequiredSteps = Math.min(minimumRequiredSteps, subsequentOperationResult + 1);
        }
      }
      currentHandState[currentChosenColor]++;
    }

    const finalResultForState = minimumRequiredSteps === Infinity ? -1 : minimumRequiredSteps;
    globalMemoization.set(memoizationKey, finalResultForState);
    return finalResultForState;
  }

  return depthFirstSearch(board, handInventory);
};