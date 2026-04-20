/**
 * Design Parking System
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
