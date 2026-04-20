/**
 * 24 Game
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const judgePoint24 = function (cards) {
  const comparisonEpsilon = 1e-5;

  if (cards.length === 1) {
    return Math.abs(cards[0] - 24) < comparisonEpsilon;
  }

  for (
    let firstValueIndex = 0;
    firstValueIndex < cards.length;
    firstValueIndex++
  ) {
    for (
      let secondValueIndex = firstValueIndex + 1;
      secondValueIndex < cards.length;
      secondValueIndex++
    ) {
      const chosenValueOne = cards[firstValueIndex];
      const chosenValueTwo = cards[secondValueIndex];

      const remainingNumbers = cards.filter(
        (_cardNumber, currentNumberIndex) =>
          currentNumberIndex !== firstValueIndex &&
          currentNumberIndex !== secondValueIndex,
      );

      const intermediateCalculations = [];

      intermediateCalculations.push(chosenValueOne + chosenValueTwo);
      intermediateCalculations.push(chosenValueOne - chosenValueTwo);
      intermediateCalculations.push(chosenValueTwo - chosenValueOne);
      intermediateCalculations.push(chosenValueOne * chosenValueTwo);

      if (Math.abs(chosenValueTwo) > comparisonEpsilon) {
        intermediateCalculations.push(chosenValueOne / chosenValueTwo);
      }
      if (Math.abs(chosenValueOne) > comparisonEpsilon) {
        intermediateCalculations.push(chosenValueTwo / chosenValueOne);
      }

      for (const currentResult of intermediateCalculations) {
        const nextCardSet = [...remainingNumbers];
        nextCardSet.push(currentResult);
        if (judgePoint24(nextCardSet)) {
          return true;
        }
      }
    }
  }

  return false;
};
