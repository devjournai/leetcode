/**
 * Fair Candy Swap
 * Intuition: After swap `a` from Alice and `b` from Bob, totals equal iff `a - b = (sumA - sumB) / 2`. Look up that `b` in a set of Bob's boxes.
 * Approach: 1. Sum both arrays. 2. `requiredDifference = (totalAlice - totalBob) / 2`. 3. `bobCandySet = Set(bobSizes)`. 4. For each Alice box, if `alice - requiredDifference` is in the set, return `[alice, that Bob box]`.
 * Dry Run: aliceSizes = [1,1], bobSizes = [2,2].
 *   - Sums 2 and 4, difference (2-4)/2 = -1. Alice 1 needs Bob 1-(-1)=2. Return [1,2].
 * Time Complexity: O(N_a + N_b)
 * Space Complexity: O(N_b)
 */
var fairCandySwap = function (aliceSizes, bobSizes) {
  const totalCandiesAlice = aliceSizes.reduce(
    (currentSum, candyBox) => currentSum + candyBox,
    0
  );
  const totalCandiesBob = bobSizes.reduce(
    (accumulatedSum, candyItem) => accumulatedSum + candyItem,
    0
  );

  const requiredDifference = (totalCandiesAlice - totalCandiesBob) / 2;

  const bobCandySet = new Set(bobSizes);

  for (let aliceIndex = 0; aliceIndex < aliceSizes.length; aliceIndex++) {
    const currentAliceCandy = aliceSizes[aliceIndex];
    const correspondingBobCandy = currentAliceCandy - requiredDifference;
    if (bobCandySet.has(correspondingBobCandy)) {
      return [currentAliceCandy, correspondingBobCandy];
    }
  }
};
