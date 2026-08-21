/**
 * Logger Rate Limiter
 * Intuition: Remember, per message, the next timestamp at which printing is allowed (last print + 10). A message is new if unseen, or printable if `timestamp >=` that stored next time.
 * Approach: 1. Map `printEligibilityMap` stores next-allowed times. 2. Unseen message: store `timestamp + 10` and return true. 3. Seen and `timestamp >=` stored time: update to `timestamp + 10` and return true. 4. Otherwise return false.
 * Dry Run: shouldPrint("foo", 1) stores 11, true; at t=2 still 2 < 11, false; at t=11 updates to 21, true.
 * Time Complexity: O(1)
 * Space Complexity: O(M)
 */
var Logger = function () {
  this.printEligibilityMap = new Map();
};

Logger.prototype.shouldPrintMessage = function (
  currentTimestamp,
  currentMessage
) {
  if (this.printEligibilityMap.has(currentMessage)) {
    const lastPrintValidTime = this.printEligibilityMap.get(currentMessage);
    if (currentTimestamp >= lastPrintValidTime) {
      const nextPermittedTime = currentTimestamp + 10;
      this.printEligibilityMap.set(currentMessage, nextPermittedTime);
      return true;
    } else {
      return false;
    }
  } else {
    const initialPermittedTime = currentTimestamp + 10;
    this.printEligibilityMap.set(currentMessage, initialPermittedTime);
    return true;
  }
};
