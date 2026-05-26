/**
 * Number Of Laser Beams In A Bank
 * Intuition: Laser beams only form between security devices in two different rows, with no intermediate security devices. This means we only care about consecutive rows that *contain* security devices. If a row has 'X' devices and the previously encountered row with devices had 'Y' devices, they form X*Y beams.
 * Approach: 1. Initialize a variable `overallBeamCount` to track the total beams, and `previousActiveRowCount` to store the number of devices in the last non-empty row. 2. Iterate through each row of the `bank` array using a numerical index. 3. For each row, count the number of security devices (`'1'`) present, storing this in `deviceCounter`. 4. If `deviceCounter` is greater than zero, it means this row has security devices. Multiply `previousActiveRowCount` by `deviceCounter` and add this product to `overallBeamCount`. 5. Then, update `previousActiveRowCount` to the current `deviceCounter` for the next iteration. 6. If `deviceCounter` is zero, simply skip this row as it cannot contribute to or start any new beams. 7. After processing all rows, return `overallBeamCount`.
 * Dry Run: bank = ["011001", "000000", "010100", "001000"]
 * 1. overallBeamCount = 0, previousActiveRowCount = 0
 * 2. rowIndex = 0, currentRowString = "011001"
 *    deviceCounter = 3 (from '1's)
 *    3 > 0 is true.
 *    overallBeamCount = 0 + (0 * 3) = 0
 *    previousActiveRowCount = 3
 * 3. rowIndex = 1, currentRowString = "000000"
 *    deviceCounter = 0
 *    0 > 0 is false.
 *    overallBeamCount remains 0, previousActiveRowCount remains 3.
 * 4. rowIndex = 2, currentRowString = "010100"
 *    deviceCounter = 2 (from '1's)
 *    2 > 0 is true.
 *    overallBeamCount = 0 + (3 * 2) = 6
 *    previousActiveRowCount = 2
 * 5. rowIndex = 3, currentRowString = "001000"
 *    deviceCounter = 1 (from '1's)
 *    1 > 0 is true.
 *    overallBeamCount = 6 + (2 * 1) = 8
 *    previousActiveRowCount = 1
 * 6. End of bank. Return overallBeamCount = 8.
 * Time Complexity: O(M * N)
 * Space Complexity: O(1)
 */
var numberOfBeams = function (bank) {
  let overallBeamCount = 0;
  let previousActiveRowCount = 0;

  for (let rowIndex = 0; rowIndex < bank.length; rowIndex++) {
    let currentRowString = bank[rowIndex];
    let deviceCounter = 0;

    for (let charIndex = 0; charIndex < currentRowString.length; charIndex++) {
      let charEntry = currentRowString[charIndex];
      if (charEntry === "1") {
        deviceCounter++;
      }
    }

    if (deviceCounter > 0) {
      overallBeamCount += previousActiveRowCount * deviceCounter;
      previousActiveRowCount = deviceCounter;
    }
  }

  return overallBeamCount;
};
