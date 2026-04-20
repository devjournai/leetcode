/**
 * Grumpy Bookstore Owner
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  const totalArraySize = customers.length;
  let baseSatisfiedCustomerCount = 0;
  let currentSlidingWindowGrumpySum = 0;

  let indexCounter = 0;
  while (indexCounter < totalArraySize) {
    const customerEntryValue = customers[indexCounter];
    const ownerGrumpyStateIndicator = grumpy[indexCounter];

    if (ownerGrumpyStateIndicator === 0) {
      baseSatisfiedCustomerCount += customerEntryValue;
    }

    if (indexCounter < minutes && ownerGrumpyStateIndicator === 1) {
      currentSlidingWindowGrumpySum += customerEntryValue;
    }
    indexCounter++;
  }

  let maximumSlidingWindowGrumpyGain = currentSlidingWindowGrumpySum;

  let windowLeftPointer = 0;
  let windowRightPointer = minutes;
  while (windowRightPointer < totalArraySize) {
    const leavingCustomerValue = customers[windowLeftPointer];
    const leavingOwnerState = grumpy[windowLeftPointer];

    if (leavingOwnerState === 1) {
      currentSlidingWindowGrumpySum -= leavingCustomerValue;
    }

    const enteringCustomerValue = customers[windowRightPointer];
    const enteringOwnerState = grumpy[windowRightPointer];

    if (enteringOwnerState === 1) {
      currentSlidingWindowGrumpySum += enteringCustomerValue;
    }

    maximumSlidingWindowGrumpyGain = Math.max(
      maximumSlidingWindowGrumpyGain,
      currentSlidingWindowGrumpySum,
    );

    windowLeftPointer++;
    windowRightPointer++;
  }

  return baseSatisfiedCustomerCount + maximumSlidingWindowGrumpyGain;
};
