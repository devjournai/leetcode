/**
 * Couples Holding Hands
 * Intuition: Seats come in pairs (0-1, 2-3, …). Person `2k` belongs with `2k+1`. For each even seat, if the neighbor is not that partner, swap the partner into place using `personSeatLocation`.
 * Approach: 1. Build `personPartnerMap` (even→+1, odd→-1) and `personSeatLocation` from `rowInput`. 2. For `currentPosition` = 0,2,… if `personAtRightSeat !== expectedPartnerForLeft`, increment `totalSwapsCount`, swap those two people in `rowInput`, and update both seat indices. 3. Return `totalSwapsCount`.
 * Dry Run: rowInput = [0,2,1,3].
 *   - Pair 0-1: left 0 wants 1, right is 2 → swap 2 with 1 at index 2. Row [0,1,2,3], swaps = 1.
 *   - Pair 2-3: 2 and 3 already partners. Return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSwapsCouples = function (rowInput) {
  const totalPersonsInRow = rowInput.length;

  const personPartnerMap = new Array(totalPersonsInRow);
  const personSeatLocation = new Array(totalPersonsInRow);

  for (
    let currentPersonIdentifier = 0;
    currentPersonIdentifier < totalPersonsInRow;
    currentPersonIdentifier++
  ) {
    personPartnerMap[currentPersonIdentifier] =
      currentPersonIdentifier % 2 === 0
        ? currentPersonIdentifier + 1
        : currentPersonIdentifier - 1;
    personSeatLocation[rowInput[currentPersonIdentifier]] =
      currentPersonIdentifier;
  }

  let totalSwapsCount = 0;

  for (
    let currentPosition = 0;
    currentPosition < totalPersonsInRow;
    currentPosition += 2
  ) {
    const personAtLeftSeat = rowInput[currentPosition];
    const expectedPartnerForLeft = personPartnerMap[personAtLeftSeat];
    const personAtRightSeat = rowInput[currentPosition + 1];

    if (personAtRightSeat !== expectedPartnerForLeft) {
      totalSwapsCount++;

      const actualSeatOfExpectedPartner =
        personSeatLocation[expectedPartnerForLeft];
      const unwantedPersonAtRight = personAtRightSeat;

      rowInput[currentPosition + 1] = expectedPartnerForLeft;
      rowInput[actualSeatOfExpectedPartner] = unwantedPersonAtRight;

      personSeatLocation[expectedPartnerForLeft] = currentPosition + 1;
      personSeatLocation[unwantedPersonAtRight] = actualSeatOfExpectedPartner;
    }
  }

  return totalSwapsCount;
};
