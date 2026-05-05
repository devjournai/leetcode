/**
 * The Earliest And Latest Rounds Where Players Compete
 * Time Complexity: O(R * (N * S_max))
 * Space Complexity: O(R * S_max)
 */
var earliestAndLatest = function (totalPlayers, playerOne, playerTwo) {
  let minimumRounds = Infinity;
  let maximumRounds = 0;

  exploreRounds(0n, 1);

  return [minimumRounds, maximumRounds];

  function exploreRounds(currentEliminationBitmask, currentRoundCount) {
    let possibleMasksForCurrentRound = [currentEliminationBitmask];
    let frontPlayerPosition = 1;
    let backPlayerPosition = totalPlayers;

    while (true) {
      while (
        (currentEliminationBitmask & (1n << BigInt(frontPlayerPosition))) !==
        0n
      ) {
        frontPlayerPosition++;
      }
      while (
        (currentEliminationBitmask & (1n << BigInt(backPlayerPosition))) !==
        0n
      ) {
        backPlayerPosition--;
      }

      if (frontPlayerPosition >= backPlayerPosition) {
        break;
      }

      if (
        (frontPlayerPosition === playerOne &&
          backPlayerPosition === playerTwo) ||
        (frontPlayerPosition === playerTwo && backPlayerPosition === playerOne)
      ) {
        minimumRounds = Math.min(minimumRounds, currentRoundCount);
        maximumRounds = Math.max(maximumRounds, currentRoundCount);
        return;
      }

      const eliminationOptionsForPair = [];

      if (
        backPlayerPosition !== playerOne &&
        backPlayerPosition !== playerTwo
      ) {
        for (const individualMaskFromRound of possibleMasksForCurrentRound) {
          eliminationOptionsForPair.push(
            individualMaskFromRound | (1n << BigInt(backPlayerPosition)),
          );
        }
      }

      if (
        frontPlayerPosition !== playerOne &&
        frontPlayerPosition !== playerTwo
      ) {
        for (const individualMaskFromRound of possibleMasksForCurrentRound) {
          eliminationOptionsForPair.push(
            individualMaskFromRound | (1n << BigInt(frontPlayerPosition)),
          );
        }
      }

      frontPlayerPosition++;
      backPlayerPosition--;
      possibleMasksForCurrentRound = eliminationOptionsForPair;
    }

    if (!possibleMasksForCurrentRound.length) {
      return;
    }

    currentRoundCount++;

    const uniqueNextRoundMasks = new Set(possibleMasksForCurrentRound);
    uniqueNextRoundMasks.forEach((nextRoundMask) =>
      exploreRounds(nextRoundMask, currentRoundCount),
    );
  }
};
