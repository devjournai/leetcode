/**
 * Fair Candy Swap
 * Time Complexity: O(N_a + N_b)
 * Space Complexity: O(N_b)
 */
var fairCandySwap = function (aliceSizes, bobSizes) {
  const totalCandiesAlice = aliceSizes.reduce(
    (currentSum, candyBox) => currentSum + candyBox,
    0,
  );
  const totalCandiesBob = bobSizes.reduce(
    (accumulatedSum, candyItem) => accumulatedSum + candyItem,
    0,
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
