/**
 * Hand Of Straights
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var isNStraightHand = function (inputCards, groupSizeLimit) {
  const handLength = inputCards.length;

  if (handLength % groupSizeLimit !== 0) {
    return false;
  }

  const sortedCardValues = [...inputCards].sort(
    (valueA, valueB) => valueA - valueB,
  );

  const cardFrequencyMap = {};
  for (const cardEntry of sortedCardValues) {
    cardFrequencyMap[cardEntry] = (cardFrequencyMap[cardEntry] || 0) + 1;
  }

  for (const currentCardToCheck of sortedCardValues) {
    if (cardFrequencyMap[currentCardToCheck] === 0) {
      continue;
    }

    for (
      let consecutiveOffset = 0;
      consecutiveOffset < groupSizeLimit;
      consecutiveOffset++
    ) {
      const expectedCardValue = currentCardToCheck + consecutiveOffset;

      if (
        !cardFrequencyMap[expectedCardValue] ||
        cardFrequencyMap[expectedCardValue] === 0
      ) {
        return false;
      }

      cardFrequencyMap[expectedCardValue]--;
    }
  }

  return true;
};
