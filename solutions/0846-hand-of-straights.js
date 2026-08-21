/**
 * Hand Of Straights
 * Intuition: After sorting, greedily start a group of `groupSizeLimit` consecutive values at each leftover card; fail if any needed value is missing.
 * Approach: 1. Length not divisible by group size → false. 2. Sort a copy; count frequencies. 3. For each card with remaining count, decrement that value and the next groupSize-1 consecutives, or return false. 4. True if all groups form.
 * Dry Run: [1,2,3,6,2,3,4,7,8], group=3. Groups 1-2-3, 2-3-4, 6-7-8 → true. Missing 4 after 2,3 would fail.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var isNStraightHand = function (inputCards, groupSizeLimit) {
  const handLength = inputCards.length;

  if (handLength % groupSizeLimit !== 0) {
    return false;
  }

  const sortedCardValues = [...inputCards].sort(
    (valueA, valueB) => valueA - valueB
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
