/**
 * X Of A Kind In A Deck Of Cards
 * Intuition: Groups of size X>1 exist iff X divides every card’s frequency, i.e. gcd of all frequencies is >1.
 * Approach: 1. Euclidean `findGcd`. 2. Count values in `frequencyMap`. 3. Fold gcd over the counts. 4. Return `aggregateGcd > 1`.
 * Dry Run: [1,2,3,4,4,3,2,1] freqs 2,2,2,2 → gcd=2 >1 → true. [1,1,1,2,2,2,3,3] gcd(3,3,2)=1 → false.
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
      (frequencyMap.get(cardIdentifier) || 0) + 1
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
