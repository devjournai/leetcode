/*
 * Design Bitset
 * Intuition: Utilize a single underlying array to store bits and a boolean flag to track global flip state, maintaining a count of set bits for O(1) operations. This avoids iterating through the entire bitset on flip, all, one, and count operations.
 * Approach: 1. Initialize Uint8Array for bit storage, onesCounter for set bits, bitsetStateFlipped for global flip, and totalSize. 2. fix: Determine current effective bit value. If it is 0, update the underlying storage to make it 1 effectively and increment onesCounter. Use an if (outer) { if (inner) {} else {} } structure. 3. unfix: Determine current effective bit value. If it is 1, update the underlying storage to make it 0 effectively and decrement onesCounter. Use an if (condition) { ternary assignment } structure. 4. flip: Toggle bitsetStateFlipped and update onesCounter to reflect the new count of set bits (total size - current ones). 5. all, one, count: Return onesCounter or its comparison with totalSize. 6. toString: Iterate through the storage array, applying the bitsetStateFlipped logic to each bit to build the string. Use a for loop.
 * Dry Run:
 * Bitset(3) -> this.bitStorage = [0, 0, 0], this.onesCounter = 0, this.bitsetStateFlipped = false, this.totalSize = 3
 * fix(0):
 *   indexPosition = 0, currentStoredBitValue = this.bitStorage[0] (0)
 *   effectiveCurrentBit = false ? (1-0) : 0 -> 0
 *   effectiveCurrentBit (0) === 0 is true.
 *     this.bitsetStateFlipped (false) is false. this.bitStorage[0] becomes 1.
 *     this.onesCounter becomes 1.
 *   this.bitStorage = [1, 0, 0], this.onesCounter = 1, this.bitsetStateFlipped = false
 * fix(2):
 *   indexPosition = 2, currentStoredBitValue = this.bitStorage[2] (0)
 *   effectiveCurrentBit = false ? (1-0) : 0 -> 0
 *   effectiveCurrentBit (0) === 0 is true.
 *     this.bitsetStateFlipped (false) is false. this.bitStorage[2] becomes 1.
 *     this.onesCounter becomes 2.
 *   this.bitStorage = [1, 0, 1], this.onesCounter = 2, this.bitsetStateFlipped = false
 * flip():
 *   this.bitsetStateFlipped becomes !false -> true.
 *   this.onesCounter becomes this.totalSize (3) - this.onesCounter (2) -> 1.
 *   this.bitStorage = [1, 0, 1], this.onesCounter = 1, this.bitsetStateFlipped = true (logical state: [0, 1, 0])
 * unfix(0):
 *   targetIndex = 0, currentBitValueAtTarget = this.bitStorage[0] (1)
 *   logicalBitRepresentation = true ? (1-1) : 1 -> 0
 *   logicalBitRepresentation (0) === 1 is false. No change.
 *   this.bitStorage = [1, 0, 1], this.onesCounter = 1, this.bitsetStateFlipped = true (logical state: [0, 1, 0])
 * unfix(1):
 *   targetIndex = 1, currentBitValueAtTarget = this.bitStorage[1] (0)
 *   logicalBitRepresentation = true ? (1-0) : 0 -> 1
 *   logicalBitRepresentation (1) === 1 is true.
 *     newStoredValue = true ? 1 : 0 -> 1. this.bitStorage[1] becomes 1.
 *     this.onesCounter becomes 1 - 1 -> 0.
 *   this.bitStorage = [1, 1, 1], this.onesCounter = 0, this.bitsetStateFlipped = true (logical state: [0, 0, 0])
 * toString():
 *   resultantString = ''; arrayLength = 3
 *   loopIndex = 0: resultantString += true ? (1-this.bitStorage[0] (1)) : 1 -> '0'
 *   loopIndex = 1: resultantString += true ? (1-this.bitStorage[1] (1)) : 1 -> '00'
 *   loopIndex = 2: resultantString += true ? (1-this.bitStorage[2] (1)) : 1 -> '000'
 *   Returns "000".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var Bitset = function (initialSizeValue) {
  this.bitStorage = new Uint8Array(initialSizeValue);
  this.onesCounter = 0;
  this.bitsetStateFlipped = false;
  this.totalSize = initialSizeValue;
};

Bitset.prototype.fix = function (indexPosition) {
  let currentStoredBitValue = this.bitStorage[indexPosition];
  let effectiveCurrentBit = this.bitsetStateFlipped
    ? 1 - currentStoredBitValue
    : currentStoredBitValue;

  if (effectiveCurrentBit === 0) {
    if (this.bitsetStateFlipped) {
      this.bitStorage[indexPosition] = 0;
    } else {
      this.bitStorage[indexPosition] = 1;
    }
    this.onesCounter++;
  }
};

Bitset.prototype.unfix = function (targetIndex) {
  let currentBitValueAtTarget = this.bitStorage[targetIndex];
  let logicalBitRepresentation = this.bitsetStateFlipped
    ? 1 - currentBitValueAtTarget
    : currentBitValueAtTarget;

  if (logicalBitRepresentation === 1) {
    const newStoredValue = this.bitsetStateFlipped ? 1 : 0;
    this.bitStorage[targetIndex] = newStoredValue;
    this.onesCounter--;
  }
};

Bitset.prototype.flip = function () {
  this.bitsetStateFlipped = !this.bitsetStateFlipped;
  this.onesCounter = this.totalSize - this.onesCounter;
};

Bitset.prototype.all = function () {
  return this.onesCounter === this.totalSize;
};

Bitset.prototype.one = function () {
  return this.onesCounter > 0;
};

Bitset.prototype.count = function () {
  return this.onesCounter;
};

Bitset.prototype.toString = function () {
  let resultantString = "";
  let arrayLength = this.bitStorage.length;
  for (let loopIndex = 0; loopIndex < arrayLength; loopIndex++) {
    resultantString += this.bitsetStateFlipped
      ? 1 - this.bitStorage[loopIndex]
      : this.bitStorage[loopIndex];
  }
  return resultantString;
};
