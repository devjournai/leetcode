/**
 * Design Parking System
 * Intuition: Three independent slot counters (big/medium/small) are enough; park a car only when its type still has a free stall.
 * Approach: 1. Store remaining slots in a map keyed by type 1/2/3. 2. On addCar, if that type's count is > 0, decrement it and return true. 3. Otherwise return false. All operations are O(1).
 * Dry Run: ParkingSystem(1, 1, 0); addCar(1) → true (big 0 left); addCar(2) → true; addCar(3) → false; addCar(1) → false.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var ParkingSystem = function (bigSlots, mediumSlots, smallSlots) {
  this.availableSlotsByType = {
    1: bigSlots,
    2: mediumSlots,
    3: smallSlots,
  };
};

ParkingSystem.prototype.addCar = function (carIdentifier) {
  const currentSlotCount = this.availableSlotsByType[carIdentifier];
  const spaceAvailable = currentSlotCount > 0;

  if (spaceAvailable) {
    this.availableSlotsByType[carIdentifier] = currentSlotCount - 1;
  }

  return spaceAvailable;
};
