/**
 * K Empty Slots
 * Intuition: Invert the array so `bulbActivationDays[position]` is the day that slot turns on. A valid pair of bulbs is two endpoints k slots apart whose interior all turn on later than both endpoints.
 * Approach: 1. Fill `bulbActivationDays`. 2. Slide window left=1, right=k+2. 3. If any interior day is < max(endpoint days), jump left to that interior and reset right. 4. Else record min of that max day and shift the window by 1. 5. Return -1 if none.
 * Dry Run: bulbs=[1,3,2], k=1. days[1]=1, days[2]=3, days[3]=2. Window (1,3): interior day 3 ≥ max(1,2)=2 → valid, minValidDay=2.
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
        bulbActivationDays[windowRightPosition]
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
          bulbActivationDays[windowRightPosition]
        )
      );
      windowLeftPosition++;
      windowRightPosition++;
    }
  }

  return minValidDay === Infinity ? -1 : minValidDay;
};
