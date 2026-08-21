/**
 * Maximum Coins From K Consecutive Bags
 * Intuition: Coins sit on disjoint segments. An optimal window of length k either starts at some segment's left endpoint or, symmetrically, ends at a right endpoint. Slide from both orientations.
 * Approach: 1. Sort segments. 2. For each left li, grow a window [li, li+k) adding full segments then a partial tail. 3. Repeat on negated [−r, −l] to cover windows that end on a segment. 4. Return the max.
 * Dry Run: coins = [[1,3,2],[5,6,4]], k=2. Window [5,6] yields 8.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var maximumCoins = function (coins, k) {
  const slideWindow = (segments) => {
    segments.sort(
      (leftSegment, rightSegment) => leftSegment[0] - rightSegment[0]
    );
    let bestCoins = 0;
    let fullWindowSum = 0;
    let windowEndIndex = 0;

    for (const [leftInclusive, rightInclusive, coinsPerBag] of segments) {
      const rightBoundary = leftInclusive + k;

      while (
        windowEndIndex + 1 < segments.length &&
        segments[windowEndIndex + 1][0] < rightBoundary
      ) {
        const [innerLeft, innerRight, innerCoins] = segments[windowEndIndex];
        fullWindowSum += (innerRight - innerLeft + 1) * innerCoins;
        windowEndIndex++;
      }

      let partialTail = 0;
      if (
        windowEndIndex < segments.length &&
        segments[windowEndIndex][0] < rightBoundary
      ) {
        const [innerLeft, innerRight, innerCoins] = segments[windowEndIndex];
        partialTail =
          (Math.min(rightBoundary - 1, innerRight) - innerLeft + 1) *
          innerCoins;
      }

      bestCoins = Math.max(bestCoins, fullWindowSum + partialTail);
      fullWindowSum -= (rightInclusive - leftInclusive + 1) * coinsPerBag;
    }

    return bestCoins;
  };

  const negatedSegments = coins.map(
    ([leftInclusive, rightInclusive, coinsPerBag]) => [
      -rightInclusive,
      -leftInclusive,
      coinsPerBag,
    ]
  );

  return Math.max(slideWindow(coins.slice()), slideWindow(negatedSegments));
};
