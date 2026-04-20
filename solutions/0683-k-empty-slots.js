/**
 * K Empty Slots
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var kEmptySlots = function (bulbs, k) {
  const bulbActivationDays = new Array(bulbs.length + 1);

  for (
    let currentBulbIndex = 0;
    currentBulbIndex < bulbs.length;
    ++currentBulbIndex
  ) {
    const bulbPosition = bulbs[currentBulbIndex];
    bulbActivationDays[bulbPosition] = currentBulbIndex + 1;
  }

  let windowLeftPosition = 1;
  let windowRightPosition = k + 2;
  let minValidDay = Infinity;

  while (windowRightPosition <= bulbs.length) {
    let currentWindowIsValid = true;

    for (
      let intermediateBulbPosition = windowLeftPosition + 1;
      intermediateBulbPosition < windowRightPosition;
      ++intermediateBulbPosition
    ) {
      const maxEdgeActivationDay = Math.max(
        bulbActivationDays[windowLeftPosition],
        bulbActivationDays[windowRightPosition],
      );

      if (bulbActivationDays[intermediateBulbPosition] < maxEdgeActivationDay) {
        currentWindowIsValid = false;
        windowLeftPosition = intermediateBulbPosition;
        windowRightPosition = intermediateBulbPosition + k + 1;
        break;
      }
    }

    if (currentWindowIsValid) {
      minValidDay = Math.min(
        minValidDay,
        Math.max(
          bulbActivationDays[windowLeftPosition],
          bulbActivationDays[windowRightPosition],
        ),
      );
      windowLeftPosition++;
      windowRightPosition++;
    }
  }

  return minValidDay === Infinity ? -1 : minValidDay;
};
