/**
 * 24 Game
 * Intuition: With four numbers, try every pair, every arithmetic op, replace the pair with the result, and recurse until one value remains; accept if it is within 1e-5 of 24.
 * Approach: 1. Base: one card → |x-24|<epsilon. 2. For each unordered pair of indices, build `remainingNumbers` and `intermediateCalculations` (+, both subtractions, *, both divisions if divisor ≠ 0). 3. Recurse on remaining plus each result; return true if any succeeds.
 * Dry Run: cards=[4,1,8,7]. Pick 4 and 8 → 32, remaining [1,7]; later 8-4=4 with 1,7 can form (8-4)*(7-1)=24 → true.
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
          currentNumberIndex !== secondValueIndex
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
