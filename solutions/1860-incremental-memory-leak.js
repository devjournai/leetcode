/**
 * Incremental Memory Leak
 * Intuition: Each second i allocates i bits to the stick that currently has more (or equal) memory. Stop when neither stick can pay i.
 * Approach: 1. Start `currentSecondTick` at 1. 2. If `stickOneCapacity >= stickTwoCapacity`, subtract from stick 1 if possible else break; otherwise stick 2. 3. Increment the second. 4. Return [crash second, remaining1, remaining2].
 * Dry Run: memory1=2, memory2=2.
 *   - t=1: equal, stick1=1. t=2: stick2 has more, stick2=0. t=3: stick1=1<3 break. Return [3,1,0].
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
