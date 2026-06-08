/**
 * Minimum Consecutive Cards To Pick Up
 * Intuition: To find the minimum length of consecutive cards containing a matching pair, we can efficiently track the last seen position of each card value. When a card value is encountered again, the distance between its current and previous occurrences gives a candidate for the minimum length.
 * Approach: 1. Initialize a `Map` to store the last seen index for each card value. 2. Initialize a variable `minimumDistance` to `Infinity` to track the shortest segment length. 3. Iterate through the `cards` array with an index `currentScanIndex`. 4. For each `currentCardValue` at `currentScanIndex`: a. Check if `currentCardValue` already exists in the `lastSeenIndices` Map. b. If it exists, retrieve its `previousOccurrenceIndex`. Calculate the `calculatedSegmentLength` as `currentScanIndex - previousOccurrenceIndex + 1`. c. Update `minimumDistance` with the smaller of `minimumDistance` and `calculatedSegmentLength`. d. Regardless of whether it existed or not, update the `lastSeenIndices` Map with `currentCardValue` and its `currentScanIndex`. 5. After iterating through all cards, if `minimumDistance` is still `Infinity`, return -1 (no matching pair found); otherwise, return `minimumDistance`.
 * Dry Run: cards = [3,4,2,3,4]
 * lastSeenIndices = new Map()
 * minimumDistance = Infinity
 *
 * 1. currentScanIndex = 0, currentCardValue = 3
 *    - lastSeenIndices does not have 3.
 *    - lastSeenIndices.set(3, 0) -> lastSeenIndices = {3:0}
 * 2. currentScanIndex = 1, currentCardValue = 4
 *    - lastSeenIndices does not have 4.
 *    - lastSeenIndices.set(4, 1) -> lastSeenIndices = {3:0, 4:1}
 * 3. currentScanIndex = 2, currentCardValue = 2
 *    - lastSeenIndices does not have 2.
 *    - lastSeenIndices.set(2, 2) -> lastSeenIndices = {3:0, 4:1, 2:2}
 * 4. currentScanIndex = 3, currentCardValue = 3
 *    - lastSeenIndices has 3. previousOccurrenceIndex = lastSeenIndices.get(3) which is 0.
 *    - calculatedSegmentLength = 3 - 0 + 1 = 4.
 *    - minimumDistance = Math.min(Infinity, 4) = 4.
 *    - lastSeenIndices.set(3, 3) -> lastSeenIndices = {3:3, 4:1, 2:2}
 * 5. currentScanIndex = 4, currentCardValue = 4
 *    - lastSeenIndices has 4. previousOccurrenceIndex = lastSeenIndices.get(4) which is 1.
 *    - calculatedSegmentLength = 4 - 1 + 1 = 4.
 *    - minimumDistance = Math.min(4, 4) = 4.
 *    - lastSeenIndices.set(4, 4) -> lastSeenIndices = {3:3, 4:4, 2:2}
 *
 * Loop ends. minimumDistance is 4. Since 4 !== Infinity, return 4.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var minimumCardPickup = function (cards) {
  const lastSeenIndices = new Map();
  let minimumDistance = Infinity;

  for (
    let currentScanIndex = 0;
    currentScanIndex < cards.length;
    currentScanIndex++
  ) {
    const currentCardValue = cards[currentScanIndex];
    if (lastSeenIndices.has(currentCardValue)) {
      const previousOccurrenceIndex = lastSeenIndices.get(currentCardValue);
      const calculatedSegmentLength =
        currentScanIndex - previousOccurrenceIndex + 1;
      minimumDistance = Math.min(minimumDistance, calculatedSegmentLength);
    }
    lastSeenIndices.set(currentCardValue, currentScanIndex);
  }

  return minimumDistance === Infinity ? -1 : minimumDistance;
};
