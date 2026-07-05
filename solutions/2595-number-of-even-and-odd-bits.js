/**
 * Number Of Even And Odd Bits
 * Intuition: Iterate through each potential bit position and check if the corresponding bit in the number is set. Then, categorize based on the bit's index parity.
 * Approach: 1. Initialize counters for even and odd indexed set bits to zero. 2. Loop from bit position 0 up to 31 (representing a 32-bit integer). 3. In each iteration, create a bit mask for the current position. 4. Use a bitwise AND operation with the input number and the mask to check if the bit at the current position is set. 5. If the bit is set, check if the current bit position is even or odd. 6. Increment the respective counter. 7. Return the array containing the even and odd counts.
 * Dry Run: n = 17 (binary: 10001)
 *   evenBitsCounter = 0, oddBitsCounter = 0
 *   bitPosition = 0: currentMask = 1 (00001). (17 & 1) = 1. bitPosition (0) is even. evenBitsCounter = 1.
 *   bitPosition = 1: currentMask = 2 (00010). (17 & 2) = 0.
 *   bitPosition = 2: currentMask = 4 (00100). (17 & 4) = 0.
 *   bitPosition = 3: currentMask = 8 (01000). (17 & 8) = 0.
 *   bitPosition = 4: currentMask = 16 (10000). (17 & 16) = 16. bitPosition (4) is even. evenBitsCounter = 2.
 *   ... loop continues for bitPosition 5 to 31, all will yield 0 for (17 & currentMask).
 *   Returns [2, 0].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var evenOddBit = function (n) {
  let evenBitsCounter = 0;
  let oddBitsCounter = 0;

  for (let bitPosition = 0; bitPosition < 32; bitPosition++) {
    let currentMask = 1 << bitPosition;
    if ((n & currentMask) !== 0) {
      if (bitPosition % 2 === 0) {
        evenBitsCounter++;
      } else {
        oddBitsCounter++;
      }
    }
  }

  return [evenBitsCounter, oddBitsCounter];
};
