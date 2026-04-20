/**
 * Couples Holding Hands
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
}
