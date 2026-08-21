/**
 * Grumpy Bookstore Owner
 * Intuition: Always-satisfied customers (grumpy=0) are a fixed base. The secret technique adds the best window of `minutes` among currently-grumpy minutes.
 * Approach: 1. Sum customers where grumpy is 0. 2. Sum grumpy customers in the first `minutes` window. 3. Slide the window, adding/removing grumpy customers, tracking the max extra. 4. Return base + max extra.
 * Dry Run: customers=[1,0,1,2,1,1,7,5], grumpy=[0,1,0,1,0,1,0,1], minutes=3.
 *   - Base (non-grumpy) 10. Sliding extra max is the last window's 1+5=6. Total 16.
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
      currentSlidingWindowGrumpySum
    );

    windowLeftPointer++;
    windowRightPointer++;
  }

  return baseSatisfiedCustomerCount + maximumSlidingWindowGrumpyGain;
};
