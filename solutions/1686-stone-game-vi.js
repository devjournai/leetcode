/**
 * Stone Game Vi
 * Intuition: Taking a stone gives you its Alice/Bob value and denies the opponent theirs, so the true priority of a stone is aliceValues[i]+bobValues[i]. Greedily pick stones in that combined order, alternating turns.
 * Approach: 1. Build `stoneDataList` with `combined`, `alicePoints`, `bobPoints`. 2. Sort descending by `combined`. 3. Even `pickIterator` adds Alice's points to `playerOneScore`, odd adds Bob's to `playerTwoScore`. 4. Return 1, -1, or 0 by comparing scores.
 * Dry Run: aliceValues = [1,3], bobValues = [2,1]
 * Combined [3,4]; sort stone1 then stone0. Alice takes 3, Bob takes 2 → 3>2 → 1.
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
    }
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
