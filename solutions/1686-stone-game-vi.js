/**
 * Stone Game Vi
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var stoneGameVI = function (aliceValues, bobValues) {
  const pileSize = aliceValues.length;

  const stoneDataList = aliceValues.map(
    (aliceIndividualValue, currentMapIndex) => {
      const bobIndividualValue = bobValues[currentMapIndex];
      const combinedPointValue = aliceIndividualValue + bobIndividualValue;
      return {
        combined: combinedPointValue,
        alicePoints: aliceIndividualValue,
        bobPoints: bobIndividualValue,
      };
    },
  );

  const sortedStones = stoneDataList.sort((firstStone, secondStone) => {
    return secondStone.combined - firstStone.combined;
  });

  let playerOneScore = 0;
  let playerTwoScore = 0;

  for (let pickIterator = 0; pickIterator < pileSize; pickIterator++) {
    const currentStonePicked = sortedStones[pickIterator];
    const isAliceTurn = pickIterator % 2 === 0;

    if (isAliceTurn) {
      playerOneScore += currentStonePicked.alicePoints;
    } else {
      playerTwoScore += currentStonePicked.bobPoints;
    }
  }

  if (playerOneScore > playerTwoScore) {
    return 1;
  } else if (playerTwoScore > playerOneScore) {
    return -1;
  } else {
    return 0;
  }
};
