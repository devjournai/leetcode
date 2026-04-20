/**
 * Logger Rate Limiter
 * Time Complexity: O(1)
 * Space Complexity: O(M)
*/
var Logger = function () {
  this.printEligibilityMap = new Map();
};

Logger.prototype.shouldPrintMessage = function (currentTimestamp, currentMessage) {
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