/**
 * Reveal Cards In Increasing Order
 * Intuition: Revealing is “take front, then move next front to back.” Reverse that on the index queue while placing sorted cards: assign the next smallest to the current front index, then rotate the next index to the back.
 * Approach: 1. Sort a copy of the deck. 2. `positionQueue` = 0..n-1. 3. For each sorted card, shift an index, write the card there; if queue nonempty, shift again and push that index. 4. Return `revealedOrderResult`.
 * Dry Run: deck=[17,13,11,2,3,5,7] sorted 2,3,5,7,11,13,17. Indices rotate to place 2,3,5,... → [2,13,3,11,5,17,7].
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
