/**
 * Incremental Memory Leak
 * Time Complexity: O(sqrt(memory1 + memory2))
 * Space Complexity: O(1)
 */
var memLeak = function (memory1, memory2) {
  let currentSecondTick = 1;
  let stickOneCapacity = memory1;
  let stickTwoCapacity = memory2;

  while (true) {
    if (stickOneCapacity >= stickTwoCapacity) {
      if (stickOneCapacity < currentSecondTick) {
        break;
      }
      stickOneCapacity -= currentSecondTick;
    } else {
      if (stickTwoCapacity < currentSecondTick) {
        break;
      }
      stickTwoCapacity -= currentSecondTick;
    }
    currentSecondTick++;
  }

  return [currentSecondTick, stickOneCapacity, stickTwoCapacity];
};
