/**
 * X Of A Kind In A Deck Of Cards
 * Time Complexity: O(N log K)
 * Space Complexity: O(M)
 */
var hasGroupsSizeX = function (deckOfCards) {
  const findGcd = (firstVal, secondVal) => {
    while (secondVal !== 0) {
      const remainderVal = firstVal % secondVal;
      firstVal = secondVal;
      secondVal = remainderVal;
    }
    return firstVal;
  };

  const frequencyMap = new Map();
  for (const cardIdentifier of deckOfCards) {
    frequencyMap.set(
      cardIdentifier,
      (frequencyMap.get(cardIdentifier) || 0) + 1,
    );
  }

  let aggregateGcd = 0;
  let firstTime = true;

  for (const countValue of frequencyMap.values()) {
    if (firstTime) {
      aggregateGcd = countValue;
      firstTime = false;
    } else {
      aggregateGcd = findGcd(aggregateGcd, countValue);
    }
  }

  return aggregateGcd > 1;
};
