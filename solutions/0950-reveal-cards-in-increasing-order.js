/**
 * Reveal Cards In Increasing Order
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var deckRevealedIncreasing = function (deck) {
  const deckSize = deck.length;
  const sortedDeckValues = [...deck];
  sortedDeckValues.sort((firstValue, secondValue) => firstValue - secondValue);

  const revealedOrderResult = new Array(deckSize).fill(0);
  const positionQueue = Array.from({ length: deckSize }, (_, index) => index);

  for (let cardIterator = 0; cardIterator < deckSize; cardIterator++) {
    const currentCardValue = sortedDeckValues[cardIterator];
    const targetIndex = positionQueue.shift();
    revealedOrderResult[targetIndex] = currentCardValue;

    if (positionQueue.length > 0) {
      const skippedPosition = positionQueue.shift();
      positionQueue.push(skippedPosition);
    }
  }

  return revealedOrderResult;
};
